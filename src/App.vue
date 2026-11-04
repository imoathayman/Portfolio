<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSections } from './composables/useSections'
import AppWheel from './components/AppWheel.vue'
import AppChrome from './components/AppChrome.vue'

const { locale } = useI18n()
const { cur, go } = useSections()

watch(
  locale,
  (value) => {
    document.documentElement.lang = value
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', value)
  },
  { immediate: true },
)

function onKeydown(e) {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName) || e.target?.isContentEditable) return
  if (e.key === 'ArrowDown') go(cur.value + 1)
  if (e.key === 'ArrowUp') go(cur.value - 1)
}

let touchStartY = 0
let touchStartX = 0

function onTouchStart(e) {
  if (e.touches && e.touches.length === 1) {
    touchStartY = e.touches[0].clientY
    touchStartX = e.touches[0].clientX
  }
}

function onTouchEnd(e) {
  if (!e.changedTouches || e.changedTouches.length !== 1) return
  const dy = e.changedTouches[0].clientY - touchStartY
  const dx = e.changedTouches[0].clientX - touchStartX

  if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * 1.4) {
    if (document.body.classList.contains('detail-open')) return
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return

    const scrollable = e.target?.closest('.about, .skills, .experience, .contact')
    if (scrollable) {
      const atTop = scrollable.scrollTop <= 5
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 5
      if (dy < 0 && !atBottom) return
      if (dy > 0 && !atTop) return
    }

    if (dy < 0) {
      go(cur.value + 1)
    } else {
      go(cur.value - 1)
    }
  }
}

onMounted(() => {
  addEventListener('keydown', onKeydown)
  addEventListener('touchstart', onTouchStart, { passive: true })
  addEventListener('touchend', onTouchEnd, { passive: true })
})
onUnmounted(() => {
  removeEventListener('keydown', onKeydown)
  removeEventListener('touchstart', onTouchStart)
  removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <a href="#main-content" class="skip-link">
    {{ locale === 'ar' ? 'تخطي إلى المحتوى' : 'Skip to content' }}
  </a>
  <main id="main-content" class="stage">
    <AppWheel />
    <AppChrome />
  </main>
</template>

<style scoped>
.stage {
  position: relative;
  height: 100dvh;
  width: 100%;
  /*
    `clip`, not `hidden`: the wheel's rotated panels sit far outside the viewport by
    design (huge radius trick). `overflow:hidden` still creates a scrollable region
    internally, and a focus-triggered scrollIntoView on any clicked control silently
    scrolled this container — visually "detaching" the whole page. `clip` disallows
    any scrollable region at all, so that class of bug can't happen here.
  */
  overflow: clip;
}
</style>
