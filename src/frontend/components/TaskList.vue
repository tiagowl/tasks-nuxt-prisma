<template>
  <div class="space-y-4 sm:space-y-5">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold text-neutral-800 tracking-tight">Tarefas</h2>
        <p class="text-sm text-neutral-500 mt-1">
          {{ filteredTasks.length }}
          {{ filteredTasks.length === 1 ? 'tarefa' : 'tarefas' }}
          <span v-if="hasActiveFilters" class="text-neutral-400"> (filtradas de {{ tasks.length }})</span>
        </p>
      </div>

      <div class="grid grid-cols-1 gap-2.5 w-full sm:flex sm:w-auto sm:min-w-[420px] sm:gap-3 lg:min-w-[520px]">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="nameFilter"
            type="search"
            placeholder="Filtrar por nome..."
            class="w-full min-h-11 pl-9 pr-3 py-2.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          />
        </div>
        <select
          v-model="statusFilter"
          class="w-full min-h-11 sm:w-44 px-3 py-2.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        >
          <option value="all">Todos os status</option>
          <option value="none">Sem status</option>
          <option value="todo">A Fazer</option>
          <option value="doing">Fazendo</option>
          <option value="done">Feito</option>
        </select>
      </div>
    </div>

    <div v-if="filteredTasks.length === 0" class="bg-white border border-dashed border-neutral-200 rounded-lg py-16 text-center">
      <p class="text-sm text-neutral-500">Nenhuma tarefa encontrada com os filtros aplicados.</p>
      <button
        v-if="hasActiveFilters"
        type="button"
        class="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
        @click="clearFilters"
      >
        Limpar filtros
      </button>
    </div>

    <div v-else class="space-y-3 sm:space-y-0 sm:bg-white sm:border sm:border-neutral-200 sm:rounded-lg sm:overflow-hidden sm:divide-y sm:divide-neutral-100">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="overflow-hidden rounded-lg border bg-white shadow-sm transition-colors duration-150 sm:rounded-none sm:border-0 sm:shadow-none"
        :class="expandedId === task.id ? 'border-primary-200 bg-primary-50/40' : 'border-neutral-200 hover:bg-neutral-50/80'"
      >
        <div class="flex flex-col sm:flex-row sm:items-stretch">
          <button
            type="button"
            class="flex-1 text-left px-3.5 py-3.5 sm:px-5 sm:py-4 cursor-pointer"
            @click="toggleExpand(task)"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div class="min-w-0 flex-1 flex items-start gap-2.5 sm:gap-3">
                <svg
                  class="w-4 h-4 mt-1 text-neutral-400 flex-shrink-0 transition-transform duration-200"
                  :class="{ 'rotate-90 text-primary-500': expandedId === task.id }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <div class="min-w-0 flex-1 space-y-2 sm:space-y-1.5">
                  <h3
                    class="text-sm sm:text-base font-medium text-neutral-800 leading-snug"
                    :class="{ 'line-through text-neutral-400': task.status === 'done' }"
                  >
                    {{ task.title }}
                  </h3>
                  <div class="flex flex-col items-start gap-1.5 text-xs text-neutral-400 min-[380px]:flex-row min-[380px]:flex-wrap min-[380px]:gap-x-4">
                    <span v-if="task.publishedAt" class="flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(task.publishedAt) }}
                    </span>
                    <span v-else>Sem data</span>
                    <span class="flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {{ task._count?.completedSubtasks ?? 0 }}/{{ task._count?.subtasks ?? 0 }} subtarefas concluídas
                    </span>
                  </div>
                </div>
              </div>
              <div class="ml-6 sm:ml-0 sm:flex-shrink-0">
                <StatusBadge :status="task.status" />
              </div>
            </div>
          </button>

          <div class="flex border-t border-neutral-100 sm:border-t-0">
            <button
              type="button"
              class="flex min-h-11 flex-1 items-center justify-center gap-2 px-3 text-xs font-medium text-neutral-500 hover:bg-white/60 hover:text-primary-500 transition-colors duration-200 sm:min-h-0 sm:flex-none sm:px-4 sm:border-l sm:border-neutral-100"
              title="Editar tarefa"
              @click="$emit('edit', task)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span class="sm:hidden">Editar</span>
            </button>
            <button
              type="button"
              class="flex min-h-11 flex-1 items-center justify-center gap-2 border-l border-neutral-100 px-3 text-xs font-medium text-neutral-500 hover:bg-white/60 hover:text-error transition-colors duration-200 sm:min-h-0 sm:flex-none sm:px-4"
              title="Excluir tarefa"
              :disabled="deletingTaskId === task.id"
              @click="askDeleteTask(task)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span class="sm:hidden">Excluir</span>
            </button>
          </div>
        </div>

        <div v-if="expandedId === task.id" class="border-t border-neutral-100 bg-white px-2.5 py-3.5 sm:px-5 sm:py-4 sm:pl-12">
          <div v-if="loadingSubtasks[task.id]" class="space-y-2 py-1">
            <div v-for="i in 3" :key="i" class="h-9 skeleton-pulse rounded-md" />
          </div>

          <template v-else>
            <p
              v-if="getSubtasks(task.id).length === 0"
              class="text-sm text-neutral-400 py-1 mb-3"
            >
              Nenhuma subtarefa cadastrada
            </p>

            <div v-else class="space-y-0.5 mb-3">
              <SubtaskItem
                v-for="subtask in getSubtasks(task.id)"
                :key="subtask.id"
                :subtask="subtask"
                :busy="busySubtaskId === subtask.id"
                @toggle="handleToggle(task, subtask.id)"
                @delete="askDelete(task, subtask)"
                @update="(description) => handleUpdate(task, subtask.id, description)"
              />
            </div>

            <AddSubtaskInput @add="(description) => handleCreate(task, description)" />
          </template>
        </div>
      </div>
    </div>

    <ConfirmModal
      :open="!!pendingDelete"
      title="Excluir subtarefa"
      message="Tem certeza que deseja excluir esta subtarefa? Esta ação não pode ser desfeita."
      confirm-text="Excluir"
      @confirm="confirmDelete"
      @cancel="pendingDelete = null"
    />

    <ConfirmModal
      :open="!!pendingTaskDelete"
      title="Excluir tarefa"
      :message="taskDeleteMessage"
      confirm-text="Excluir"
      @confirm="confirmDeleteTask"
      @cancel="pendingTaskDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tasks: any[]
}>()

defineEmits<{
  edit: [task: any]
}>()

const subtaskStore = useSubtaskStore()
const taskStore = useTaskStore()

const nameFilter = ref('')
const statusFilter = ref('all')
const expandedId = ref<string | null>(null)
const loadingSubtasks = reactive<Record<string, boolean>>({})
const busySubtaskId = ref<string | null>(null)
const deletingTaskId = ref<string | null>(null)
const pendingDelete = ref<{ task: any; subtask: any } | null>(null)
const pendingTaskDelete = ref<any | null>(null)

const taskDeleteMessage = computed(() => {
  if (!pendingTaskDelete.value) return ''
  const count = pendingTaskDelete.value._count?.subtasks ?? 0
  if (count === 0) {
    return 'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.'
  }
  return `Tem certeza que deseja excluir esta tarefa? ${count} ${count === 1 ? 'subtarefa vinculada também será excluída' : 'subtarefas vinculadas também serão excluídas'}.`
})

const hasActiveFilters = computed(() => {
  return nameFilter.value.trim() !== '' || statusFilter.value !== 'all'
})

const filteredTasks = computed(() => {
  const query = nameFilter.value.trim().toLowerCase()

  return props.tasks.filter((task) => {
    const matchesName = !query || task.title.toLowerCase().includes(query)

    let matchesStatus = true
    if (statusFilter.value === 'none') {
      matchesStatus = task.status === null || task.status === undefined
    } else if (statusFilter.value !== 'all') {
      matchesStatus = task.status === statusFilter.value
    }

    return matchesName && matchesStatus
  })
})

function clearFilters() {
  nameFilter.value = ''
  statusFilter.value = 'all'
}

function getSubtasks(taskId: string) {
  return subtaskStore.getSubtasks(taskId)
}

function syncTaskMeta(task: any, taskStatus?: string | null) {
  const target = taskStore.tasks.find((t) => t.id === task.id)
  if (!target) return

  const subtasks = getSubtasks(task.id)
  const subtaskCount = subtasks.length
  const completedCount = subtasks.filter((s) => s.completed).length

  target._count = {
    subtasks: subtaskCount,
    completedSubtasks: completedCount,
  }

  if (taskStatus !== undefined) {
    target.status = taskStatus
  } else if (subtaskCount === 0) {
    target.status = null
  }
}

async function toggleExpand(task: any) {
  if (expandedId.value === task.id) {
    expandedId.value = null
    return
  }

  expandedId.value = task.id

  if (!(task.id in subtaskStore.subtasksByTaskId)) {
    loadingSubtasks[task.id] = true
    try {
      await subtaskStore.fetchSubtasks(task.id)
    } finally {
      loadingSubtasks[task.id] = false
    }
  }
}

async function handleCreate(task: any, description: string) {
  const result = await subtaskStore.createSubtask(task.id, description)
  syncTaskMeta(task, result.taskStatus)
}

async function handleToggle(task: any, subtaskId: string) {
  busySubtaskId.value = subtaskId
  try {
    const result = await subtaskStore.toggleComplete(subtaskId, task.id)
    syncTaskMeta(task, result?.taskStatus ?? undefined)
  } finally {
    busySubtaskId.value = null
  }
}

async function handleUpdate(task: any, subtaskId: string, description: string) {
  busySubtaskId.value = subtaskId
  try {
    await subtaskStore.updateSubtask(subtaskId, task.id, { description })
  } finally {
    busySubtaskId.value = null
  }
}

function askDelete(task: any, subtask: any) {
  pendingDelete.value = { task, subtask }
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  const { task, subtask } = pendingDelete.value
  pendingDelete.value = null
  busySubtaskId.value = subtask.id
  try {
    const result = await subtaskStore.deleteSubtask(subtask.id, task.id)
    syncTaskMeta(task, result.taskStatus)
  } finally {
    busySubtaskId.value = null
  }
}

function askDeleteTask(task: any) {
  pendingTaskDelete.value = task
}

async function confirmDeleteTask() {
  if (!pendingTaskDelete.value) return
  const task = pendingTaskDelete.value
  pendingTaskDelete.value = null
  deletingTaskId.value = task.id
  try {
    await taskStore.deleteTask(task.id)
    if (expandedId.value === task.id) {
      expandedId.value = null
    }
    subtaskStore.clearTaskSubtasks(task.id)
  } finally {
    deletingTaskId.value = null
  }
}
</script>
