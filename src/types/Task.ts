import type { User } from './User'

export type TaskStatus = 'Created' | 'In Progress' | 'Done'

export interface Task {
  name: string
  code: string
  status: TaskStatus
  desc: string
  reporter: string | User
  assignee?: string | User
  project: string
}
