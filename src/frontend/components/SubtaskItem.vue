<template>
  <div class="flex items-start gap-2 px-2 py-2.5 rounded-md hover:bg-neutral-50 transition-colors duration-150 group sm:items-center sm:gap-3 sm:px-3 sm:py-2">
    <button
      type="button"
      class="relative w-6 h-6 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 flex-shrink-0 rounded border-2 transition-all duration-150 flex items-center justify-center"
      :class="subtask.completed ? 'bg-success border-success' : 'border-neutral-300 hover:border-primary-400'"
      :disabled="busy"
      @click="$emit('toggle')"
    >
      <svg
        v-if="subtask.completed"
        class="w-3 h-3 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <input
      v-if="editing"
      ref="inputRef"
      v-model="editText"
      type="text"
      maxlength="500"
      class="min-w-0 flex-1 px-2 py-1.5 text-base sm:text-sm border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      :disabled="busy"
      @keyup.enter="saveEdit"
      @keyup.escape="cancelEdit"
      @blur="saveEdit"
    />
    <span
      v-else
      class="min-w-0 text-sm leading-5 flex-1 break-words transition-all duration-150 cursor-text"
      :class="subtask.completed ? 'line-through text-neutral-400' : 'text-neutral-700'"
      @dblclick="startEdit"
    >
      {{ subtask.description }}
    </span>

    <button
      v-if="!editing"
      type="button"
      class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 sm:h-auto sm:w-auto sm:p-1 sm:opacity-0 sm:group-hover:opacity-100"
      title="Editar"
      :disabled="busy"
      @click="startEdit"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
    <button
      v-if="!editing"
      type="button"
      class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-red-50 hover:text-error transition-all duration-200 sm:h-auto sm:w-auto sm:p-1 sm:opacity-0 sm:group-hover:opacity-100"
      title="Excluir"
      :disabled="busy"
      @click="$emit('delete')"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  subtask: any
  busy?: boolean
}>()

const emit = defineEmits<{
  toggle: []
  delete: []
  update: [description: string]
}>()

const editing = ref(false)
const editText = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

function startEdit() {
  editText.value = props.subtask.description
  editing.value = true
  nextTick(() => inputRef.value?.focus())
}

function cancelEdit() {
  editing.value = false
  editText.value = props.subtask.description
}

function saveEdit() {
  if (!editing.value) return
  const trimmed = capitalizeFirstWord(editText.value)
  editing.value = false
  if (!trimmed || trimmed === props.subtask.description) return
  emit('update', trimmed)
}
</script>
