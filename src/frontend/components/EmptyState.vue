<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <div class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
      <svg class="w-10 h-10 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-neutral-700 mb-1">Nenhuma tarefa encontrada</h3>
    <p class="text-sm text-neutral-400 mb-6 max-w-xs">
      Crie sua primeira tarefa para começar a organizar seu dia.
    </p>
    <button
      class="px-6 py-2.5 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2"
      @click="$emit('create')"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Criar Tarefa
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  create: []
}>()
</script>
