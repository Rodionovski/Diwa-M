<template>
  <div id="app" class="app-layout">
    <MainHeader />
    <main class="main-content">
      <router-view />
    </main>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
