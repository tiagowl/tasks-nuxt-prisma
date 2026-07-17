<template>
  <Teleport to="body">
    <Transition name="drawer-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 z-40"
        @click="handleBackdropClick"
      />
    </Transition>

    <Transition name="drawer">
      <div
        v-if="open"
        class="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-drawer z-50 flex flex-col"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-800">
            {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
          </h2>
          <button
            class="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors duration-200"
            @click="handleClose"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4">
          <TaskForm
            :task="task"
            @save="handleSave"
            @cancel="handleClose"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  task: any | null
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const isEditing = computed(() => !!props.task)

function handleClose() {
  emit('close')
}

function handleBackdropClick() {
  handleClose()
}

async function handleSave(data: { title: string; publishedAt: string | null; subtasks?: string[] }) {
  const taskStore = useTaskStore()
  if (isEditing.value) {
    await taskStore.updateTask(props.task.id, {
      title: data.title,
      publishedAt: data.publishedAt,
    })
  } else {
    await taskStore.createTask({
      title: data.title,
      publishedAt: data.publishedAt,
      subtasks: data.subtasks ?? [],
    })
  }
  emit('saved')
}
</script>

<style scoped>
.drawer-enter-active {
  transition: transform 300ms ease-in-out;
}
.drawer-leave-active {
  transition: transform 300ms ease-in-out;
}
.drawer-enter-from {
  transform: translateX(100%);
}
.drawer-leave-to {
  transform: translateX(100%);
}
.drawer-backdrop-enter-active {
  transition: opacity 200ms ease-out;
}
.drawer-backdrop-leave-active {
  transition: opacity 200ms ease-in;
}
.drawer-backdrop-enter-from,
.drawer-backdrop-leave-to {
  opacity: 0;
}
</style>
