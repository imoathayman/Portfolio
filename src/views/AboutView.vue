<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <section class="about">
    <div class="about-arc" aria-hidden="true"></div>
    <div class="about-arc-2" aria-hidden="true"></div>
    <div class="about-wrap">
      <div>
        <p class="about-lead">
          {{ t('about.leadPre') }} <em>{{ t('about.leadEm') }}</em>
        </p>
        <p class="about-body">{{ t('about.body') }}</p>
      </div>
      <div class="about-values">
        <div class="about-value" v-for="value in tm('about.values')" :key="value.title">
          <h3>{{ value.title }}</h3>
          <p>{{ value.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.about-arc {
  position: absolute;
  bottom: -38vh;
  inset-inline-end: -14vw;
  width: min(66vw, 900px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-bg-alt);
  z-index: 0;
}
.about-arc-2 {
  position: absolute;
  bottom: -30vh;
  inset-inline-end: -4vw;
  width: min(44vw, 620px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--color-soft);
  z-index: 0;
}

.about-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-start: clamp(96px, 10vw, 180px);
  inset-inline-end: clamp(96px, 10vw, 180px);
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}

.about-lead {
  font-size: clamp(24px, 2.5vw, 34px);
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: -0.005em;
}
.about-lead em {
  font-style: normal;
  color: var(--color-primary-deep);
}
.about-body {
  margin-top: 24px;
  font-size: 16px;
  line-height: 2;
  color: var(--color-ink-2);
  max-width: 520px;
}

.about-values {
  display: grid;
  gap: 22px;
  padding-top: 8px;
}
.about-value {
  border-inline-start: 2px solid var(--color-soft);
  padding-inline-start: 16px;
  transition: border-color var(--dur) var(--ease);
}
.about-value:hover {
  border-color: var(--color-primary-deep);
}
.about-value h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink);
}
.about-value p {
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--color-ink-2);
  margin-top: 4px;
}

@media (max-width: 900px) {
  /* Fits at 640px tall but overflows once the browser URL bar takes ~80px.
     Scrolls only when it needs to; short content still reads as a static screen. */
  .about {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .about-wrap {
    position: static;
    transform: none;
    inset: auto;
    grid-template-columns: 1fr;
    gap: 28px;
    padding-inline: var(--gutter-mobile);
    padding-block: var(--pad-block-mobile) var(--dock-clearance);
  }
}
</style>
