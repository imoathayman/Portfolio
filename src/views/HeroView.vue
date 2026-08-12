<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSections, SECTION_KEYS } from '../composables/useSections'
import photoUrl from '../assets/moath.png'

const { t, tm, locale } = useI18n()
const { go } = useSections()

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

const headline = ref('')
const roleText = ref('')
const roleStatic = computed(() => tm('hero.roles')[0])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function pickHook() {
  const hooks = tm('hero.hooks')
  const prev = sessionStorage.getItem('lastHook')
  let pool = hooks.filter((h) => h !== prev)
  if (!pool.length) pool = hooks
  const chosen = pool[Math.floor(Math.random() * pool.length)]
  sessionStorage.setItem('lastHook', chosen)
  return chosen
}

let typeToken = 0

async function typeLoop(token) {
  const roles = tm('hero.roles')
  if (reduced) {
    roleText.value = roles[0]
    return
  }
  const rtl = locale.value === 'ar'
  let i = 0
  while (token === typeToken) {
    const text = roles[i % roles.length]
    const units = rtl ? text.split(' ') : [...text]
    const joiner = rtl ? ' ' : ''
    for (let n = 1; n <= units.length; n++) {
      if (token !== typeToken) return
      roleText.value = units.slice(0, n).join(joiner)
      await sleep(rtl ? 150 : 55)
    }
    await sleep(2000)
    for (let n = units.length - 1; n >= 0; n--) {
      if (token !== typeToken) return
      roleText.value = units.slice(0, n).join(joiner)
      await sleep(rtl ? 70 : 28)
    }
    await sleep(280)
    i++
  }
}

function restart() {
  headline.value = pickHook()
  typeToken++
  roleText.value = ''
  typeLoop(typeToken)
}

onMounted(restart)
watch(locale, restart)
onBeforeUnmount(() => {
  typeToken++
})
</script>

<template>
  <section class="hero">
    <div class="hero-field-soft" aria-hidden="true"></div>
    <div class="hero-ring" aria-hidden="true"></div>
    <div class="hero-field" aria-hidden="true"></div>
    <img class="hero-photo" :src="photoUrl" :alt="t('hero.photoAlt')" draggable="false" />
    <div class="hero-content">
      <h1 class="hero-headline whitespace-pre-line">{{ headline }}</h1>
      <p class="sr-only">{{ roleStatic }}</p>
      <p class="hero-role" aria-hidden="true">
        <span>{{ roleText }}</span><span class="hero-caret"></span>
      </p>
      <div class="hero-cta">
        <button type="button" class="btn btn-primary" @click="go(SECTION_KEYS.indexOf('projects'))">
          {{ t('hero.cta.projects') }}
        </button>
        <button type="button" class="btn btn-secondary" @click="go(SECTION_KEYS.indexOf('contact'))">
          {{ t('hero.cta.contact') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.hero-field {
  position: absolute;
  bottom: -14vh;
  inset-inline-end: -6vw;
  width: min(56vw, 860px);
  height: min(112vh, 1020px);
  background: var(--color-primary);
  border-radius: 46% 54% 40% 60% / 52% 44% 56% 48%;
  z-index: 1;
}
.hero-field-soft {
  position: absolute;
  bottom: -8vh;
  inset-inline-end: 6vw;
  width: min(44vw, 660px);
  height: min(86vh, 800px);
  background: var(--color-soft);
  border-radius: 58% 42% 52% 48% / 46% 58% 42% 54%;
  opacity: 0.55;
  z-index: 0;
}
.hero-ring {
  position: absolute;
  top: 50%;
  inset-inline-end: -16vw;
  width: min(52vw, 720px);
  aspect-ratio: 1;
  border: 1px solid var(--color-soft);
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 0;
}
.hero-photo {
  position: absolute;
  bottom: 0;
  inset-inline-end: 4vw;
  height: min(92vh, 880px);
  width: auto;
  z-index: 2;
  -webkit-user-drag: none;
}

.hero-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-start: clamp(96px, 10vw, 180px);
  max-width: min(46vw, 540px);
  z-index: 3;
}
.hero-headline {
  font-size: clamp(38px, 4.6vw, 64px);
  line-height: 1.16;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.hero-role {
  margin-top: 22px;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.9;
  min-height: 1.9em;
}
.hero-caret {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  background: var(--color-primary-deep);
  vertical-align: -3px;
  margin-inline-start: 4px;
  animation: hero-caret-blink 1.05s steps(1) infinite;
}
@keyframes hero-caret-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-caret {
    display: none;
  }
}

.hero-cta {
  display: flex;
  gap: 14px;
  margin-top: 34px;
  flex-wrap: wrap;
}
.btn {
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 7px;
  border: 1.5px solid var(--color-primary-deep);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background var(--dur) var(--ease);
}
.btn-primary {
  background: var(--color-primary-deep);
  color: #fff;
}
.btn-primary:hover {
  background: var(--color-ink);
}
.btn-secondary {
  background: transparent;
  color: var(--color-primary-deep);
}
.btn-secondary:hover {
  background: var(--color-bg-alt);
}
.btn:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .hero-content {
    inset-inline-start: clamp(24px, 6vw, 48px);
    max-width: 74vw;
    top: 32%;
  }
  .hero-field {
    width: 96vw;
    height: 70vh;
    bottom: -14vh;
    inset-inline-end: -24vw;
  }
  .hero-field-soft,
  .hero-ring {
    display: none;
  }
  .hero-photo {
    height: 50vh;
    inset-inline-end: -6vw;
  }
}
</style>

<style>
/*
  Unscoped on purpose: Vue's scoped-style `:global()` escape hatch gets mangled by the
  Tailwind v4 (Lightning CSS) build pipeline here — it drops the descendant selector and
  the rule ends up applying to <html> itself (mirrors the whole page). Plain global rules
  targeting these component-specific classnames sidestep the bug.
*/
[dir='rtl'] .hero-field,
[dir='rtl'] .hero-field-soft,
[dir='rtl'] .hero-photo {
  transform: scaleX(-1);
}
[dir='rtl'] .hero-headline {
  font-size: clamp(34px, 4.2vw, 58px);
  line-height: 1.34;
}
</style>
