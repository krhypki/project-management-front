import type { User } from './User'

export interface Task {
  id: number
  name: string
  code: string
  status: 'Created' | 'In Progress' | 'Done'
  desc: string
  reporter: User
  assignee?: User
  project: string
}
