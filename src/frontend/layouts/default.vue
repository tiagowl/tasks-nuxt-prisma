<template>
  <div class="min-h-screen bg-neutral-50">
    <AppHeader v-if="authStore.isAuthenticated" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
