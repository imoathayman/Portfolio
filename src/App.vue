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
  if (e.key === 'ArrowDown') go(cur.value + 1)
  if (e.key === 'ArrowUp') go(cur.value - 1)
}

onMounted(() => addEventListener('keydown', onKeydown))
onUnmounted(() => removeEventListener('keydown', onKeydown))
</script>

<template>
  <main class="stage">
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
