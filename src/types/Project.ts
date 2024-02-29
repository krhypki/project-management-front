import type { Task } from './Task'
import type { User } from './User'

export interface Project {
  id: number
  name: string
  code: string
  owner: User
  tasks: Task[]
}
