<template>
  <div class="background">
    <div class="container services-intro">
      <p class="eyebrow">DIWA-M / ПОСЛУГИ ТА ЦІНИ</p>
      <h1>Турбота про <em>вас.</em></h1>
      <p>Оберіть свій ритуал краси. Ми подбаємо про деталі.</p>
      <p v-if="content.error" role="status">{{ content.error }}</p>
    </div>
    <section v-for="section in content.data.sections" :key="section.id" :id="priceSectionId(section)">
      <div class="container">
        <div class="title"><h2 class="title-text">{{ section.name }}</h2></div>
        <div class="service-card">
          <div v-for="group in section.groups" :key="group.id" class="service-content reveal" v-reveal>
            <h3 class="description">{{ group.name }}</h3>
            <div v-for="item in group.items" :key="item.id" class="service" :class="{ 'service-divider': item.divider }">
              <p>{{ item.name }}</p><p v-if="item.price">{{ item.price }}</p>
            </div>
            <p v-if="group.note" class="service-note">{{ group.note }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { content } from '@/lib/content';
import { priceSectionId } from '@/lib/navigation.mjs';
</script>
<style scoped lang="scss">
.background { padding: 32px 0 90px; }
.services-intro { padding-top: 30px; padding-bottom: 20px; }
.services-intro h1 { font-size: clamp(58px, 7vw, 90px); }
.services-intro > p:last-child { margin-top: 24px; font-size: 13px; line-height: 1.8; color: var(--muted); }
section { padding: 40px 0; }
.title { display: flex; align-items: center; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid var(--line); }
.title-text { font-family: var(--serif); font-size: clamp(30px, 4vw, 48px); }
.title-icon img { width: 40px; opacity: .65; }
.service-card { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 60px; margin-top: 36px; }
.service-content { padding: 24px; background: var(--paper); }
.description { font-family: var(--serif); font-size: 26px; margin-bottom: 22px; }
.service { display: flex; justify-content: space-between; gap: 20px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 14px; line-height: 1.6; }
.service p:last-child:not(:first-child) { white-space: nowrap; }
.service-note { margin-top: 16px; font-size: 13px; line-height: 1.6; }
.service-divider { margin-top: 18px; border-top: 1px solid var(--olive); }
@media(max-width: 640px) { .service-card { grid-template-columns: 1fr; gap: 20px; } .service-content { padding: 18px; } }
</style>
