export interface Task {
  id: string
  title: string
  publishedAt: string | null
  status: TaskStatus
  createdAt: string
  updatedAt: string
  subtasks?: Subtask[]
  _count?: { subtasks: number; completedSubtasks?: number }
}

export type TaskStatus = 'todo' | 'doing' | 'done' | null

export interface Subtask {
  id: string
  taskId: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  title: string
  publishedAt?: string | null
  subtasks?: string[]
}

export interface UpdateTaskInput {
  title: string
  publishedAt?: string | null
}

export interface CreateSubtaskInput {
  taskId: string
  description: string
}

export interface AuthResponse {
  token: string
  user: { username: string }
}

export interface ApiError {
  statusCode: number
  statusMessage: string
  data?: any
}
