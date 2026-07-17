export const useSubtaskStore = defineStore('subtasks', () => {
  const subtasksByTaskId = ref<Record<string, any[]>>({})

  function getSubtasks(taskId: string) {
    return subtasksByTaskId.value[taskId] ?? []
  }

  async function fetchSubtasks(taskId: string) {
    const authStore = useAuthStore()
    const subtasks = await $fetch(`/api/tasks/${taskId}/subtasks`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    subtasksByTaskId.value = { ...subtasksByTaskId.value, [taskId]: subtasks }
    return subtasks
  }

  async function createSubtask(taskId: string, description: string) {
    const authStore = useAuthStore()
    const result = await $fetch('/api/subtasks', {
      method: 'POST',
      body: { taskId, description },
      headers: { Authorization: `Bearer ${authStore.token}` },
    })

    const current = subtasksByTaskId.value[taskId] ?? []
    subtasksByTaskId.value = {
      ...subtasksByTaskId.value,
      [taskId]: [...current, result.subtask],
    }

    return result
  }

  async function updateSubtask(id: string, taskId: string, data: { description?: string; completed?: boolean }) {
    const authStore = useAuthStore()
    const result = await $fetch(`/api/subtasks/${id}`, {
      method: 'PATCH',
      body: data,
      headers: { Authorization: `Bearer ${authStore.token}` },
    })

    const current = subtasksByTaskId.value[taskId] ?? []
    subtasksByTaskId.value = {
      ...subtasksByTaskId.value,
      [taskId]: current.map((s) => (s.id === id ? result.subtask : s)),
    }

    return result
  }

  async function toggleComplete(id: string, taskId: string) {
    const subtask = (subtasksByTaskId.value[taskId] ?? []).find((s) => s.id === id)
    if (!subtask) return

    return updateSubtask(id, taskId, { completed: !subtask.completed })
  }

  async function deleteSubtask(id: string, taskId: string) {
    const authStore = useAuthStore()
    const result = await $fetch(`/api/subtasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })

    const current = subtasksByTaskId.value[taskId] ?? []
    subtasksByTaskId.value = {
      ...subtasksByTaskId.value,
      [taskId]: current.filter((s) => s.id !== id),
    }

    return result
  }

  function clearTaskSubtasks(taskId: string) {
    const { [taskId]: _, ...rest } = subtasksByTaskId.value
    subtasksByTaskId.value = rest
  }

  return {
    subtasksByTaskId,
    getSubtasks,
    fetchSubtasks,
    createSubtask,
    updateSubtask,
    toggleComplete,
    deleteSubtask,
    clearTaskSubtasks,
  }
})
