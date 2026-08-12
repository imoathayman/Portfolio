<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSections, SECTION_KEYS } from '../composables/useSections'
import { NAV_ICON_PATHS } from '../constants/navIcons'
import logoUrl from '../assets/logo.png'

const { t, locale } = useI18n()
const { cur, go } = useSections()

const counterText = computed(() => String(cur.value + 1).padStart(2, '0') + ' / 06')
</script>

<template>
  <div class="chrome">
    <div class="brand">
      <img class="mark" :src="logoUrl" alt="" />
      <span>{{ t('brand.name') }}</span>
    </div>

    <div class="lang">
      <button type="button" :class="{ on: locale === 'en' }" @click="locale = 'en'">EN</button>
      <span style="opacity: 0.4">/</span>
      <button type="button" :class="{ on: locale === 'ar' }" @click="locale = 'ar'">ع</button>
    </div>

    <nav class="dock" :aria-label="t('nav.hero')">
      <button
        v-for="(key, i) in SECTION_KEYS"
        :key="key"
        type="button"
        :aria-label="t(`nav.${key}`)"
        :aria-current="i === cur ? 'true' : 'false'"
        @click="go(i)"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          v-html="NAV_ICON_PATHS[key]"
        ></svg>
        <span class="tip">{{ t(`nav.${key}`) }}</span>
      </button>
    </nav>

    <div class="counter">{{ counterText }}</div>
  </div>
</template>

<style scoped>
.chrome {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  opacity: 1;
  transition: opacity 340ms var(--ease);
}
.chrome > * {
  pointer-events: auto;
}

.brand {
  position: absolute;
  top: 38px;
  inset-inline-start: clamp(32px, 5vw, 90px);
  display: flex;
  align-items: center;
  gap: 12px;
}
.mark {
  height: 34px;
  width: auto;
  /* natural crop ratio (~1.4:1) — never stretched, per identity/01-logo.md */
  display: block;
}
.brand span {
  font-size: 14px;
  font-weight: 600;
}

.lang {
  position: absolute;
  top: 40px;
  inset-inline-end: clamp(32px, 5vw, 90px);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
}
.lang button {
  font: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--color-ink);
  opacity: 0.5;
  padding: 4px 2px;
}
.lang button.on {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
}

.dock {
  position: absolute;
  top: 50%;
  inset-inline-start: clamp(30px, 4.4vw, 74px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.dock button {
  position: relative;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  color: var(--color-soft);
  display: grid;
  place-items: center;
  transition:
    color var(--dur) var(--ease),
    transform var(--dur) var(--ease);
}
.dock button:hover {
  color: var(--color-primary);
}
.dock button[aria-current='true'] {
  color: var(--color-primary-deep);
  transform: scale(1.12);
}
.dock button:focus-visible {
  outline: 2px solid var(--color-primary-deep);
  outline-offset: 6px;
  border-radius: 4px;
}
.dock .tip {
  position: absolute;
  inset-inline-start: calc(100% + 14px);
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-2);
  opacity: 0;
  transition: opacity var(--dur) var(--ease);
  pointer-events: none;
}
.dock button:hover .tip,
.dock button:focus-visible .tip {
  opacity: 1;
}

.counter {
  position: absolute;
  bottom: 34px;
  inset-inline-start: clamp(32px, 5vw, 90px);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--color-ink-2);
}

@media (max-width: 900px) {
  .dock {
    flex-direction: row;
    top: auto;
    bottom: 26px;
    inset-inline-start: 50%;
    transform: translateX(-50%);
    gap: 18px;
  }
  .dock .tip {
    display: none;
  }
  .counter {
    display: none;
  }
}
</style>

<style>
/* Unscoped: see HeroView.vue for why :global() + Tailwind's Lightning CSS pipeline can't be trusted here. */
body.detail-open .chrome {
  opacity: 0;
  pointer-events: none;
}
body.detail-open .chrome > * {
  pointer-events: none;
}
</style>
