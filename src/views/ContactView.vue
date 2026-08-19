<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const links = tm('contact.links')

const form = reactive({ name: '', email: '', message: '' })
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
}
</script>

<template>
  <section class="contact">
    <div class="ct-ring" aria-hidden="true"></div>
    <div class="ct-field" aria-hidden="true"></div>
    <div class="ct-wrap">
      <div>
        <h2 class="ct-lead">{{ t('contact.lead') }}</h2>
        <p class="ct-sub">{{ t('contact.sub') }}</p>
        <div class="ct-links">
          <a
            class="ct-link"
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener"
          >
            <div>
              <span>{{ link.label }}</span>
              <b>{{ link.value }}</b>
            </div>
            <i>
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3.6 14.4 14.4 3.6" /><path d="M6.6 3.6h7.8v7.8" />
              </svg>
            </i>
          </a>
        </div>
      </div>

      <form class="ct-form" @submit.prevent="handleSubmit" v-if="!submitted">
        <h3>{{ t('contact.formTitle') }}</h3>
        <div class="ct-field-row">
          <label for="cf-name">{{ t('contact.fields.name') }}</label>
          <input id="cf-name" v-model="form.name" type="text" autocomplete="name" />
        </div>
        <div class="ct-field-row">
          <label for="cf-email">{{ t('contact.fields.email') }}</label>
          <input id="cf-email" v-model="form.email" type="email" autocomplete="email" />
        </div>
        <div class="ct-field-row">
          <label for="cf-message">{{ t('contact.fields.message') }}</label>
          <textarea id="cf-message" v-model="form.message"></textarea>
        </div>
        <button type="submit" class="ct-send">{{ t('contact.send') }}</button>
        <p class="ct-note">{{ t('contact.note') }}</p>
      </form>

      <div class="ct-form ct-form--done" v-else>
        <div class="ct-done">
          <div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3.5 9.5l3.5 3.5 7.5-8" />
            </svg>
          </div>
          <p>{{ t('contact.done') }}</p>
        </div>
      </div>
    </div>
    <div class="ct-foot">{{ t('contact.foot') }}</div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.ct-field {
  position: absolute;
  bottom: -26vh;
  inset-inline-end: -14vw;
  width: min(52vw, 760px);
  height: min(96vh, 880px);
  background: var(--color-primary);
  border-radius: 52% 48% 44% 56% / 48% 54% 46% 52%;
  z-index: 0;
  opacity: 0.9;
}
.ct-ring {
  position: absolute;
  top: -24vh;
  inset-inline-start: -12vw;
  width: min(44vw, 600px);
  aspect-ratio: 1;
  border: 1px solid var(--color-soft);
  border-radius: 50%;
  z-index: 0;
}

.ct-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-start: clamp(96px, 10vw, 180px);
  inset-inline-end: clamp(96px, 10vw, 180px);
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
  gap: clamp(40px, 6vw, 90px);
  align-items: center;
}
.ct-lead {
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.015em;
  max-width: 14ch;
}
.ct-sub {
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-ink-2);
  margin-top: 16px;
  max-width: 38ch;
}
.ct-links {
  margin-top: clamp(24px, 3.4vh, 38px);
}
.ct-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 0;
  border-top: 1px solid var(--color-soft);
  text-decoration: none;
  color: var(--color-ink);
  transition: padding-inline-start var(--dur) var(--ease);
}
.ct-link:last-child {
  border-bottom: 1px solid var(--color-soft);
}
.ct-link:hover {
  padding-inline-start: 8px;
}
.ct-link b {
  font-size: 15px;
  font-weight: 600;
}
.ct-link span {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-ink-2);
  display: block;
  margin-bottom: 3px;
}
.ct-link i {
  color: var(--color-primary-deep);
  display: grid;
  place-items: center;
}

.ct-form {
  background: var(--color-bg);
  border: 1px solid var(--color-soft);
  border-radius: 16px;
  padding: clamp(22px, 3vh, 32px);
}
.ct-form h3 {
  font-size: 16px;
  font-weight: 700;
}
.ct-field-row {
  margin-top: 18px;
}
.ct-field-row label {
  display: block;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  font-weight: 600;
  color: var(--color-ink-2);
}
.ct-field-row input,
.ct-field-row textarea {
  width: 100%;
  font: inherit;
  font-size: 14.5px;
  color: var(--color-ink);
  background: none;
  border: 0;
  border-bottom: 1px solid var(--color-soft);
  padding: 9px 0;
  margin-top: 4px;
  transition: border-color var(--dur) var(--ease);
}
.ct-field-row textarea {
  resize: none;
  height: 62px;
}
.ct-field-row input:focus,
.ct-field-row textarea:focus {
  outline: 0;
  border-color: var(--color-primary-deep);
}
.ct-send {
  width: 100%;
  margin-top: 26px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 13px;
  border-radius: 8px;
  border: 1.5px solid var(--color-primary-deep);
  background: var(--color-primary-deep);
  color: #fff;
  cursor: pointer;
  transition: background var(--dur) var(--ease);
}
.ct-send:hover {
  background: var(--color-ink);
  border-color: var(--color-ink);
}
.ct-note {
  font-size: 11.5px;
  color: var(--color-ink-2);
  margin-top: 12px;
  text-align: center;
}
.ct-done {
  display: grid;
  place-items: center;
  gap: 12px;
  padding: 34px 0;
  text-align: center;
}
.ct-done div {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--color-primary-deep);
  color: #fff;
  display: grid;
  place-items: center;
}
.ct-done p {
  font-size: 15px;
  font-weight: 600;
}
.ct-foot {
  position: absolute;
  bottom: 30px;
  inset-inline-start: clamp(96px, 10vw, 180px);
  z-index: 2;
  font-size: 11.5px;
  color: var(--color-ink-2);
}

@media (max-width: 900px) {
  /* Links + form stacked exceed 100dvh on short phones — without scrolling, the
     submit button itself fell below the fold and the form could not be sent. */
  .contact {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .ct-wrap {
    position: static;
    transform: none;
    inset: auto;
    grid-template-columns: 1fr;
    gap: 26px;
    padding-inline: var(--gutter-mobile);
    padding-block: var(--pad-block-mobile) var(--dock-clearance);
  }
  .ct-field {
    width: 90vw;
    inset-inline-end: -30vw;
  }
  .ct-ring,
  .ct-foot {
    display: none;
  }
}
</style>

<style>
/* Unscoped: see HeroView.vue for why :global() + Tailwind's Lightning CSS pipeline can't be trusted here. */
[dir='rtl'] .ct-link i svg {
  transform: scaleX(-1);
}
</style>
