<template>
  <section v-if="reviews.length" id="reviews" class="reviews-section" aria-labelledby="reviews-title">
    <div class="container">
      <div class="section-heading reveal" v-reveal>
        <div><p class="eyebrow">04 / ВАШІ ВРАЖЕННЯ</p><h2 id="reviews-title">Найкращі слова —<br><em>від вас.</em></h2></div>
        <p class="section-aside">Відгуки наших клієнтів,<br>якими ділиться команда студії.</p>
      </div>
      <div class="review-grid" id="review-list">
        <article v-for="(review, index) in shownReviews" :key="review.id" class="review-card reveal" v-reveal="(index % 3) * 80">
          <div class="review-rating" role="img" :aria-label="`Оцінка: ${review.rating} з 5`"><span aria-hidden="true">{{ '★'.repeat(review.rating) }}<span class="unfilled-stars">{{ '☆'.repeat(5 - review.rating) }}</span></span></div>
          <blockquote><p>{{ review.text }}</p></blockquote>
          <div class="review-person"><span class="review-initial" aria-hidden="true">{{ review.name.charAt(0) }}</span><div><p>{{ review.name }}</p><span v-if="review.service">{{ review.service }}</span></div></div>
          <a v-if="review.source" :href="review.source" class="review-source" target="_blank" rel="noopener noreferrer">Оригінал відгуку ↗</a>
        </article>
      </div>
      <div class="review-bottom">
        <a class="text-link" href="https://www.instagram.com/diwa_m_/" target="_blank" rel="noopener noreferrer">Поділитися враженнями в Instagram ↗</a>
        <button v-if="reviews.length > 3" class="text-link" :aria-expanded="showAllReviews" aria-controls="review-list" @click="showAllReviews = !showAllReviews">{{ showAllReviews ? 'Показати менше ↑' : `Усі відгуки (${reviews.length}) ↓` }}</button>
      </div>
    </div>
  </section>

  <section v-if="faqs.length" id="questions" class="faq-section container" aria-labelledby="faq-title">
    <div class="faq-intro reveal" v-reveal>
      <p class="eyebrow">05 / ПЕРЕД ВІЗИТОМ</p>
      <h2 id="faq-title">Можливо, ви<br><em>хотіли запитати.</em></h2>
      <p>Кілька відповідей, щоб ваш перший крок до нас був простішим.</p>
      <a class="text-link" href="viber://chat?number=%2B380674247498">Поставити своє запитання ↗</a>
    </div>
    <div class="faq-list">
      <details v-for="(faq, index) in faqs" :key="faq.id" class="faq-item reveal" v-reveal="(index % 3) * 60">
        <summary><span class="faq-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><span>{{ faq.question }}</span><span class="faq-toggle" aria-hidden="true"></span></summary>
        <p>{{ faq.answer }}</p>
      </details>
    </div>
  </section>

  <section class="visit-section" aria-labelledby="visit-title">
    <div class="container visit-layout">
      <div class="visit-copy reveal" v-reveal>
        <p class="eyebrow">06 / ЗУСТРІНЕМОСЬ У DIWA-M</p>
        <h2 id="visit-title">Почнімо з маленького<br><em>часу для себе.</em></h2>
        <p>Оберіть послугу, напишіть або зателефонуйте нам.<br>Разом узгодимо зручний час для вашого візиту.</p>
        <div class="visit-actions"><a class="button-primary" href="tel:+380674247498">Обговорити запис <span>↗</span></a><router-link class="text-link" to="/services">Спочатку переглянути прайс ↗</router-link></div>
        <ol class="visit-steps"><li><span>01</span>Оберіть послугу</li><li><span>02</span>Узгодьте час</li><li><span>03</span>Завітайте до нас</li></ol>
      </div>
      <div class="visit-address reveal" v-reveal="100">
        <span class="address-heart" aria-hidden="true">♡</span>
        <p class="eyebrow">ВАША ТОЧКА КРАСИ</p>
        <h3>Хмельницький</h3>
        <address>вул. Шевченка, 50</address>
        <a class="text-link" :href="mapUrl" target="_blank" rel="noopener noreferrer">Прокласти маршрут ↗</a>
        <p class="address-note">Потрібна підказка, як нас знайти?<br><a href="tel:+380674247498">+38 (067) 424 74 98</a></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { content } from '@/lib/content';
const reviews = computed(() => content.data.reviews || []);
const faqs = computed(() => content.data.faqs || []);
const showAllReviews = ref(false);
const shownReviews = computed(() => showAllReviews.value ? reviews.value : reviews.value.slice(0, 3));
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Хмельницький, вулиця Шевченка, 50')}`;
</script>

<style scoped>
.reviews-section { padding: 80px 0; background: var(--paper); }
.section-aside { font-size: 12px; line-height: 1.9; color: var(--muted); }
.review-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.review-card { display: flex; flex-direction: column; background: var(--bg); padding: 32px; border-top: 2px solid #cbb69e; overflow-wrap: anywhere; }
.review-rating { font-size: 15px; letter-spacing: 4px; color: var(--olive); margin-bottom: 24px; }
.unfilled-stars { opacity: .5; }
blockquote { flex: 1; margin-bottom: 30px; }
blockquote p { font-family: var(--serif); font-size: 27px; line-height: 1.4; white-space: pre-line; }
.review-person { display: flex; gap: 14px; align-items: center; }
.review-initial { flex: 0 0 42px; height: 42px; display: grid; place-items: center; background: var(--paper); border-radius: 50%; font-family: var(--serif); font-size: 24px; color: var(--olive); }
.review-person p { font-size: 13px; font-weight: 600; }
.review-person div > span { display: block; margin-top: 5px; font-size: 10px; color: var(--muted); line-height: 1.6; }
.review-source { font-size: 10px; color: var(--olive); margin-top: 20px; align-self: flex-start; text-decoration: underline; text-underline-offset: 4px; }
.review-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; margin-top: 32px; }
button.text-link { background: transparent; border: 0; border-bottom: 1px solid var(--olive); font-family: inherit; cursor: pointer; color: var(--ink); }
.faq-section { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; padding-top: 100px; padding-bottom: 100px; }
.faq-intro > p:not(.eyebrow) { font-size: 13px; line-height: 1.9; color: var(--muted); margin-top: 24px; max-width: 300px; }
.faq-intro .text-link { margin-top: 30px; }
.faq-list { border-top: 1px solid var(--line); min-width: 0; }
.faq-item { border-bottom: 1px solid var(--line); }
summary { cursor: pointer; display: flex; align-items: center; gap: 20px; padding: 26px 0; list-style: none; font-size: 14px; line-height: 1.7; }
summary::-webkit-details-marker { display: none; }
summary:focus-visible { outline: 2px solid var(--olive); outline-offset: 4px; }
.faq-number { font-size: 10px; color: var(--olive); letter-spacing: 1px; }
.faq-toggle { position: relative; flex: 0 0 22px; height: 22px; margin-left: auto; }
.faq-toggle::before, .faq-toggle::after { content: ''; position: absolute; background: var(--olive); top: 10px; left: 5px; width: 12px; height: 1px; }
.faq-toggle::after { transform: rotate(90deg); transition: transform .25s; }
[open] .faq-toggle::after { transform: rotate(0); }
.faq-item > p { margin: 0 35px 25px; font-size: 13px; color: var(--muted); line-height: 1.95; white-space: pre-line; overflow-wrap: anywhere; }
.visit-section { padding: 75px 0; background: #eae2d8; }
.visit-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 80px; align-items: center; }
.visit-copy > p:not(.eyebrow) { margin-top: 25px; font-size: 13px; color: var(--muted); line-height: 1.9; }
.visit-actions { display: flex; align-items: center; gap: 25px; flex-wrap: wrap; margin-top: 28px; }
.visit-steps { display: flex; gap: 25px; list-style: none; border-top: 1px solid #cfc3b5; margin-top: 35px; padding-top: 22px; }
.visit-steps li { font-size: 10px; line-height: 1.8; }
.visit-steps span { display: block; font-size: 9px; letter-spacing: 1px; color: var(--olive); margin-bottom: 6px; }
.visit-address { text-align: center; border: 1px solid #cfc3b5; border-radius: 48% 48% 0 0; padding: 45px 25px 35px; }
.address-heart { display: block; font-family: var(--serif); font-size: 45px; color: var(--olive); margin-bottom: 20px; }
.visit-address .eyebrow { font-size: 8px; margin-bottom: 18px; }
.visit-address h3 { font-size: 38px; }
address { margin: 10px 0 25px; font-style: normal; font-size: 15px; }
.address-note { margin-top: 30px; font-size: 11px; color: var(--muted); line-height: 1.9; }
.address-note a { color: var(--ink); }
@media(max-width: 1000px) { .review-card { padding: 24px; } .faq-section, .visit-layout { gap: 40px; } blockquote p { font-size: 24px; } }
@media(max-width: 700px) {
  .reviews-section { padding: 55px 0; }
  .review-grid { grid-template-columns: 1fr; gap: 18px; }
  .review-card { padding: 28px; }
  .faq-section { grid-template-columns: 1fr; gap: 35px; padding-top: 60px; padding-bottom: 60px; }
  summary { gap: 14px; padding: 22px 0; }
  .faq-item > p { margin-left: 28px; margin-right: 0; }
  .visit-section { padding: 55px 0; }
  .visit-layout { grid-template-columns: 1fr; gap: 40px; }
  .visit-copy > p br { display: none; }
  .visit-steps { gap: 20px; justify-content: space-between; }
  .visit-address { max-width: 400px; width: 100%; margin: 0 auto; }
}
</style>
