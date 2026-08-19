<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <section class="skills">
    <div class="sk-arc" aria-hidden="true"></div>
    <div class="sk-wrap">
      <p class="sk-lead">
        {{ t('skills.leadPre') }} <em>{{ t('skills.leadEm') }}</em>
      </p>
      <div class="layers">
        <div class="layer" v-for="layer in tm('skills.layers')" :key="layer.name">
          <div class="node" aria-hidden="true"></div>
          <div class="lname">{{ layer.name }}</div>
          <div class="lmeta">
            <p class="ldesc">{{ layer.desc }}</p>
            <div class="chips">
              <span class="chip" v-for="chip in layer.chips" :key="chip">{{ chip }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.sk-arc {
  position: absolute;
  top: -34vh;
  inset-inline-end: -12vw;
  width: min(56vw, 780px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-bg-alt);
  z-index: 0;
}

.sk-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-start: clamp(96px, 10vw, 180px);
  inset-inline-end: clamp(96px, 10vw, 180px);
  z-index: 2;
}
.sk-lead {
  font-size: clamp(22px, 2.3vw, 32px);
  line-height: 1.5;
  font-weight: 700;
  max-width: 24ch;
  letter-spacing: -0.005em;
}
.sk-lead em {
  font-style: normal;
  color: var(--color-primary-deep);
}

.layers {
  position: relative;
  margin-top: clamp(28px, 4.5vh, 52px);
}
.layers::before {
  content: '';
  position: absolute;
  inset-inline-start: 8px;
  top: 14px;
  bottom: 14px;
  width: 1px;
  background: var(--color-soft);
}
.layer {
  position: relative;
  display: grid;
  grid-template-columns: 17px minmax(120px, 150px) minmax(0, 1fr);
  gap: clamp(16px, 2.2vw, 32px);
  align-items: start;
  padding: clamp(12px, 1.9vh, 20px) 0;
}
.node {
  width: 11px;
  height: 11px;
  margin-top: 7px;
  margin-inline-start: 3px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1.5px solid var(--color-soft);
  transition:
    background var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}
.layer:hover .node {
  background: var(--color-primary-deep);
  border-color: var(--color-primary-deep);
}
.lname {
  font-size: 17px;
  font-weight: 600;
  transition: color var(--dur) var(--ease);
}
.layer:hover .lname {
  color: var(--color-primary-deep);
}
.ldesc {
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--color-ink-2);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.chip {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-ink);
  border: 1px solid var(--color-soft);
  border-radius: 999px;
  padding: 5px 13px;
}

@media (max-width: 900px) {
  /* 4 layers + chips exceed 100dvh on short phones; without this the last layer
     is clipped and unreachable (no page scroll). Same pattern as ExperienceView. */
  .skills {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .sk-wrap {
    position: static;
    transform: none;
    inset: auto;
    padding-inline: var(--gutter-mobile);
    padding-block: var(--pad-block-mobile) var(--dock-clearance);
  }
  .layer {
    grid-template-columns: 17px minmax(0, 1fr);
    gap: 14px 14px;
  }
  .layer .lmeta {
    grid-column: 2;
  }
}
</style>
