<template>
  <div class="h-[calc(100vh-64px)] flex flex-col">
    <div class="flex-1 overflow-auto">
      <div class="w-full max-w-6xl mx-auto px-3 py-4 sm:px-6 sm:py-6 lg:px-8 md:py-8">
        <template v-if="loading">
          <div class="mb-6">
            <div class="h-7 w-32 skeleton-pulse rounded mb-4" />
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="h-10 flex-1 skeleton-pulse rounded-md" />
              <div class="h-10 w-full sm:w-48 skeleton-pulse rounded-md" />
            </div>
          </div>
          <div class="space-y-3">
            <div v-for="i in 6" :key="i" class="h-[72px] skeleton-pulse rounded-lg" />
          </div>
        </template>

        <template v-else-if="taskStore.tasks.length === 0">
          <EmptyState @create="openCreateDrawer" />
        </template>

        <template v-else>
          <TaskList
            :tasks="taskStore.tasks"
            @edit="openEditDrawer"
          />
        </template>
      </div>
    </div>

    <button
      class="fixed bottom-4 right-4 w-12 h-12 sm:bottom-6 sm:right-6 sm:w-14 sm:h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-200 flex items-center justify-center active:scale-95 z-30"
      @click="openCreateDrawer"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <TaskDrawer
      :open="drawerOpen"
      :task="editingTask"
      @close="closeDrawer"
      @saved="onTaskSaved"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const taskStore = useTaskStore()
const loading = ref(true)
const drawerOpen = ref(false)
const editingTask = ref<any>(null)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } finally {
    loading.value = false
  }
})

function openCreateDrawer() {
  editingTask.value = null
  drawerOpen.value = true
}

function openEditDrawer(task: any) {
  editingTask.value = task
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
  editingTask.value = null
}

async function onTaskSaved() {
  drawerOpen.value = false
  editingTask.value = null
  await taskStore.fetchTasks()
}
</script>
