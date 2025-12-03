<script setup lang="ts">
import { matEdit, matSearch } from '@quasar/extras/material-icons';
import type { CarInformation as TableRow } from '../models';
import type { TableColumn } from './data-table.types';
import { computed, ref } from 'vue';
import { useDialog } from 'src/composables/useDialog';

const propsComp = withDefaults(
  defineProps<{
    data: TableRow[];
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

const tableColumns = ref(propsComp.columns);

const { openCarDialog } = useDialog();

const searchValue = ref<string>('');

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

function onRowClick(row: TableRow, edit: boolean = false) {
  openCarDialog(row, edit, propsComp.market);
}
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
                clearable
                filled
                square
                shadow-text="Search"
                placeholder="Search"
              >
              </q-input>
            </div>
            <div v-if="add || remove" class="action-btns">
              <q-btn v-if="add">Add</q-btn>
              <q-btn v-if="remove">Remove</q-btn>
            </div>
          </div>
        </div>
        <p class="hint table-hint">Hint: Double-click opens details of row</p>
      </slot>
    </div>
    <q-table
      color="primary"
      bordered
      :rows="data"
      :columns="columnsWithActions"
      :row-key
      @row-dblclick="(_, row) => onRowClick(row)"
    >
      <template v-if="view" #body-cell-view="props">
        <q-td :props="props">
          <q-btn class="action-btn" @click="onRowClick(props.row)">
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
