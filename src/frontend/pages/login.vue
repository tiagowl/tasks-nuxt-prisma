<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-800 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white tracking-tight">TaskFlow</h1>
        <p class="text-primary-200 mt-2 text-sm">Gerencie suas tarefas com eficiência</p>
      </div>

      <div class="bg-white rounded-xl shadow-xl p-8">
        <h2 class="text-xl font-semibold text-neutral-800 mb-6 text-center">Acessar Sistema</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-neutral-700 mb-1">Usuário</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Digite seu usuário"
              :class="['w-full px-3 py-2 border rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-primary-500 transition-colors duration-200', errors.username ? 'border-error focus:ring-error' : 'border-neutral-300 focus:ring-primary-500']"
              :disabled="loading"
              @input="errors.username = ''"
            />
            <p v-if="errors.username" class="text-error text-xs mt-1">{{ errors.username }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-1">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              :class="['w-full px-3 py-2 border rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-primary-500 transition-colors duration-200', errors.password ? 'border-error focus:ring-error' : 'border-neutral-300 focus:ring-primary-500']"
              :disabled="loading"
              @input="errors.password = ''"
            />
            <p v-if="errors.password" class="text-error text-xs mt-1">{{ errors.password }}</p>
          </div>

          <div v-if="errorMessage" class="bg-error/10 border border-error/20 rounded-md px-4 py-3 flex items-center gap-2 shake">
            <span class="text-error text-sm">{{ errorMessage }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading || !username || !password"
            class="w-full py-2.5 px-4 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'guest',
})

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const errors = ref({ username: '', password: '' })

async function handleLogin() {
  errorMessage.value = ''
  errors.value = { username: '', password: '' }

  if (!username.value) {
    errors.value.username = 'Usuário é obrigatório'
    return
  }
  if (!password.value) {
    errors.value.password = 'Senha é obrigatória'
    return
  }

  loading.value = true
  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || 'Credenciais inválidas'
  } finally {
    loading.value = false
  }
}
</script>
