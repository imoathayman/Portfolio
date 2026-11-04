# 🛠️ خطة الإصلاح وقائمة المهام (Remediation Plan & To-Do Tracker)

**المشروع:** Moath Ayman Portfolio  
**الوثيقة المرجعية للتدقيق:** [`QA-REPORT.md`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/QA-REPORT.md)  
**آخر تحديث:** 3 نوفمبر 2026 (تم تنفيذ وإنجاز المراحل 1 و 2 و 3 ومعظم 4 بنجاح ✅)  

---

## 📌 تعليمات الاستخدام
- البنود التي تم إنجازها والتحقق منها بنجاح تحمل علامة `[x]`.
- البنود المتبقية تتطلب مدخلات خارجية من المستخدم (مثل لقطات الشاشة أو مفتاح API للباك-اند) وتحمل علامة `[ ]`.

---

## ✅ الأساسات المنجزة والمحققة (Completed Baseline)
- [x] هندسة القرص الدوار مع الدوران المعاكس للكبائن (`AppWheel.vue`).
- [x] منع سكرول الصفحة الافتراضي والاعتماد على وحدات `100dvh`.
- [x] تطبيق الخصائص المنطقية (CSS Logical Properties) لدعم العربية والإنجليزية دون انعكاس خاطئ.
- [x] تطبيق `:inert` و `:aria-hidden` على الأقسام غير المعروضة.
- [x] دعم وضع تقليل الحركة `prefers-reduced-motion` بنقلة ناعمة (Crossfade).
- [x] قواعد التباين اللوني المعتمدة (عدم استخدام نص أبيض فوق `--color-primary`).
- [x] التمرير الداخلي في الموبايل لأقسام المحتوى المتراكم (About, Skills, Experience, Contact).
- [x] التنقل بالروابط العميقة (Deep Linking) لكل قسم بمسار مستقل في Vue Router.

---

## 🚨 المرحلة 1: الإصلاحات الحرجة للجاهزية (P0 - High Priority) — [مكتملة بالكامل 100% ✅]
- [x] **إصلاح المسار الأساسي للراوتر (Router Base URL):**  
  تم تمرير `import.meta.env.BASE_URL` إلى `createWebHistory` في [`src/router/index.js`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/router/index.js) ليعمل مع مسار `/Portfolio/` بدون 404.
- [x] **معالجة Deep Linking على GitHub Pages:**  
  تم إنشاء [`public/404.html`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/public/404.html) وسكربت فك التوجيه في [`index.html`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/index.html).
- [x] **إضافة مسار Catch-All:**  
  تمت إضافة `/:pathMatch(.*)*` في الراوتر لإعادة توجيه أي رابط خاطئ إلى الصفحة الرئيسية.
- [x] **حماية حقول الإدخال من اختطاف الكيبورد:**  
  تم استثناء وسوم `INPUT`, `TEXTAREA`, `SELECT` من مستمع الأسهم في [`src/App.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/App.vue).
- [x] **إضافة التحقق لنموذج التواصل (Contact Validation):**  
  تمت إضافة سمات `required` ونوع البريد `type="email"` والحدود الدنيا للأحرف في [`src/views/ContactView.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/views/ContactView.vue).
- [x] **إضافة زر إعادة الإرسال:**  
  تمت إضافة زر تفاعلي "إرسال رسالة أخرى" لإعادة إظهار النموذج وتفريغ الحقول بنجاح.
- [x] **الالتزام بالقواعد (No Left/Right in CSS):**  
  تم استبدال `left: 50%` في [`src/components/AppWheel.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/components/AppWheel.vue#L58) بـ `inset-inline-start: 50%`.

---

## 🎨 المرحلة 2: الهوية البصرية وإمكانية الوصول (P1 - Medium Priority) — [مكتملة بالكامل 100% ✅]
- [x] **استبدال Favicon البنفسجي:**  
  تم استبدال صاعقة Vite في [`public/favicon.svg`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/public/favicon.svg) برسمة المونوغرام (M+A) بلون الهوية المعتمد `#2C6E9E`.
- [x] **تصحيح تسمية الـ Dock لقارئات الشاشة:**  
  تم تحديث `aria-label` في [`src/components/AppChrome.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/components/AppChrome.vue) إلى `t('nav.title')` ("أقسام الموقع" / "Site sections").
- [x] **رفع تباين زر تبديل اللغة:**  
  تم رفع شفافية الزر غير النشط إلى `opacity: 0.72` لتحقيق تباين WCAG AA.
- [x] **معايير إمكانية الوصول لنافذة المشاريع (Modal A11y):**  
  تمت إضافة `role="dialog"` و `aria-modal="true"` و `aria-labelledby` ونقل التركيز لزر الإغلاق عند الفتح في [`src/views/ProjectsView.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/views/ProjectsView.vue).
- [x] **ضبط توقيت الآلة الكاتبة بالعربي:**  
  تم تعديل سرعة الكلمات في العربية إلى `360ms` والمسح إلى `120ms` في [`src/views/HeroView.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/views/HeroView.vue) لتحقيق إيقاع طبيعي متوازن مع الإنجليزية.
- [x] **عزل BiDi لمسميات الوظائف:**  
  تمت إحاطة نص المسميات بـ `<bdi>` لمنع قفز المؤشر المومض بعد كلمة `full-stack`.
- [x] **إضافة رابط التخطي (Skip to Content):**  
  تمت إضافة رابط تخطي مخفي وسريع يظهر عند التركيز بالكيبورد في [`src/App.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/App.vue) وتنسيقه بـ `style.css`.

---

## 📱 المرحلة 3: تجربة الموبايل وضغط الأصول (P2 - Optimization) — [مكتملة بالكامل 100% ✅]
- [x] **ضغط صورة الهيرو إلى WebP:**  
  تم تحويل `src/assets/moath.png` (1.9MB) إلى `src/assets/moath.webp` بحجم **102KB** فقط (**توفير 94.6% من الحجم!**).
- [x] **ضغط صورة الشعار إلى WebP:**  
  تم تحويل `src/assets/logo.png` (389KB) إلى `src/assets/logo.webp` بحجم **24KB** فقط (**توفير 93.7% من الحجم!**).
- [x] **منع تداخل صورة الهيرو في الموبايل:**  
  تم ضبط `top: 22%` للمحتوى و `height: 40vh; max-height: 380px; pointer-events: none;` للصورة في [`src/views/HeroView.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/views/HeroView.vue).
- [x] **إصلاح تداخل الشريط العلوي مع العناوين (Top Header Collision):**  
  تم إنشاء شريط علوي زجاجي شبه شفاف (`chrome-header`) بارتفاع 60px يجمع اللوجو ومبدل اللغة، وزيادة `pad-block-mobile` إلى 84px لتبدأ العناوين تحته بدون أي تداخل، مع اختفاء المحتوى تحته بنعومة أثناء السكرول.
- [x] **إصلاح حقل الأزرق العملاق في قسم التواصل (`.ct-field` Overlap):**  
  تم جعل `.ct-wrap` في الموبايل `position: relative; z-index: 2;`، وتقليص أبعاد الحقل الأزرق وخفض شفافيته لـ 0.22 ليعمل كلمسة خلفية هادئة ولا يحجب الروابط أو الفورم نهائياً.
- [x] **إصلاح وسم القسم النشط في الـ Dock (`.dock-active-label` Overlap):**  
  تم تحويل اسم القسم العائم إلى شارة (Pill Badge) زجاجية بحدود وخلفية واضحة، وزيادة `dock-clearance` إلى 124px لمنع التصاق أو تداخل النصوص أسفل الشاشة.
- [x] **دعم إيماءات اللمس والسحب (Touch Swipe Navigation):**  
  تمت إضافة مستمعي `touchstart` و `touchend` على حاوية الشاشة مع مراعاة السكرول الداخلي والنموذج.
- [x] **سكرول تفاصيل المشروع في الموبايل:**  
  تمت إضافة `overflow-y: auto` و `bottom: var(--dock-clearance)` لكتلة معلومات المشروع لمنع قص المحتوى على الشاشات القصيرة.
- [x] **تفاعلية `prefers-reduced-motion`:**  
  تمت إضافة مستمع `change` في [`src/composables/useSections.js`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/composables/useSections.js) للتحديث اللحظي مع إعدادات نظام التشغيل.

---

## 🚀 المرحلة 4: المحتوى الحقيقي والربط النهائي (P3 - Polish & Launch)
- [x] **تصحيح نصوص المسودات:**  
  تم استبدال `"حدّد التاريخ"` و `"ADD DATE"` بالتاريخ الحقيقي `"سبتمبر ٢٠٢٤"` / `"Sep 2024"` في ملفات الترجمة.
- [x] **معالجة روابط الديمو غير الفعالة:**  
  تم استبدال روابط `#` الوهمية بشارة حالة أنيقة ("● قيد التطوير النشط" / "● In active development") في [`src/views/ProjectsView.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/views/ProjectsView.vue).
- [x] **إضافة وسوم Open Graph و Twitter Cards:**  
  تم تضمين وسوم المعاينة الاجتماعية في `<head>` بملف [`index.html`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/index.html).
- [ ] **لقطات شاشة حقيقية للمشاريع:**  
  استبدال الـ Wireframes الوهمية في [`src/components/ProjectWindowPlaceholder.vue`](file:///c:/Users/Moath/Desktop/Projects/moath-portfolio/src/components/ProjectWindowPlaceholder.vue) بلقطات شاشة حقيقية بمجرد توفرها لديك.
- [ ] **ربط باك-اند نموذج التواصل:**  
  وضع رابط الـ Endpoint الخاص بك (مثل Formspree endpoint) داخل دالة `handleSubmit`.
