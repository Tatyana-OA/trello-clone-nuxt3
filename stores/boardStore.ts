import { defineStore } from "pinia";
import boardData from "~/data/board.json";

//Composition API, a function returning an object, instead of just object
export const useBoardStore = defineStore("boardStore", () => {
  const board = ref(boardData);

  return {
    board,
  };
});
