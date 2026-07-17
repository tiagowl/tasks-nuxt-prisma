export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ username: string } | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function initialize() {
    if (import.meta.client) {
      const stored = localStorage.getItem('auth')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          token.value = parsed.token
          user.value = parsed.user
        } catch {
          localStorage.removeItem('auth')
        }
      }
    }
  }

  async function login(username: string, password: string) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    })

    token.value = data.token
    user.value = data.user

    if (import.meta.client) {
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }))
    }
  }

  function logout() {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth')
    }
  }

  initialize()

  return { token, user, isAuthenticated, login, logout }
})
