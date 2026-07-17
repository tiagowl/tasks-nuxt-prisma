<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
        @click="$emit('cancel')"
      >
        <Transition name="modal-content">
          <div
            v-if="open"
            class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
            @click.stop
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-neutral-800">{{ title }}</h3>
                <p class="text-sm text-neutral-500 mt-1">{{ message }}</p>
              </div>
            </div>
            <div class="flex items-center justify-end gap-3 mt-6">
              <button
                class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors duration-200"
                @click="$emit('cancel')"
              >
                Cancelar
              </button>
              <button
                class="px-4 py-2 text-sm font-medium text-white bg-error rounded-md hover:bg-red-600 transition-colors duration-200"
                @click="$emit('confirm')"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  message: string
  confirmText?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style scoped>
.modal-backdrop-enter-active {
  transition: opacity 200ms ease-out;
}
.modal-backdrop-leave-active {
  transition: opacity 200ms ease-in;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}
.modal-content-enter-active {
  transition: all 200ms ease-out;
}
.modal-content-leave-active {
  transition: all 150ms ease-in;
}
.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
