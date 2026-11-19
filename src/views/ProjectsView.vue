<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectWindowPlaceholder from '../components/ProjectWindowPlaceholder.vue'

const { t, tm } = useI18n()

const items = computed(() => tm('projects.items') || [])
const activeIndex = ref(0)
const direction = ref(1)

const active = computed(() => items.value[activeIndex.value] || null)
const total = computed(() => items.value.length)

function formatNum(n) {
  return String(n).padStart(2, '0')
}

function goTo(i) {
  if (!total.value || i === activeIndex.value) return
  direction.value = i > activeIndex.value ? 1 : -1
  activeIndex.value = (i + total.value) % total.value
}

function next() {
  if (!total.value) return
  direction.value = 1
  activeIndex.value = (activeIndex.value + 1) % total.value
}

function prev() {
  if (!total.value) return
  direction.value = -1
  activeIndex.value = (activeIndex.value - 1 + total.value) % total.value
}

function onKeydown(e) {
  if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
  const isRtl = document.documentElement.dir === 'rtl'
  if (e.key === 'ArrowRight') {
    isRtl ? prev() : next()
  } else if (e.key === 'ArrowLeft') {
    isRtl ? next() : prev()
  }
}

onMounted(() => addEventListener('keydown', onKeydown))
onBeforeUnmount(() => removeEventListener('keydown', onKeydown))
</script>

<template>
  <section class="projects" aria-label="Projects showcase">
    <div class="pr-wrap" v-if="active">
      <div class="pr-slider">
        <Transition :name="direction >= 0 ? 'slide-fwd' : 'slide-back'" mode="out-in">
          <article :key="active.name" class="pr-case">
            <div class="pr-visual">
              <ProjectWindowPlaceholder class="pr-preview" :project="active.name" />
            </div>

            <div class="pr-body">
              <div class="pr-meta-top">
                <span class="pr-counter">{{ formatNum(activeIndex + 1) }} / {{ formatNum(total) }}</span>
                <span v-if="active.status" class="pr-status">
                  <span class="status-dot"></span>
                  {{ active.status }}
                </span>
              </div>

              <h2 class="pr-title">{{ active.name }}</h2>
              <p class="pr-role">{{ active.role }}</p>
              <p class="pr-desc">{{ active.desc }}</p>

              <div class="pr-metrics" v-if="active.metrics?.length">
                <div class="pr-metric" v-for="m in active.metrics" :key="m[1]">
                  <b>{{ m[0] }}</b>
                  <span>{{ m[1] }}</span>
                </div>
              </div>

              <div class="pr-foot">
                <div class="chips">
                  <span class="chip" v-for="chip in active.chips" :key="chip">{{ chip }}</span>
                </div>

                <a
                  v-if="active.url"
                  class="pr-link"
                  :href="active.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ active.link }}
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3.6 14.4 14.4 3.6" /><path d="M6.6 3.6h7.8v7.8" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </Transition>

        <div class="pr-controls">
          <button
            type="button"
            class="pr-nav-btn"
            aria-label="Previous project"
            @click="prev"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11.5 4 6.5 9l5 5" />
            </svg>
          </button>

          <div class="pr-tabs" role="tablist" aria-label="Select project">
            <button
              v-for="(p, i) in items"
              :key="p.name"
              type="button"
              role="tab"
              class="pr-tab"
              :class="{ active: i === activeIndex }"
              :aria-selected="i === activeIndex"
              @click="goTo(i)"
            >
              <span class="pr-tab-num">{{ formatNum(i + 1) }}</span>
              <span class="pr-tab-name">{{ p.name }}</span>
            </button>
          </div>

          <button
            type="button"
            class="pr-nav-btn"
            aria-label="Next project"
            @click="next"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6.5 4 11.5 9l-5 5" />
            </svg>
          </button>
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
  padding: clamp(72px, 10vh, 96px) clamp(24px, 4vw, 64px) clamp(96px, 13vh, 130px);
}

.pr-slider {
  width: min(1020px, 100%);
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(16px, 2.4vh, 24px);
}

.pr-case {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  min-width: 0;
  background: var(--color-bg);
  border: 1.5px solid var(--color-soft);
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 24px 60px -30px rgba(44, 110, 158, 0.22);
  min-height: clamp(360px, 50vh, 450px);
}

.pr-visual {
  position: relative;
  background: var(--color-bg-alt);
  padding: 0;
  display: flex;
  overflow: hidden;
}

.pr-visual :deep(.win) {
  border: 0;
  border-radius: 0;
  width: 100%;
  height: 100%;
}

.pr-visual :deep(.win-shot) {
  aspect-ratio: auto;
}

.pr-body {
  padding: clamp(24px, 3vw, 36px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  background: var(--color-bg);
}

.pr-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pr-counter {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-primary-deep);
}

.pr-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-2);
  background: var(--color-bg-alt);
  padding: 4px 10px;
  border-radius: 99px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary-deep);
}

.pr-title {
  margin: 0;
  font-size: clamp(24px, 2.5vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-ink);
}

.pr-role {
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-primary-deep);
}

.pr-desc {
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-ink-2);
}

.pr-metrics {
  display: flex;
  gap: clamp(16px, 2vw, 28px);
  padding: 12px 0;
  margin-top: 2px;
  border-top: 1px solid var(--color-bg-alt);
  border-bottom: 1px solid var(--color-bg-alt);
  flex-wrap: wrap;
}

.pr-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pr-metric b {
  font-size: 18px;
  font-weight: 800;
  color: var(--color-ink);
  line-height: 1.1;
}

.pr-metric span {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-ink-2);
}

.pr-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--color-ink);
  background: var(--color-bg-alt);
  border-radius: 99px;
  padding: 4px 11px;
}

.pr-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: var(--color-primary-deep);
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 99px;
  transition: background var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease);
}

.pr-link:hover {
  background: #235880;
  transform: translateY(-1px);
}

.pr-link:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}

/* Slider controls */
.pr-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pr-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--color-soft);
  background: var(--color-bg);
  color: var(--color-primary-deep);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}

.pr-nav-btn:hover {
  background: var(--color-primary-deep);
  border-color: var(--color-primary-deep);
  color: #fff;
}

.pr-nav-btn:focus-visible {
  outline: 2px solid var(--color-primary-deep);
  outline-offset: 2px;
}

.pr-tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  background: var(--color-bg-alt);
  border-radius: 99px;
  border: 1px solid var(--color-soft);
  overflow-x: auto;
  max-width: 100%;
}

.pr-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: var(--color-ink-2);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 99px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}

.pr-tab:hover {
  color: var(--color-ink);
}

.pr-tab.active {
  background: var(--color-primary-deep);
  color: #fff;
}

.pr-tab:focus-visible {
  outline: 2px solid var(--color-primary-deep);
  outline-offset: 2px;
}

.pr-tab-num {
  font-size: 11px;
  opacity: 0.72;
}

/* Transitions */
.slide-fwd-enter-active,
.slide-fwd-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: opacity 240ms var(--ease), transform 280ms var(--ease);
}

.slide-fwd-enter-from {
  opacity: 0;
  transform: translateX(18px);
}
.slide-fwd-leave-to {
  opacity: 0;
  transform: translateX(-18px);
}

.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-18px);
}
.slide-back-leave-to {
  opacity: 0;
  transform: translateX(18px);
}

@media (max-width: 900px) {
  .projects {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .pr-wrap {
    position: relative;
    inset: auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: var(--gutter-mobile);
    padding-block: var(--pad-block-mobile) var(--dock-clearance);
  }
  .pr-case {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
    border-radius: 22px;
  }
  .pr-visual {
    padding: 0;
    aspect-ratio: 16 / 10;
  }
  .pr-body {
    padding: 18px 16px 20px;
    gap: 10px;
    min-width: 0;
  }
  .pr-controls {
    width: 100%;
    min-width: 0;
    gap: 6px;
  }
  .pr-nav-btn {
    width: 34px;
    height: 34px;
  }
  .pr-tabs {
    flex: 1 1 0;
    min-width: 0;
    justify-content: center;
    gap: 2px;
    padding: 3px;
    scrollbar-width: none;
  }
  .pr-tabs::-webkit-scrollbar {
    display: none;
  }
  .pr-tab {
    padding: 6px 8px;
    font-size: 11.5px;
  }
  .pr-tab-num {
    display: none;
  }
}
</style>

<style>
[dir='rtl'] .pr-link svg,
[dir='rtl'] .pr-nav-btn svg {
  transform: scaleX(-1);
}
</style>
