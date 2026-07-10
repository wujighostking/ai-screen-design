import type { Component } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

type ViewModule = {
  default: Component & {
    __name: string
  }
}

function _createRouter(): RouteRecordRaw[] {
  const views = import.meta.glob<ViewModule>('../views/**/*.vue', { eager: true })

  return Object.entries(views).map(([path, component]: [path: string, component: ViewModule]) => {
    const _component = component.default

    return {
      name: _component.name ?? _component?.__name,
      path: `/${_component.name ?? _component?.__name}`,
      component: () => import(path),
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: _createRouter(),
})

export default router
