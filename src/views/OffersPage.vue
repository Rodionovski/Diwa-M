<template>
  <div class="offers-page">
    <header class="container offers-intro">
      <p class="eyebrow">DIWA-M / БІЛЬШЕ МОЖЛИВОСТЕЙ ДЛЯ ВАС</p>
      <h1>Дарувати емоції.<br><em>Відкривати себе.</em></h1>
      <p>Особливий подарунок близькій людині або нова навичка для себе — оберіть свою маленьку історію краси.</p>
      <p v-if="content.error" role="status">{{ content.error }}</p>
    </header>

    <section v-if="offers.certificate.visible" id="certificate" class="certificate-section" aria-labelledby="certificate-title">
      <div class="container offer-layout">
        <figure class="offer-image certificate-image reveal" v-reveal><img :src="photoUrl(offers.certificate.image)" :alt="offers.certificate.image.title" loading="lazy"><figcaption v-if="offers.certificate.isExample">Ілюстрація подарункового сертифіката</figcaption></figure>
        <div class="offer-copy reveal" v-reveal="100">
          <p class="eyebrow">{{ offers.certificate.eyebrow }}</p><h2 id="certificate-title">{{ offers.certificate.title }}</h2>
          <p class="offer-description">{{ offers.certificate.description }}</p>
          <ul class="offer-benefits"><li v-for="(benefit, index) in offers.certificate.benefits" :key="index">{{ benefit }}</li></ul>
          <div class="offer-price"><span>ВАРТІСТЬ</span><strong>{{ offers.certificate.price }}</strong></div>
          <p v-if="offers.certificate.isExample" class="example-note">Приклад пропозиції. Вартість і умови уточнюйте у студії перед придбанням.</p>
          <a class="button-primary" :href="offers.certificate.buttonUrl" v-bind="linkAttributes(offers.certificate.buttonUrl)">{{ offers.certificate.buttonText }}</a>
          <p class="offer-contact-note">Кнопка відкриє канал зв’язку зі студією для оформлення замовлення.</p>
        </div>
      </div>
    </section>

    <section v-if="offers.course.visible" id="course" class="course-section" aria-labelledby="course-title">
      <div class="container offer-layout course-layout">
        <div class="offer-copy reveal" v-reveal>
          <p class="eyebrow">{{ offers.course.eyebrow }}</p><h2 id="course-title">{{ offers.course.title }}</h2>
          <p class="offer-description">{{ offers.course.description }}</p>
          <p v-if="offers.course.benefits.length" class="course-results-label">ПІСЛЯ ЗАНЯТТЯ — З ВАМИ</p>
          <ol class="course-results"><li v-for="(benefit, index) in offers.course.benefits" :key="index"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ benefit }}</li></ol>
          <div class="course-facts"><div class="offer-price"><span>ТРИВАЛІСТЬ</span><strong>{{ offers.course.duration }}</strong></div><div class="offer-price"><span>ВАРТІСТЬ</span><strong>{{ offers.course.price }}</strong></div></div>
          <p v-if="offers.course.isExample" class="example-note">Приклад програми. Вартість, тривалість і зміст заняття уточнюйте під час запису.</p>
          <a class="button-primary" :href="offers.course.buttonUrl" v-bind="linkAttributes(offers.course.buttonUrl)">{{ offers.course.buttonText }}</a>
        </div>
        <figure class="offer-image course-image reveal" v-reveal="100"><img :src="photoUrl(offers.course.image)" :alt="offers.course.image.title" loading="lazy"><figcaption>{{ offers.course.image.title }}</figcaption></figure>
      </div>
    </section>
    <p v-if="!offers.certificate.visible && !offers.course.visible" class="container offers-empty">Готуємо нові пропозиції. Напишіть нам в Instagram, щоб дізнатися більше.</p>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { content, photoUrl } from '@/lib/content';
const offers = computed(() => content.data.offers);
const linkAttributes = (url) => url.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
</script>
<style scoped>
.offers-intro { padding-top: 65px; padding-bottom: 55px; }
h1 { font-size: clamp(58px, 7vw, 96px); }
.offers-intro > p:not(.eyebrow) { max-width: 540px; margin-top: 28px; color: var(--muted); font-size: 14px; line-height: 1.9; }
.offer-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
.certificate-section { background: var(--paper); padding: 75px 0; }
.offer-image { min-width: 0; }
.offer-image img { width: 100%; object-fit: cover; }
.certificate-image img { aspect-ratio: 1.5; object-fit: contain; background: var(--bg); }
.offer-image figcaption { font-size: 10px; color: var(--muted); margin-top: 15px; line-height: 1.8; }
.offer-copy h2 { font-size: clamp(40px, 4.5vw, 62px); }
.offer-description { margin-top: 24px; font-size: 14px; line-height: 1.95; color: var(--muted); white-space: pre-line; }
.offer-benefits { list-style: none; margin: 25px 0; }
.offer-benefits li { font-size: 12px; line-height: 1.8; padding: 12px 0 12px 20px; border-bottom: 1px solid var(--line); position: relative; }
.offer-benefits li::before { content: ''; position: absolute; left: 0; top: 21px; width: 5px; height: 5px; border: 1px solid var(--olive); border-radius: 50%; }
.offer-price { margin: 24px 0; }
.offer-price > span, .course-results-label { display: block; font-size: 9px; letter-spacing: 1.6px; margin-bottom: 10px; }
.offer-price strong { display: block; font-family: var(--serif); font-size: 38px; font-weight: 400; }
.example-note { border-left: 2px solid #aa9275; padding-left: 12px; font-size: 11px; line-height: 1.8; color: var(--muted); margin: 20px 0; }
.offer-contact-note { font-size: 10px; color: var(--muted); line-height: 1.8; margin-top: 14px; max-width: 300px; }
.course-section { padding: 90px 0; background: var(--graphite); color: var(--bg); }
.course-section .eyebrow, .course-section .offer-description, .course-section .example-note, .course-section figcaption { color: #d2c1ad; }
.course-section .button-primary { background: #e7d4be; color: var(--graphite); }
.course-image img { aspect-ratio: .8; border-radius: 220px 220px 0 0; }
.course-results-label { margin-top: 30px; color: #d2c1ad; }
.course-results { list-style: none; }
.course-results li { display: flex; align-items: baseline; gap: 20px; padding: 14px 0; border-bottom: 1px solid #51483f; font-size: 13px; line-height: 1.8; }
.course-results li span { font-size: 10px; color: #c6ab8d; }
.course-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.offers-empty { padding-bottom: 70px; line-height: 1.9; }
@media(max-width: 1000px) { .offer-layout { gap: 35px; } }
@media(max-width: 700px) { .offers-intro { padding-top: 40px; padding-bottom: 40px; } .offer-layout { grid-template-columns: 1fr; gap: 35px; } .certificate-section, .course-section { padding: 50px 0; } .course-image { grid-row: 1; } .course-image img { max-height: 440px; } .offer-price strong { font-size: 32px; } }
</style>
