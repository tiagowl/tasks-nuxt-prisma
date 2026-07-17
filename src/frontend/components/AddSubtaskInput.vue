<template>
  <div class="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center">
    <input
      v-model="description"
      type="text"
      placeholder="+ Adicionar subtarefa"
      maxlength="500"
      class="w-full min-w-0 min-h-11 flex-1 px-3 py-2 text-base sm:min-h-0 sm:py-1.5 sm:text-sm border border-dashed border-neutral-300 rounded-md text-neutral-600 placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors duration-200"
      @keyup.enter="handleAdd"
      @keyup.escape="description = ''"
    />
    <button
      v-if="description.trim()"
      type="button"
      class="min-h-11 w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors duration-200 min-[420px]:min-h-0 min-[420px]:w-auto min-[420px]:py-1.5"
      @click="handleAdd"
    >
      Adicionar
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  add: [description: string]
}>()

const description = ref('')

function handleAdd() {
  const trimmed = capitalizeFirstWord(description.value)
  if (trimmed) {
    emit('add', trimmed)
    description.value = ''
  }
}
</script>
