import { prisma } from '~/server/utils/prisma'
import { getTaskProgress } from '~/server/utils/status'

export default defineEventHandler(async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { publishedAt: { sort: 'desc', nulls: 'last' } },
  })

  const tasksWithProgress = await Promise.all(
    tasks.map(async (task) => {
      const { status, subtaskCount, completedCount } = await getTaskProgress(task.id)
      return {
        ...task,
        status,
        _count: {
          subtasks: subtaskCount,
          completedSubtasks: completedCount,
        },
      }
    })
  )

  return tasksWithProgress
})
