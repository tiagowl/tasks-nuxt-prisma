<template>
  <div class="space-y-2 mb-2">
    <div
      v-for="(subtask, index) in subtasks"
      :key="index"
      class="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-md group"
    >
      <svg class="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-sm text-neutral-700 flex-1">{{ subtask }}</span>
      <button
        type="button"
        class="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-error transition-all duration-200"
        @click="$emit('remove', index)"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtasks: string[]
}>()

defineEmits<{
  remove: [index: number]
}>()
</script>
