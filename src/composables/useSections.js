import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const SECTION_KEYS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

const busy = ref(false)

export function useSections() {
  const route = useRoute()
  const router = useRouter()
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const cur = computed(() => {
    const i = SECTION_KEYS.indexOf(route.name)
    return i === -1 ? 0 : i
  })

  async function go(i) {
    if (busy.value || i === cur.value || i < 0 || i > SECTION_KEYS.length - 1) return
    busy.value = true
    router.push({ name: SECTION_KEYS[i] })
    await new Promise((resolve) => setTimeout(resolve, reduced ? 0 : 1150))
    busy.value = false
  }

  return { cur, go, busy, reduced }
}
