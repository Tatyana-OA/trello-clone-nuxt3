<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
</script>
<template>
  <main>
    <h1>Building a trello clone with Nuxt</h1>
    <pre>{{ boardStore.board }}</pre>
  </main>
</template>
