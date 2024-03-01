export type TaskStatus = 'Created' | 'In Progress' | 'Done'

export interface Task {
  name: string
  code?: string
  status: TaskStatus
  desc: string
  reporter: string
  assignee?: string
  project: string
}
