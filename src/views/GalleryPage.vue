<template>
  <section class="container gallery-page">
    <p class="eyebrow">DIWA-M / НАШІ РОБОТИ</p>
    <h1>Краса <em>в деталях.</em></h1>
    <p class="page-intro">Натхнення з нашого салону. Образи, створені з увагою до вас.</p>
    <p v-if="content.error" role="status">{{ content.error }}</p>
    <div class="full-gallery">
      <figure v-for="(photo, index) in content.data.photos" :key="photo.id">
        <img class="reveal" v-reveal="(index % 3) * 90" :src="photoUrl(photo)" :alt="photo.title" loading="lazy">
        <figcaption>{{ photo.title }}</figcaption>
      </figure>
    </div>
    <p v-if="!content.data.photos.length">Нові роботи незабаром з’являться тут.</p>
  </section>
</template>
<script setup>
import { content, photoUrl } from '@/lib/content';
</script>
<style scoped>
figcaption { color: var(--muted); font-size: 12px; margin-top: 12px; line-height: 1.6; }
</style>
