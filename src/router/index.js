import { createRouter, createWebHistory } from 'vue-router'
import HeroView from '../views/HeroView.vue'
import AboutView from '../views/AboutView.vue'
import SkillsView from '../views/SkillsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'hero', component: HeroView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/skills', name: 'skills', component: SkillsView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/experience', name: 'experience', component: ExperienceView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
