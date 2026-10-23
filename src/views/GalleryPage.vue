<template><section class="container gallery-page"><p class="eyebrow">DIWA-M / НАШІ РОБОТИ</p><h1>Краса <em>в деталях.</em></h1><p class="page-intro">Натхнення з нашого салону. Образи, створені з увагою до вас.</p><div class="full-gallery"><img v-for="(photo, index) in photos" :key="photo" class="reveal" v-reveal="(index % 3) * 90" :src="photo" :alt="`Робота майстрів Diwa-M — фото ${index + 1}`" loading="lazy"></div></section></template>
<script setup>
import p1 from '@/assets/images/galery1.webp';
import p2 from '@/assets/images/galery2.jpg';
import p3 from '@/assets/images/galery3.jpeg';
import p4 from '@/assets/images/galery4.jpeg';
import p5 from '@/assets/images/galery5.jpg';
import p6 from '@/assets/images/galery6.jpeg';
const photos = [p1,p2,p3,p4,p5,p6];
</script>
