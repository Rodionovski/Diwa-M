<template>
  <header class="site-header" @focusout="onFocusOut">
    <div class="container header-inner">
      <router-link class="wordmark" :to="{ name: 'home' }" aria-label="Diwa-M — головна" @click="closeMenu()">
        <img src="@/assets/images/back.png" alt="Diwa-M — твоя студія краси" width="818" height="283">
      </router-link>
      <button
        ref="toggle"
        class="menu-toggle"
        type="button"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
        :aria-label="menuOpen ? 'Закрити меню' : 'Відкрити меню'"
        @click="menuOpen = !menuOpen"
      ><span></span><span></span><span></span></button>
      <nav id="main-navigation" class="main-nav" :class="{ 'mobile-open': menuOpen }" aria-label="Основна навігація">
        <router-link :to="{ name: 'home' }" @click="closeMenu(true)">Головна</router-link>
        <router-link :to="{ name: 'services' }" @click="closeMenu(true)">Послуги та ціни</router-link>
        <router-link :to="{ name: 'gallery' }" @click="closeMenu(true)">Наші роботи</router-link>
        <router-link :to="{ name: 'offers' }" @click="closeMenu(true)">Сертифікати та навчання</router-link>
      </nav>
      <a class="header-book" href="tel:+380674247498" @click="closeMenu()">Записатися</a>
    </div>
    <button v-if="menuOpen" class="menu-backdrop" type="button" tabindex="-1" aria-label="Закрити меню" @click="closeMenu(true)"></button>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
const menuOpen = ref(false);
const toggle = ref(null);
const route = useRoute();
let mobile;
function closeMenu(restoreFocus = false) {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  if (restoreFocus) toggle.value?.focus();
}
function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault();
    closeMenu(true);
  }
}
function onResize(event) { if (!event.matches) closeMenu(); }
function onFocusOut(event) {
  if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
}
watch(() => route.fullPath, () => closeMenu());
onMounted(() => {
  mobile = window.matchMedia('(max-width: 900px)');
  mobile.addEventListener('change', onResize);
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  mobile?.removeEventListener('change', onResize);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.site-header { position: relative; z-index: 20; }
.header-inner { position: relative; z-index: 2; }
.menu-toggle, .menu-backdrop { display: none; }
@media(max-width: 900px) {
  .site-header .header-inner { min-height: 88px; display: flex; flex-wrap: nowrap; gap: 16px; padding-top: 16px; padding-bottom: 16px; }
  .site-header .wordmark { width: 145px; margin-right: auto; }
  .menu-toggle { display: flex; order: 3; flex: 0 0 44px; height: 44px; position: relative; align-items: center; justify-content: center; background: transparent; border: 1px solid #857363; color: var(--bg); cursor: pointer; }
  .menu-toggle span { position: absolute; width: 19px; height: 1px; background: currentColor; transition: transform 250ms ease, opacity 200ms ease; }
  .menu-toggle span:first-child { transform: translateY(-6px); }
  .menu-toggle span:last-child { transform: translateY(6px); }
  .menu-toggle.is-open span:first-child { transform: rotate(45deg); }
  .menu-toggle.is-open span:nth-child(2) { opacity: 0; }
  .menu-toggle.is-open span:last-child { transform: rotate(-45deg); }
  .site-header .header-book { order: 2; margin-left: 0; padding: 13px 16px; white-space: nowrap; font-size: 11px; }
  .site-header .header-inner .main-nav { display: none; position: absolute; top: 100%; left: 0; right: 0; width: auto; background: var(--graphite); border: 1px solid #51483f; box-shadow: 0 20px 40px #00000025; padding: 14px 24px; max-height: calc(100dvh - 110px); overflow-y: auto; }
  .site-header .header-inner .main-nav.mobile-open { display: flex; flex-direction: column; align-items: stretch; gap: 0; animation: menu-appear 230ms ease both; }
  .main-nav a { display: block; padding: 19px 0; font-size: 15px; line-height: 1.6; }
  .main-nav a + a { border-top: 1px solid #51483f; }
  .menu-backdrop { display: block; position: fixed; inset: 0; z-index: 1; background: #16141166; border: 0; cursor: default; animation: backdrop-appear 200ms ease both; }
}
@media(max-width: 380px) {
  .site-header .wordmark { width: 120px; }
  .site-header .header-inner { gap: 10px; }
  .site-header .header-book { padding: 13px 10px; }
}
@keyframes menu-appear { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes backdrop-appear { from { opacity: 0; } to { opacity: 1; } }
@media(prefers-reduced-motion: reduce) {
  .menu-toggle span { transition: none; }
  .main-nav.mobile-open, .menu-backdrop { animation: none; }
}
</style>
