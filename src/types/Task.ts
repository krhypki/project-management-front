import type { User } from './User'

export type TaskStatus = 'Created' | 'In Progress' | 'Done'

export interface Task {
  id: number
  name: string
  code: string
  status: TaskStatus
  desc: string
  reporter: User
  assignee?: User
  project: string
}
