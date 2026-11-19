<script setup>
import { computed } from 'vue'
import dentShot from '../assets/projects/dent.webp'
import burgeloShot from '../assets/projects/burgelo.webp'
import spaceflexShot from '../assets/projects/spaceflex.webp'
import agecounterShot from '../assets/projects/agecounter.webp'

const props = defineProps({
  project: { type: String, default: '' },
})

const SCREENSHOTS = {
  dent: dentShot,
  burgelo: burgeloShot,
  spaceflex: spaceflexShot,
  agecounter: agecounterShot,
}

const variant = computed(() => props.project.trim().toLowerCase())
const screenshot = computed(() => SCREENSHOTS[variant.value] || null)
</script>

<template>
  <div class="win" :data-project="variant || 'default'">
    <div class="win-bar">
      <i></i><i></i><i></i>
      <span v-if="project" class="win-url">{{ project.toLowerCase() }}.app</span>
    </div>

    <div v-if="screenshot" class="win-shot">
      <img :src="screenshot" :alt="`${project} preview`" loading="lazy" />
    </div>

    <!-- DENT: Arabic dental education & marketplace (3 roles + courses/store) -->
    <div v-else-if="variant === 'dent'" class="win-body dent">
      <div class="dent-roles">
        <span class="pill active"></span>
        <span class="pill"></span>
        <span class="pill"></span>
      </div>
      <div class="dent-split">
        <div class="dent-card">
          <div class="dent-thumb primary">
            <span class="play"></span>
          </div>
          <div class="l a"></div>
          <div class="l"></div>
        </div>
        <div class="dent-card">
          <div class="dent-thumb">
            <span class="tag"></span>
          </div>
          <div class="l a"></div>
          <div class="l short"></div>
        </div>
      </div>
    </div>

    <!-- Burgelo: Restaurant order management (Kanban columns) -->
    <div v-else-if="variant === 'burgelo'" class="win-body burgelo">
      <div class="burgelo-head">
        <span class="live-dot"></span>
        <div class="l a"></div>
      </div>
      <div class="burgelo-cols">
        <div class="col">
          <span class="col-h"></span>
          <div class="ord active"></div>
          <div class="ord"></div>
        </div>
        <div class="col">
          <span class="col-h mid"></span>
          <div class="ord"></div>
          <div class="ord active"></div>
        </div>
        <div class="col">
          <span class="col-h deep"></span>
          <div class="ord"></div>
        </div>
      </div>
    </div>

    <!-- SpaceFlex: Rental-space marketplace (search + space cards) -->
    <div v-else-if="variant === 'spaceflex'" class="win-body spaceflex">
      <div class="sf-search">
        <span class="sf-dot"></span>
        <div class="l"></div>
        <span class="sf-btn"></span>
      </div>
      <div class="sf-grid">
        <div class="sf-card">
          <div class="sf-img accent"></div>
          <div class="l a"></div>
          <div class="l short"></div>
        </div>
        <div class="sf-card">
          <div class="sf-img"></div>
          <div class="l a"></div>
          <div class="l short"></div>
        </div>
      </div>
    </div>

    <!-- AgeCounter: Age calculator (3 date inputs + 3 result rows) -->
    <div v-else-if="variant === 'agecounter'" class="win-body agecounter">
      <div class="age-inputs">
        <span></span><span></span><span></span>
        <i class="age-go"></i>
      </div>
      <div class="age-res">
        <div class="age-row"><i class="num"></i><div class="l a"></div></div>
        <div class="age-row"><i class="num mid"></i><div class="l"></div></div>
        <div class="age-row"><i class="num"></i><div class="l short"></div></div>
      </div>
    </div>

    <!-- Default fallback -->
    <div v-else class="win-body">
      <div class="l a"></div>
      <div class="l"></div>
      <div class="win-grid">
        <span></span><span></span><span></span>
      </div>
      <div class="l"></div>
    </div>
  </div>
</template>

<style scoped>
.win {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border: 1px solid var(--color-soft);
  border-radius: 10px;
  overflow: hidden;
}
.win-bar {
  height: 20px;
  background: var(--color-bg-alt);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 9px;
  border-bottom: 1px solid var(--color-soft);
}
.win-bar i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-soft);
  display: block;
  flex-shrink: 0;
}
.win-url {
  margin-inline-start: auto;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-ink-2);
  opacity: 0.75;
}
.win-shot {
  width: 100%;
  flex: 1;
  min-height: 0;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-bg-alt);
}
.win-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.win-body {
  padding: 10px;
  flex: 1;
  display: grid;
  gap: 7px;
}
.win-body .l {
  height: 6px;
  border-radius: 3px;
  background: var(--color-bg-alt);
}
.win-body .l.a {
  background: var(--color-soft);
  width: 65%;
}
.win-body .l.short {
  width: 42%;
}

/* Fallback */
.win-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 2px;
}
.win-grid span {
  height: 30px;
  border-radius: 5px;
  background: var(--color-bg-alt);
}
.win-grid span:first-child {
  background: var(--color-soft);
}

/* DENT */
.dent-roles {
  display: flex;
  gap: 4px;
}
.dent-roles .pill {
  height: 6px;
  flex: 1;
  border-radius: 99px;
  background: var(--color-bg-alt);
}
.dent-roles .pill.active {
  background: var(--color-primary-deep);
}
.dent-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.dent-card {
  display: grid;
  gap: 4px;
  padding: 5px;
  border-radius: 6px;
  border: 1px solid var(--color-bg-alt);
}
.dent-thumb {
  height: 28px;
  border-radius: 4px;
  background: var(--color-bg-alt);
  display: grid;
  place-items: center;
}
.dent-thumb.primary {
  background: var(--color-soft);
}
.dent-thumb .play {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 7px;
  border-color: transparent transparent transparent var(--color-primary-deep);
}
.dent-thumb .tag {
  width: 14px;
  height: 6px;
  border-radius: 2px;
  background: var(--color-primary);
}

/* Burgelo */
.burgelo-head {
  display: flex;
  align-items: center;
  gap: 6px;
}
.burgelo-head .live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary-deep);
  flex-shrink: 0;
}
.burgelo-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.burgelo-cols .col {
  background: var(--color-bg-alt);
  border-radius: 5px;
  padding: 5px;
  display: grid;
  gap: 4px;
  align-content: start;
}
.burgelo-cols .col-h {
  height: 4px;
  width: 60%;
  border-radius: 2px;
  background: var(--color-soft);
}
.burgelo-cols .col-h.mid {
  background: var(--color-primary);
}
.burgelo-cols .col-h.deep {
  background: var(--color-primary-deep);
}
.burgelo-cols .ord {
  height: 14px;
  border-radius: 3px;
  background: var(--color-bg);
  border: 1px solid var(--color-soft);
}
.burgelo-cols .ord.active {
  border-inline-start: 3px solid var(--color-primary-deep);
}

/* SpaceFlex */
.sf-search {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  border-radius: 99px;
  background: var(--color-bg-alt);
}
.sf-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary-deep);
  flex-shrink: 0;
}
.sf-search .l {
  flex: 1;
  background: var(--color-soft);
}
.sf-btn {
  width: 12px;
  height: 6px;
  border-radius: 99px;
  background: var(--color-primary-deep);
}
.sf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.sf-card {
  display: grid;
  gap: 4px;
}
.sf-img {
  height: 30px;
  border-radius: 5px;
  background: var(--color-bg-alt);
}
.sf-img.accent {
  background: var(--color-soft);
}

/* AgeCounter */
.age-inputs {
  display: flex;
  align-items: center;
  gap: 4px;
}
.age-inputs span {
  flex: 1;
  height: 14px;
  border-radius: 4px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-soft);
}
.age-go {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary-deep);
  flex-shrink: 0;
}
.age-res {
  display: grid;
  gap: 5px;
  padding-top: 2px;
}
.age-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.age-row .num {
  width: 18px;
  height: 9px;
  border-radius: 3px;
  background: var(--color-primary-deep);
  flex-shrink: 0;
}
.age-row .num.mid {
  background: var(--color-primary);
}

@media (max-width: 900px) {
  .win-bar {
    height: 16px;
    padding: 0 7px;
  }
  .win-body {
    padding: 7px;
    gap: 5px;
  }
  .dent-thumb,
  .sf-img,
  .win-grid span {
    height: 22px;
  }
  .burgelo-cols .ord {
    height: 11px;
  }
  .age-inputs span {
    height: 11px;
  }
  .age-go {
    width: 11px;
    height: 11px;
  }
  .age-row .num {
    height: 7px;
  }
}
</style>
