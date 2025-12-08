<script setup lang="ts">
import { matEdit, matSearch } from '@quasar/extras/material-icons';
import type { TableColumn, TableRow } from './data-table.types';
import { computed, ref, watch } from 'vue';
import { useDialog } from '@/composables/useDialog';
import { toFormattedDate } from 'src/utils/date.utils';
import { updateCarInfo } from 'src/api/cars/update';

const propsComp = withDefaults(
  defineProps<{
    market?: boolean;
    title: string;
    columns: TableColumn[];
    rowKey: string;
    edit?: boolean;
    view?: boolean;
    add?: boolean;
    remove?: boolean;
    search?: boolean;
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

const tableData = defineModel<TableRow[]>({ required: true, type: [] });

const selected = ref<TableRow[]>([]);

const { openCarDialog, confrimationDialog, carFormDialog } = useDialog();

const searchValue = ref<string>('');

const searchResults = ref<TableRow[]>([]);

const loadingSearch = ref<boolean>(false);

const pagination = ref<{ sortBy: string; descending: boolean; page: number; rowsPerPage: number }>({
  sortBy: 'make',
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

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

function openAddDialog(): void {
  carFormDialog(undefined, false).onOk(
    (newData: TableRow) => tableData.value.push(newData),
    // Make API call to add new data to table data ( in db.json new car added )
  );
}

function removeElements(): void {
  confrimationDialog(selected.value);
}

function filterTableData(): () => void {
  const data = tableData.value.slice();

  return (): void => {
    if (!searchValue.value) searchResults.value = data;

    const result = data.filter(
      ({ make, model }) =>
        make.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        model.toLowerCase().includes(searchValue.value.toLowerCase()),
    );

    searchResults.value = result;
  };
}

const getSearchResults = filterTableData();

console.log(getSearchResults());

watch(
  () => searchValue.value,
  () => {
    loadingSearch.value = true;

    setTimeout(() => {
      getSearchResults();
      loadingSearch.value = false;
      console.log('loading after', loadingSearch.value);
    }, 2000);
  },
);
</script>

<template>
  <div class="q-pa-xs">
    <div>
      <slot name="headerSlot">
        <div class="title-btns">
          <h3>{{ title }}</h3>
          <div class="search-btns">
            <div v-if="search" class="search">
              <q-input
                v-model="searchValue"
                :clearable="!loadingSearch"
                filled
                square
                placeholder="Search"
                :loading="loadingSearch"
              >
              </q-input>
            </div>
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
      v-model:pagination="pagination"
      color="primary"
      bordered
      :rows="searchResults ?? tableData"
      :columns="columnsWithActions"
      :row-key
      selection="multiple"
      :loading="loadingSearch"
      @row-dblclick="(_, row) => onRowClick(row)"
    >
      <template #loading>
        <q-inner-loading showing color="secondary"></q-inner-loading>
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
