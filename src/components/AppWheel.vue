<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSections, SECTION_KEYS } from '../composables/useSections'
import HeroView from '../views/HeroView.vue'
import AboutView from '../views/AboutView.vue'
import SkillsView from '../views/SkillsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import ContactView from '../views/ContactView.vue'

const COMPONENTS = {
  hero: HeroView,
  about: AboutView,
  skills: SkillsView,
  projects: ProjectsView,
  experience: ExperienceView,
  contact: ContactView,
}

const { cur } = useSections()
const { locale } = useI18n()

const R = ref(3000)
function sizeWheel() {
  const d = Math.hypot(window.innerWidth, window.innerHeight)
  R.value = Math.round(d * 2.15)
}

onMounted(() => {
  sizeWheel()
  addEventListener('resize', sizeWheel)
})
onUnmounted(() => removeEventListener('resize', sizeWheel))
</script>

<template>
  <div class="wheel" :style="{ '--R': R + 'px', '--cur': cur }">
    <div
      class="panel"
      v-for="(key, i) in SECTION_KEYS"
      :key="key"
      :style="{ '--i': i }"
      :class="{ 'is-current': i === cur }"
      :inert="i !== cur"
      :aria-hidden="i !== cur ? 'true' : undefined"
    >
      <div class="upright" :style="{ direction: locale === 'ar' ? 'rtl' : 'ltr' }">
        <component :is="COMPONENTS[key]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wheel {
  position: absolute;
  left: 50%;
  top: calc(50% + var(--R));
  width: 0;
  height: 0;
  /*
    Forced ltr on purpose: this is pure circular-carousel geometry (rotate/translate math),
    not text layout. In this browser's rendering, `direction:rtl` on an ancestor of a
    position:absolute + transform chain this deep produces a wrong final screen position
    for every panel except the one at --i:0 (confirmed by comparing computed transform
    matrices, which are byte-identical between ltr/rtl — only the rendered position
    differs). Keeping the geometry layer pinned to ltr sidesteps that entirely.
    `.upright` re-asserts the real locale's direction below so the actual section
    content still gets correct RTL logical-property behavior.
  */
  direction: ltr;
  transform: rotate(calc(var(--cur) * var(--step) * -1));
  transition: transform var(--dur-spin) var(--ease-spin);
}
.panel {
  position: absolute;
  width: 100vw;
  height: 100dvh;
  transform:
    rotate(calc(var(--i) * var(--step))) translate(0, calc(-1 * var(--R)))
    rotate(calc(var(--i) * var(--step) * -1)) translate(-50%, -50%);
  will-change: transform;
}
.upright {
  position: absolute;
  inset: 0;
  overflow: clip;
  transform: rotate(calc(var(--cur) * var(--step)));
  transition: transform var(--dur-spin) var(--ease-spin);
}

@media (prefers-reduced-motion: reduce) {
  .wheel {
    transition: none;
  }
  .panel {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    transform: none;
    transition: opacity 200ms ease;
    opacity: 0;
  }
  .panel.is-current {
    opacity: 1;
  }
  .upright {
    transition: none;
    transform: none;
  }
}
</style>
