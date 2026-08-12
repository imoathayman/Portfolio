<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const filters = computed(() => tm('experience.filters'))
const work = computed(() => tm('experience.work'))
const learn = computed(() => tm('experience.learn'))

const filterIndex = ref(0)
const railClass = computed(() => ({
  'f-work': filterIndex.value === 1,
  'f-learn': filterIndex.value === 2,
}))
</script>

<template>
  <section class="experience">
    <div class="ex-wrap">
      <div class="ex-head">
        <p class="ex-lead">
          {{ t('experience.leadPre') }} <em>{{ t('experience.leadEm') }}</em>
        </p>
        <div class="ex-filters">
          <button
            v-for="(f, i) in filters"
            :key="f"
            type="button"
            :class="{ on: filterIndex === i }"
            @click="filterIndex = i"
          >
            {{ f }}
          </button>
        </div>
      </div>
      <div class="ex-rail" :class="railClass">
        <div class="ex-track ex-top">
          <div class="ex-card" v-for="item in work" :key="item.r">
            <p class="ex-year" :class="{ 'ex-todo': item.todo }">{{ item.y }}</p>
            <p class="ex-role">{{ item.r }}</p>
            <p class="ex-org">{{ item.o }}</p>
          </div>
        </div>
        <div class="ex-track ex-bot">
          <div class="ex-card" v-for="item in learn" :key="item.r">
            <p class="ex-year">{{ item.y }}</p>
            <p class="ex-role">{{ item.r }}</p>
            <p class="ex-org">{{ item.o }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.ex-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-start: clamp(70px, 7vw, 140px);
  inset-inline-end: clamp(70px, 7vw, 140px);
  z-index: 2;
}
.ex-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.ex-lead {
  font-size: clamp(20px, 2.1vw, 29px);
  line-height: 1.5;
  font-weight: 700;
  max-width: 24ch;
  letter-spacing: -0.005em;
}
.ex-lead em {
  font-style: normal;
  color: var(--color-primary-deep);
}
.ex-filters {
  display: flex;
  gap: 6px;
}
.ex-filters button {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-ink-2);
  background: none;
  border: 1px solid var(--color-soft);
  border-radius: 999px;
  padding: 7px 16px;
  cursor: pointer;
  transition:
    background var(--dur) var(--ease),
    color var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}
.ex-filters button.on {
  background: var(--color-primary-deep);
  border-color: var(--color-primary-deep);
  color: #fff;
}

.ex-rail {
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  height: clamp(300px, 44vh, 420px);
  margin-top: clamp(18px, 3vh, 34px);
}
.ex-rail::before {
  content: '';
  position: absolute;
  top: 50%;
  inset-inline: 0;
  height: 1px;
  background: var(--color-soft);
}
.ex-track {
  display: flex;
  gap: clamp(8px, 1.1vw, 20px);
  transition: opacity 380ms var(--ease);
}
.ex-top {
  align-items: flex-end;
}
.ex-bot {
  align-items: flex-start;
}
.ex-rail.f-work .ex-bot,
.ex-rail.f-learn .ex-top {
  opacity: 0.22;
}
.ex-card {
  flex: 1;
  min-width: 0;
  position: relative;
  padding-inline-end: 8px;
  cursor: default;
}
.ex-top .ex-card {
  padding-bottom: 28px;
}
.ex-bot .ex-card {
  padding-top: 28px;
}
.ex-card::before {
  content: '';
  position: absolute;
  inset-inline-start: 5px;
  width: 1px;
  height: 28px;
  background: var(--color-soft);
}
.ex-top .ex-card::before {
  bottom: 0;
}
.ex-bot .ex-card::before {
  top: 0;
}
.ex-card::after {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--color-soft);
  border: 2px solid var(--color-soft);
  transition:
    background var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}
.ex-top .ex-card::after {
  bottom: -6px;
}
.ex-bot .ex-card::after {
  top: -6px;
  background: var(--color-bg);
}
.ex-card:hover::after {
  background: var(--color-primary-deep);
  border-color: var(--color-primary-deep);
}
.ex-year {
  font-size: 11px;
  letter-spacing: 0.06em;
  font-weight: 600;
  color: var(--color-ink-2);
}
.ex-role {
  font-size: clamp(13px, 1.1vw, 15.5px);
  font-weight: 700;
  margin-top: 6px;
  line-height: 1.45;
  transition: color var(--dur) var(--ease);
}
.ex-card:hover .ex-role {
  color: var(--color-primary-deep);
}
.ex-org {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-2);
  margin-top: 4px;
  line-height: 1.6;
}
.ex-todo {
  color: var(--color-primary-deep);
  border-bottom: 1px dashed var(--color-primary-deep);
}

@media (max-width: 900px) {
  .experience {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .ex-wrap {
    position: static;
    transform: none;
    inset-inline-start: 24px;
    inset-inline-end: 24px;
    padding-block: 48px;
  }
  .ex-rail {
    grid-template-rows: auto auto;
    height: auto;
    gap: 22px;
  }
  .ex-rail::before {
    display: none;
  }
  .ex-track {
    flex-direction: column;
    gap: 16px;
  }
  .ex-top .ex-card,
  .ex-bot .ex-card {
    padding: 0;
    padding-inline-start: 22px;
  }
  .ex-card::before {
    display: none;
  }
  .ex-top .ex-card::after,
  .ex-bot .ex-card::after {
    top: 6px;
    bottom: auto;
  }
}
</style>
