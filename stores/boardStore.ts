import { v4 as uuid } from "uuid";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";

//Composition API, a function returning an object, instead of just object
export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find((task) => task.id === taskId);
        if (task) return task;
      }
    };
  });

  function addTask({
    columnIndex,
    taskName,
  }: {
    columnIndex: number;
    taskName: string;
  }) {
    board.value.columns[columnIndex].tasks.push({
      id: uuid(),
      name: taskName,
      description: "",
    });
  }

  function deleteTask(taskId: string) {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  }

  function moveTask({
    fromTaskIndex,
    fromColumnIndex,
    toColumnIndex,
    toTaskIndex,
  }: {
    fromTaskIndex: number;
    fromColumnIndex: number;
    toColumnIndex: number;
    toTaskIndex: number;
  }) {
    const task = board.value.columns[fromColumnIndex].tasks.splice(
      fromTaskIndex,
      1
    )[0];

    board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
  }

  function addColumn(columnName: string) {
    board.value.columns.push({
      name: columnName,
      tasks: [],
    });
  }

  function deleteColumn(columnIdx: number) {
    board.value.columns.splice(columnIdx, 1);
  }

  function moveColumn({
    fromColumnIndex,
    toColumnIndex,
  }: {
    fromColumnIndex: number;
    toColumnIndex: number;
  }) {
    const column = board.value.columns.splice(fromColumnIndex, 1)[0];
    board.value.columns.splice(toColumnIndex, 0, column);
  }

  return {
    //State
    board,
    //Getters
    getTask,
    //Actions
    addTask,
    deleteTask,
    moveTask,
    addColumn,
    deleteColumn,
    moveColumn,
  };
});
