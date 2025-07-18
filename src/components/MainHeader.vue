<template>
  <header class="main-header">
    <nav>
      <ul>
        <li><router-link to="/">Головна</router-link></li>
        <li><router-link to="/services">Послуги</router-link></li>
        <li><router-link to="/gallery">Галерея</router-link></li>
        <li><router-link to="/employees">Команда</router-link></li>
        <li><router-link to="/contacts">Контакти</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader'
};
</script>

<style scoped lang="scss">
.main-header {
  background-color: #fff;
  padding: 1rem;

  nav ul {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
}
</style>
