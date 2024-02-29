import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComponentsView from '@/views/ComponentsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import ProjectListView from '@/views/ProjectListView.vue'
import ProjectView from '@/views/ProjectView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TaskView from '@/views/TaskView.vue'
import TaskListView from '@/views/TaskListView.vue'
import CreateTaskView from '@/views/CreateTaskView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      unauthorized: true
    }
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      unauthorized: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      unauthorized: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: ChangePasswordView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectListView
  },
  {
    name: 'project',
    path: '/project/:code',
    component: ProjectView
  },
  {
    name: 'task',
    path: '/task/:code',
    component: TaskView
  },
  {
    name: 'tasks',
    path: '/tasks',
    component: TaskListView
  },
  {
    name: 'create-task',
    path: '/task/new',
    component: CreateTaskView
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { token } = useAuthStore()

  // authorized user trying to access unauthorized route
  if (to.meta.unauthorized && token && to.name !== 'home') {
    next({ name: 'home' })
    return
  }

  // unauthorized user trying to access authorized route
  if (!to.meta.unauthorized && !token) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
