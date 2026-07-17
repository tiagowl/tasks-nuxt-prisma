import { prisma } from './prisma'

export type TaskStatus = 'todo' | 'doing' | 'done' | null

export interface TaskProgress {
  status: TaskStatus
  subtaskCount: number
  completedCount: number
}

export async function getTaskProgress(taskId: string): Promise<TaskProgress> {
  const [subtaskCount, completedCount] = await Promise.all([
    prisma.subtask.count({ where: { taskId } }),
    prisma.subtask.count({ where: { taskId, completed: true } }),
  ])

  return {
    status: calculateTaskStatusSync(subtaskCount, completedCount),
    subtaskCount,
    completedCount,
  }
}

export async function calculateTaskStatus(taskId: string): Promise<TaskStatus> {
  const progress = await getTaskProgress(taskId)
  return progress.status
}

export function calculateTaskStatusSync(total: number, completed: number): TaskStatus {
  if (total === 0) return null
  if (completed === 0) return 'todo'
  if (completed === total) return 'done'
  return 'doing'
}
