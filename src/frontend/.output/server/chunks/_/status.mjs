import { p as prisma } from './prisma.mjs';

async function getTaskProgress(taskId) {
  const [subtaskCount, completedCount] = await Promise.all([
    prisma.subtask.count({ where: { taskId } }),
    prisma.subtask.count({ where: { taskId, completed: true } })
  ]);
  return {
    status: calculateTaskStatusSync(subtaskCount, completedCount),
    subtaskCount,
    completedCount
  };
}
async function calculateTaskStatus(taskId) {
  const progress = await getTaskProgress(taskId);
  return progress.status;
}
function calculateTaskStatusSync(total, completed) {
  if (total === 0) return null;
  if (completed === 0) return "todo";
  if (completed === total) return "done";
  return "doing";
}

export { calculateTaskStatus as c, getTaskProgress as g };
//# sourceMappingURL=status.mjs.map
