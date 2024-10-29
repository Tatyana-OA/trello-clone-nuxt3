<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
const columnName = ref("");

const addColumn = () => {
  boardStore.addColumn(columnName.value);
  columnName.value = "";
};
const deleteColumn = (columnIdx) => {
  boardStore.deleteColumn(columnIdx);
};
</script>
<template>
  <div class="board-wrapper">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIdx) in boardStore.board.columns"
        :key="column.id"
        :column="column"
        :columnIndex="columnIdx"
      />
      <UContainer class="column">
        <UInput
          type="text"
          placeholder="Create new column"
          icon="i-heroicons-plus-circle-solid"
          class="input"
          @keyup.enter="addColumn"
          v-model="columnName"
        />
      </UContainer>
    </main>
  </div>
</template>
