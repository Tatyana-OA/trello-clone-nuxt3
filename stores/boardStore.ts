import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";

//Composition API, a function returning an object, instead of just object
export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  const getTask = computed(() => {
    return (taskId) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find((task) => task.id === taskId);
        if (task) return task;
      }
    };
  });

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
    //State
    board,
    //Getters
    getTask,
    //Actions
    addColumn,
    deleteColumn,
  };
});
