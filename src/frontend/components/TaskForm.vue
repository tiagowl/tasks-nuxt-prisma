<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="task-title" class="block text-sm font-medium text-neutral-700 mb-1">Título</label>
      <input
        id="task-title"
        v-model="form.title"
        type="text"
        placeholder="Ex: Implementar login"
        maxlength="200"
        class="w-full px-3 py-2 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        :class="{ 'border-error focus:ring-error': errors.title }"
      />
      <p v-if="errors.title" class="text-error text-xs mt-1">{{ errors.title }}</p>
    </div>

    <div>
      <label for="task-date" class="block text-sm font-medium text-neutral-700 mb-1">Data de Publicação</label>
      <input
        id="task-date"
        v-model="form.publishedAt"
        type="date"
        class="w-full px-3 py-2 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
      />
    </div>

    <div v-if="!editing">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Subtarefas (opcional)</label>
      <SubtaskList :subtasks="form.subtasks" @remove="removeSubtask" />
      <AddSubtaskInput @add="addSubtask" />
    </div>

    <div v-if="editing && task?.subtasks?.length" class="bg-neutral-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-neutral-700 mb-2">Subtarefas ({{ completedCount }}/{{ task.subtasks.length }})</h4>
      <div class="space-y-2">
        <div v-for="sub in task.subtasks" :key="sub.id" class="flex items-center gap-2 text-sm text-neutral-600">
          <span :class="sub.completed ? 'line-through text-neutral-400' : ''">{{ sub.description }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button
        type="button"
        class="flex-1 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors duration-200"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="submitting"
        class="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="submitting" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ submitting ? 'Salvando...' : 'Salvar' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  task: any | null
}>()

const emit = defineEmits<{
  save: [data: { title: string; publishedAt: string | null; subtasks?: string[] }]
  cancel: []
}>()

const editing = computed(() => !!props.task)

const form = reactive({
  title: props.task?.title || '',
  publishedAt: props.task?.publishedAt ? props.task.publishedAt.substring(0, 10) : '',
  subtasks: [] as string[],
})

const errors = reactive({ title: '' })
const submitting = ref(false)

const completedCount = computed(() => {
  if (!props.task?.subtasks) return 0
  return props.task.subtasks.filter((s: any) => s.completed).length
})

function addSubtask(description: string) {
  form.subtasks.push(capitalizeFirstWord(description))
}

function removeSubtask(index: number) {
  form.subtasks.splice(index, 1)
}

async function handleSubmit() {
  errors.title = ''
  if (!form.title.trim()) {
    errors.title = 'Título é obrigatório'
    return
  }

  submitting.value = true
  try {
    const payload: { title: string; publishedAt: string | null; subtasks?: string[] } = {
      title: capitalizeFirstWord(form.title),
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
    }

    if (!editing.value) {
      payload.subtasks = form.subtasks.map((item) => capitalizeFirstWord(item)).filter(Boolean)
    }

    emit('save', payload)
  } finally {
    submitting.value = false
  }
}
</script>
