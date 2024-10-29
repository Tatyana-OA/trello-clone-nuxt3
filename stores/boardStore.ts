import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";

//Composition API, a function returning an object, instead of just object
export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  function addColumn(columnName: string) {
    board.value.columns.push({
      name: columnName,
      tasks: [],
    });
  }

  function deleteColumn(columnIdx: number) {
    board.value.columns.splice(columnIdx, 1);
  }

  return {
    board,
    addColumn,
    deleteColumn,
  };
});
