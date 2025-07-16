<template>
  <div id="app">
    <VHeader />

    <main>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <ContactsSection />
    </main>

    <VFooter />
  </div>
</template>

<script>
import VHeader from './components/VHeader.vue';
import VFooter from './components/VFooter.vue';
import HomeSection from './components/HomeSection.vue';
import AboutSection from './components/AboutSection.vue';
import ServicesSection from './components/ServicesSection.vue';
import ContactsSection from './components/ContactsSection.vue';

export default {
  name: 'App',
  components: {
    VHeader,
    VFooter,
    HomeSection,
    AboutSection,
    ServicesSection,
    ContactsSection
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #fff8f3;
  color: #333;
  scroll-behavior: smooth;
}
main {
  padding: 20px;
}
</style>
