<script setup lang="ts">
import { matEdit, matSearch } from '@quasar/extras/material-icons';
import type { TableColumn, TableRow } from './data-table.types';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useDialog } from '@/composables/useDialog';
import { toFormattedDate } from 'src/utils/date.utils';
import { updateCarInfo } from 'src/api/cars/update';
import CarFilter from '../filters/CarFilter.vue';
import CarSearch from '../filters/CarSearch.vue';
import { watch } from 'vue';

const propsComp = withDefaults(
  defineProps<{
    market?: boolean;
    title: string;
    columns: TableColumn[];
    rowKey: keyof TableRow;
    edit?: boolean;
    view?: boolean;
    add?: boolean;
    remove?: boolean;
    search?: boolean;
    refetch: () => Promise<TableRow[] | undefined>;
  }>(),
  {
    market: false,
    edit: false,
    view: false,
    add: false,
    remove: false,
    search: false,
  },
);

const tableColumns = ref<TableColumn[]>(propsComp.columns);

const tableData = defineModel<TableRow[]>({ required: true, type: Array<TableRow>, default: [] });

const selected = ref<TableRow[]>([]);

const { openCarDialog, confrimationDialog, garageDialog } = useDialog();

// same array state for filter, search and table
const searchResults = ref<TableRow[]>([]);

// same loading state for filter, search and table
const loadingSearch = ref<boolean>(false);

const editColumn: TableColumn = {
  name: 'edit',
  label: 'Edit',
  align: 'center',
  field: () => '',
  sortable: false,
};

const viewColumn: TableColumn = {
  name: 'view',
  label: 'View',
  align: 'center',
  field: () => '',
  sortable: false,
};

const columnsWithActions = computed<TableColumn[]>(() => {
  if (propsComp.edit && propsComp.view) {
    return [...tableColumns.value, viewColumn, editColumn];
  }
  if (!propsComp.edit && propsComp.view) {
    return [...tableColumns.value, viewColumn];
  }

  if (propsComp.edit && !propsComp.view) {
    return [...tableColumns.value, editColumn];
  }

  return tableColumns.value;
});

function validRowKey() {
  // tableData passed must have a unique row key
  // function should pass true if row key is unique ( no two elements have the same value by the key passed )
  // go through the array and compare elements ( a[key] === b[key] ? false : true )

  if (tableData.value.length === 0) {
    console.warn('Array is empty, are you sure the row key is unique?');
    return true;
  }

  const rowKey = propsComp.rowKey;
  const car: TableRow | undefined = tableData.value[0];

  function reducedArr(arr: TableRow[], key: keyof TableRow) {
    return arr.reduce(
      (acc, data) => {
        if (typeof data[key] !== 'string' && typeof data[key] !== 'number') return acc;

        const value: string | number = data[key];

        if (acc[value]) {
          acc[value]++;
          return acc;
        } else {
          acc[value] = 1;
        }

        return acc;
      },
      {} as Record<string | number, number>,
    );
  }

  if (car) {
    const valueType = typeof car[rowKey];

    if (valueType !== 'string' && valueType !== 'number') {
      throw new Error('Row key must be string or number');
    } else {
      const result = reducedArr(tableData.value, rowKey);
      return Object.values(result).find((val) => val > 1) ? false : true;
    }
  }
}

function onRowClick(row: TableRow, edit?: boolean, market?: boolean): void {
  if (edit) {
    openCarDialog(row, edit, market).onOk((newData: TableRow) => {
      const newDataArr = tableData.value.slice().map((data) =>
        data.id === newData.id
          ? {
              ...newData,
              registrationDetails: {
                ...data.registrationDetails,
                expiryDate: toFormattedDate(newData.registrationDetails.expiryDate, 'YYYY-MM-DD'),
              },
            }
          : data,
      );

      //  API Call to update that car (API call by ID)
      void updateCarInfo(newDataArr);

      tableData.value = newDataArr;
    });
  } else {
    openCarDialog(row, edit, market);
  }
}

async function dataRefetch() {
  try {
    const res = await propsComp.refetch();

    searchResults.value = res ? res : [];
    loadingSearch.value = false;
  } catch (error) {
    console.log('Data table - refetch', error);
  }
}

const toRefetch = ref<boolean>(true);

function openAddDialog(): void {
  garageDialog().onOk((shouldRefetch) => {
    toRefetch.value = shouldRefetch;
  });
}

function clearFilters(): void {
  searchResults.value = [];
}

function removeElements(): void {
  confrimationDialog(selected.value);
}

watch(
  () => toRefetch.value,
  () => {
    if (toRefetch.value) {
      loadingSearch.value = true;
      setTimeout(() => void dataRefetch(), 2000);

      toRefetch.value = false;
    }
  },
);

onBeforeMount(() => {
  loadingSearch.value = true;
  setTimeout(() => void dataRefetch(), 2000);

  toRefetch.value = false;
});

onMounted(() => {
  if (!validRowKey()) {
    throw new Error('Row key not unique');
  }
});
</script>

<template>
  <div class="q-pa-xs">
    <div>
      <slot name="headerSlot">
        <div class="title-btns">
          <h3>{{ title }}</h3>
          <div class="search-btns">
            <car-filter v-model="searchResults" v-model:loading="loadingSearch" :data="tableData" />
            <div v-if="search" class="search">
              <car-search
                v-model="searchResults"
                v-model:loading="loadingSearch"
                :data="tableData"
              />
            </div>

            <q-btn @click="clearFilters">Clear</q-btn>
            <q-btn @click="toRefetch = true">Refetch</q-btn>

            <div v-if="add || remove" class="action-btns">
              <q-btn v-if="add" @click="openAddDialog">Add</q-btn>
              <q-btn v-if="remove" :disable="!selected.length" @click="removeElements"
                >Remove</q-btn
              >
            </div>
          </div>
        </div>
        <p class="hint table-hint">Hint: Double-click opens details of row</p>
      </slot>
    </div>
    <q-table
      v-model:selected="selected"
      color="primary"
      bordered
      :rows="searchResults"
      :columns="columnsWithActions"
      :row-key
      selection="multiple"
      :loading="loadingSearch"
      @row-dblclick="(_: Event, row: TableRow) => onRowClick(row)"
    >
      <template #loading>
        <q-inner-loading showing color="secondary"></q-inner-loading>
      </template>

      <template #no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <span> {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>

      <template v-if="view" #body-cell-view="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row, false, false)">
            <q-icon :name="matSearch" />
          </q-btn>
        </q-td>
      </template>

      <template v-if="edit" #body-cell-edit="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row, true)">
            <q-icon :name="matEdit" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.action-btn {
  border-radius: 999999px;
  width: fit-content;
  height: fit-content;
}

.table-hint {
  text-align: right;
}

.title-btns {
  display: flex;
  place-content: space-between;
  place-items: center;
}

.search-btns {
  display: flex;
  place-content: space-between;
  place-items: center;
  gap: 20px;
}

.action-btns {
  display: flex;
  gap: 20px;
}
</style>
