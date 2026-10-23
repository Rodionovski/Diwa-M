<template>
  <section class="hero container">
    <div class="hero-copy reveal" v-reveal><p class="eyebrow"><span class="tiny-star" aria-hidden="true">♡</span> САЛОН КРАСИ · ХМЕЛЬНИЦЬКИЙ</p><h1>Краса бути<br><em>собою.</em></h1><p class="hero-description">Трохи часу для себе. Трохи нашої турботи.<br>І ви — у своєму найкращому настрої.</p><div class="hero-actions"><a class="button-primary" href="tel:+380674247498">Записатися на візит</a><router-link class="text-link" :to="{ name: 'services' }">Послуги та ціни</router-link></div><div class="hero-note"><span class="note-line"></span>Волосся · Нігті · Макіяж · Брови</div></div>
    <div class="hero-visual reveal" v-reveal="140"><img src="@/assets/images/background2.jpg" alt="Атмосфера салону краси Diwa-M" fetchpriority="high"><div class="image-label"><span>DIWA-M BEAUTY SPACE</span><span>ХМЕЛЬНИЦЬКИЙ</span></div><div class="hero-stamp">з любов’ю<br><em>до вас</em><span aria-hidden="true">♡</span></div></div>
    <div class="hero-bottom"><span>КРАСА ПОЧИНАЄТЬСЯ З ВІДЧУТТЯ</span><router-link :to="{ name: 'home', hash: '#services' }">Відкрийте наш простір</router-link></div>
  </section>
  <section class="services-section" id="services"><div class="container"><div class="section-heading reveal" v-reveal><div><p class="eyebrow">01 / НАШІ ПОСЛУГИ</p><h2>Деталі, що роблять<br><em>вас особливою.</em></h2></div><router-link class="text-link" :to="{ name: 'services' }">Усі послуги та ціни</router-link></div><div class="editorial-services"><router-link v-for="(service, index) in services" :key="service.name" :to="serviceDestination(service.sectionId)" class="editorial-card reveal" v-reveal="index * 90"><div class="service-photo"><img :src="service.image" :alt="service.alt" loading="lazy"><span class="service-number">{{ service.number }}</span></div><div class="service-caption"><h3>{{ service.name }}</h3><span>{{ service.description }}</span></div></router-link></div></div></section>
  <section class="about-section container"><div class="about-mark reveal" v-reveal><img src="@/assets/images/back.png" alt="Diwa-M — твоя студія краси" width="818" height="283" loading="lazy"><span class="brand-heart" aria-hidden="true">♡</span><small>КРАСА, СТВОРЕНА З ЛЮБОВ’Ю</small></div><div class="about-copy reveal" v-reveal="120"><p class="eyebrow">02 / ФІЛОСОФІЯ DIWA-M</p><h2>Більше, ніж догляд.<br><em>Відчуття гармонії.</em></h2><p>Ми любимо красу, яка підкреслює вашу індивідуальність. У Diwa-M ми слухаємо, помічаємо деталі й допомагаємо знайти образ, у якому вам комфортно.</p><p>Від нової стрижки до улюбленого відтінку манікюру — тут є місце для маленьких змін і часу тільки для себе.</p><a class="text-link" href="https://www.instagram.com/diwa_m_/" target="_blank" rel="noopener noreferrer">Познайомимось ближче</a></div></section>
  <section class="gallery-section container"><div class="section-heading reveal" v-reveal><div><p class="eyebrow">03 / НАТХНЕННЯ</p><h2>Краса <em>в деталях.</em></h2></div><router-link class="text-link" :to="{ name: 'gallery' }">Більше наших робіт</router-link></div><div class="home-gallery"><div v-for="(photo, index) in photos" :key="photo.id" class="gallery-photo reveal" v-reveal="index * 90"><img :src="photoUrl(photo)" :alt="photo.title" loading="lazy"></div></div><p class="gallery-note">Кожна робота — маленька історія. Наступна може бути вашою.</p></section>
  <HomeExperience />
</template>
<script setup>
import HomeExperience from '@/components/HomeExperience.vue';
import hair from '@/assets/images/galery1.webp';
import nails from '@/assets/images/manicure.jpg';
import makeup from '@/assets/images/makiyazh.jpg';
import { computed } from 'vue';
import { content, photoUrl } from '@/lib/content';
import { serviceDestination } from '@/lib/navigation.mjs';
const services = [
  { sectionId: 'section-0', number: '01', name: 'Мистецтво волосся', description: 'Стрижки · Фарбування · Укладки', image: hair, alt: 'Робота з волоссям у Diwa-M' },
  { sectionId: 'section-2', number: '02', name: 'Доглянуті до кінчиків', description: 'Манікюр · Педикюр · Дизайн', image: nails, alt: 'Манікюр та догляд за нігтями' },
  { sectionId: 'section-1', number: '03', name: 'Ваша природна виразність', description: 'Макіяж · Брови · Вії', image: makeup, alt: 'Професійний макіяж' },
];
const photos = computed(() => content.data.photos.slice(0, 3));
</script>
