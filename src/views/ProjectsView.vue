<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectWindowPlaceholder from '../components/ProjectWindowPlaceholder.vue'

const { t, tm } = useI18n()

const items = computed(() => tm('projects.items'))

const activeIndex = ref(1)
const openIndex = ref(null)
const detailOpen = computed(() => openIndex.value !== null)
const active = computed(() => items.value[activeIndex.value])
const openProjectData = computed(() => (openIndex.value !== null ? items.value[openIndex.value] : null))

const tileRefs = ref([])
function setTileRef(el, i) {
  if (el) tileRefs.value[i] = el
}

const detailRef = ref(null)
const halfRef = ref(null)

function setActive(i) {
  activeIndex.value = i
}

function flipTransform(half, rect) {
  const h = half.getBoundingClientRect()
  return `translate(${rect.left - h.left}px, ${rect.top - h.top}px) scale(${rect.width / h.width}, ${rect.height / h.height})`
}

async function openProject(i) {
  openIndex.value = i
  await nextTick()
  const detail = detailRef.value
  const half = halfRef.value
  const tile = tileRefs.value[i]
  if (!detail || !half || !tile) return

  const rect = tile.getBoundingClientRect()
  detail.hidden = false
  detail.classList.remove('open')
  half.style.transition = 'none'
  half.style.transform = flipTransform(half, rect)
  half.style.borderRadius = '26px'

  requestAnimationFrame(() => {
    half.style.transition = 'transform 620ms var(--ease-spin), border-radius 620ms var(--ease-spin)'
    half.style.transform = 'none'
    half.style.borderRadius = '0'
    detail.classList.add('open')
  })
}

function closeProject(instant) {
  const detail = detailRef.value
  const half = halfRef.value
  if (!detail) return

  if (instant || openIndex.value === null || detail.hidden) {
    detail.hidden = true
    detail.classList.remove('open')
    openIndex.value = null
    return
  }

  const tile = tileRefs.value[openIndex.value]
  detail.classList.remove('open')
  if (tile && half) {
    const rect = tile.getBoundingClientRect()
    half.style.transition = 'transform 560ms var(--ease-spin), border-radius 560ms var(--ease-spin)'
    half.style.transform = flipTransform(half, rect)
    half.style.borderRadius = '26px'
  }
  setTimeout(() => {
    detail.hidden = true
    if (half) {
      half.style.transition = 'none'
      half.style.transform = 'none'
    }
    openIndex.value = null
  }, 580)
}

watch(detailOpen, (isOpen) => {
  document.body.classList.toggle('detail-open', isOpen)
})

function onKeydown(e) {
  if (e.key === 'Escape') closeProject()
}

onMounted(() => addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  removeEventListener('keydown', onKeydown)
  document.body.classList.remove('detail-open')
})
</script>

<template>
  <section class="projects">
    <div class="pr-wrap">
      <div class="pr-stage" :class="{ hide: detailOpen }">
        <div class="pr-row">
          <button
            v-for="(p, i) in items"
            :key="p.name"
            :ref="(el) => setTileRef(el, i)"
            type="button"
            class="pr-tile"
            :class="{ act: i === activeIndex }"
            @mouseenter="setActive(i)"
            @focus="setActive(i)"
            @click="i === activeIndex ? openProject(i) : setActive(i)"
          >
            <ProjectWindowPlaceholder class="pr-shot" />
            <span class="pr-tname">{{ p.name }}</span>
            <span class="pr-tmeta">{{ p.chips.slice(0, 2).join(' · ') }}</span>
          </button>
        </div>
        <div class="pr-active">
          <div class="pr-ahead"><span class="pr-aname">{{ active.name }}</span></div>
          <p class="pr-adesc">{{ active.desc }}</p>
          <button type="button" class="pr-hint" @click="openProject(activeIndex)">
            {{ t('projects.hint') }}
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3.6 14.4 14.4 3.6" /><path d="M6.6 3.6h7.8v7.8" />
            </svg>
          </button>
        </div>
      </div>

      <div class="pr-detail" ref="detailRef" hidden>
        <div class="pr-half" ref="halfRef">
          <ProjectWindowPlaceholder class="pr-half-win" />
        </div>
        <button type="button" class="pr-close" :aria-label="t('projects.close')" @click="closeProject()">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
            <path d="M5 5l8 8M13 5l-8 8" />
          </svg>
        </button>
        <div class="pr-info" v-if="openProjectData">
          <div class="pr-head"><span class="pr-name">{{ openProjectData.name }}</span></div>
          <p class="pr-role">{{ openProjectData.role }}</p>
          <p class="pr-desc">{{ openProjectData.desc }}</p>
          <div class="pr-metrics">
            <div class="pr-metric" v-for="m in openProjectData.metrics" :key="m[1]">
              <b>{{ m[0] }}</b><span>{{ m[1] }}</span>
            </div>
          </div>
          <div class="pr-foot">
            <div class="chips">
              <span class="chip" v-for="chip in openProjectData.chips" :key="chip">{{ chip }}</span>
            </div>
            <a
              class="pr-link"
              :href="openProjectData.url || '#'"
              :target="openProjectData.url ? '_blank' : undefined"
              :rel="openProjectData.url ? 'noopener' : undefined"
            >
              {{ openProjectData.link }}
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3.6 14.4 14.4 3.6" /><path d="M6.6 3.6h7.8v7.8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.pr-wrap {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  align-content: center;
}
.pr-stage {
  display: grid;
  justify-items: center;
  gap: clamp(64px, 9vh, 112px);
  transition: opacity 320ms var(--ease);
}
.pr-stage.hide {
  opacity: 0;
  pointer-events: none;
}
.pr-row {
  display: flex;
  align-items: center;
  gap: clamp(14px, 1.8vw, 30px);
}
.pr-tile {
  position: relative;
  background: var(--color-soft);
  border: 0;
  border-radius: 26px;
  cursor: pointer;
  width: clamp(130px, 13vw, 186px);
  height: clamp(180px, 25vh, 238px);
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  transition:
    transform 520ms var(--ease-spin),
    background 420ms var(--ease),
    box-shadow 420ms var(--ease);
}
.pr-tile.act {
  background: var(--color-primary-deep);
  transform: scale(1.24);
  z-index: 3;
}
.pr-tile:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 6px;
}
.pr-tile :deep(.pr-shot) {
  position: absolute;
  top: -26px;
  inset-inline-start: 50%;
  width: 86%;
  transform: translateX(-50%);
  transition: transform 520ms var(--ease-spin);
}
.pr-tile.act :deep(.pr-shot) {
  top: -34px;
}
.pr-tname {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-ink);
  transition: color 420ms var(--ease);
}
.pr-tmeta {
  /* was 10.5px / --color-ink-2 on the soft-blue tile = 3.24:1, below the 4.5:1 floor */
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink);
  margin-top: 3px;
  letter-spacing: 0.02em;
  transition: color 420ms var(--ease);
}
.pr-tile.act .pr-tname {
  color: #fff;
}
.pr-tile.act .pr-tmeta {
  /* --color-soft on --color-primary-deep was 3.5:1. Reusing #fff rather than adding a
     palette tint; hierarchy against .pr-tname still reads via size (12 vs 15) + weight. */
  color: #fff;
}

.pr-active {
  width: min(680px, 70vw);
  text-align: start;
}
.pr-ahead {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.pr-aname {
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.pr-adesc {
  font-size: 14px;
  line-height: 1.85;
  color: var(--color-ink-2);
  margin-top: 8px;
}
.pr-hint {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-primary-deep);
  margin-top: 14px;
  background: none;
  border: 0;
  padding: 6px 0;
  cursor: pointer;
  border-bottom: 1.5px solid transparent;
  transition: border-color var(--dur) var(--ease);
}
.pr-hint:hover {
  border-color: var(--color-primary-deep);
}
.pr-hint:focus-visible {
  outline: 2px solid var(--color-primary-deep);
  outline-offset: 4px;
}

.pr-detail {
  position: absolute;
  inset: 0;
  z-index: 5;
}
.pr-detail[hidden] {
  display: none;
}
.pr-half {
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-start: 0;
  width: 52%;
  background: var(--color-primary-deep);
  display: grid;
  place-items: center;
  padding: 6vh 5vw;
  transform-origin: 0 0;
}
.pr-half :deep(.win) {
  max-width: min(26vw, 380px);
  opacity: 0;
  transition: opacity 170ms var(--ease);
}
.pr-detail.open .pr-half :deep(.win) {
  opacity: 1;
  transition: opacity 300ms var(--ease) 400ms;
}
.pr-close {
  position: absolute;
  top: clamp(24px, 4vh, 40px);
  inset-inline-start: clamp(24px, 2.6vw, 44px);
  z-index: 8;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: var(--color-bg);
  color: var(--color-primary-deep);
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 180ms var(--ease),
    transform 180ms var(--ease),
    background 260ms var(--ease);
}
.pr-detail.open .pr-close {
  opacity: 1;
  transform: none;
  transition:
    opacity 300ms var(--ease) 420ms,
    transform 300ms var(--ease) 420ms,
    background 260ms var(--ease);
}
.pr-close:hover {
  background: var(--color-primary);
  color: var(--color-ink);
}
.pr-close:focus-visible {
  outline: 2px solid var(--color-bg);
  outline-offset: 3px;
}
.pr-info {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateY(14px);
  inset-inline-end: clamp(40px, 6vw, 110px);
  width: min(38vw, 470px);
  z-index: 6;
  opacity: 0;
  transition:
    opacity 190ms var(--ease),
    transform 190ms var(--ease);
}
.pr-detail.open .pr-info {
  opacity: 1;
  transform: translateY(-50%);
  transition:
    opacity 340ms var(--ease) 300ms,
    transform 340ms var(--ease) 300ms;
}
.pr-name {
  font-size: clamp(24px, 2.6vw, 36px);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.pr-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.pr-role {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-deep);
  margin-top: 12px;
}
.pr-desc {
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-ink-2);
  margin-top: 12px;
}
.pr-metrics {
  display: flex;
  gap: clamp(22px, 3vw, 46px);
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-soft);
}
.pr-metric b {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-ink);
}
.pr-metric span {
  font-size: 11px;
  color: var(--color-ink-2);
  letter-spacing: 0.08em;
}
.pr-foot {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-ink);
  border: 1px solid var(--color-soft);
  border-radius: 999px;
  padding: 5px 13px;
}
.pr-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary-deep);
  text-decoration: none;
  border-bottom: 1.5px solid transparent;
  padding-bottom: 2px;
}
.pr-link:hover {
  border-color: var(--color-primary-deep);
}

@media (max-width: 900px) {
  .pr-row {
    flex-wrap: wrap;
    justify-content: center;
    gap: 26px;
  }
  .pr-tile {
    width: 38vw;
    height: 150px;
  }
  .pr-tile.act {
    transform: scale(1.1);
  }
  .pr-active {
    /* was 88vw → 21.6px gutters, out of step with the 24px used everywhere else */
    width: calc(100vw - 2 * var(--gutter-mobile));
  }
  .pr-wrap {
    /* keep the centred stage clear of the fixed dock */
    padding-block-end: var(--dock-clearance);
  }
  .pr-half {
    width: 100%;
    height: 44%;
    bottom: auto;
  }
  .pr-info {
    width: auto;
    inset-inline: var(--gutter-mobile);
    top: auto;
    bottom: 5vh;
    transform: none;
  }
  .pr-detail.open .pr-info {
    transform: none;
  }
  .pr-metrics {
    gap: 22px;
  }
}
</style>

<style>
/*
  Unscoped on purpose (see HeroView.vue for the :global()-vs-Tailwind-pipeline bug).
  Note: `:deep()` only means anything inside `<style scoped>` — plain `.pr-tile .pr-shot`
  here matches the same specificity as the scoped `:deep()` rule above, and this block's
  later source position is what lets it win the cascade.
*/
[dir='rtl'] .pr-tile .pr-shot {
  transform: translateX(50%);
}
[dir='rtl'] .pr-link svg,
[dir='rtl'] .pr-hint svg {
  transform: scaleX(-1);
}
</style>
