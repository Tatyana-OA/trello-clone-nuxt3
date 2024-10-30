<script setup>
import { useBoardStore } from "../stores/boardStore";

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
});

const boardStore = useBoardStore();
const router = useRouter();

const editNameState = ref(false);
const newTaskName = ref("");

function deleteColumn(columnIndex) {
  boardStore.deleteColumn(columnIndex);
}
function goToTask(id) {
  router.push(`/tasks/${id}`);
}
function addTask() {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex,
  });
  newTaskName.value = "";
}
function pickUpTask(event, { fromTaskIndex, fromColumnIndex }) {
  // Only allow movement effect
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
  event.dataTransfer.setData("from-task-index", fromTaskIndex);
}

function dropTask(event, toColumnIndex) {
  const fromColumnIndex = event.dataTransfer.getData("from-column-index");
  const fromTaskIndex = event.dataTransfer.getData("from-task-index");

  boardStore.moveTask({
    taskIndex: fromTaskIndex,
    fromColumnIndex,
    toColumnIndex,
  });
}
</script>

<template>
  <UContainer
    class="column"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropTask($event, columnIndex)"
  >
    <div class="column-header mb-4">
      <div>
        <UInput v-if="editNameState" type="text" v-model="column.name" />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton
          icon="i-heroicons-pencil-square"
          class="mr-2"
          @click="editNameState = !editNameState"
        />
        <UButton
          icon="i-heroicons-trash"
          color="red"
          @click="deleteColumn(columnIndex)"
        />
      </div>
    </div>
    <ul>
      <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
        <UCard
          class="mb-4 cursor-pointer"
          @click="goToTask(task.id)"
          draggable="true"
          @dragstart="
            pickUpTask($event, {
              fromTaskIndex: taskIndex,
              fromColumnIndex: columnIndex,
            })
          "
        >
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
      type="text"
      placeholder="Create new task"
      icon="i-heroicons-plus-circle-solid"
      class="input"
      @keyup.enter="addTask()"
      v-model="newTaskName"
    />
  </UContainer>
</template>
