export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<any[]>([])

  async function fetchTasks() {
    const authStore = useAuthStore()
    tasks.value = await $fetch('/api/tasks', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
  }

  async function createTask(data: {
    title: string
    publishedAt: string | null
    subtasks?: string[]
  }) {
    const authStore = useAuthStore()
    await $fetch('/api/tasks', {
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
  }

  async function updateTask(id: string, data: { title: string; publishedAt: string | null }) {
    const authStore = useAuthStore()
    await $fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: data,
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
  }

  async function deleteTask(id: string) {
    const authStore = useAuthStore()
    await $fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  return { tasks, fetchTasks, createTask, updateTask, deleteTask }
})
