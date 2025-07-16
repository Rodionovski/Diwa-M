<template>
  <header class="header">
    <div class="logo">Diwa-M</div>
    <nav class="nav">
      <a href="#home">Головна</a>
      <a href="#about">Про нас</a>
      <a href="#services">Послуги</a>
      <a href="#contacts">Контакти</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffe0e9;
  padding: 15px 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.logo {
  font-weight: bold;
  font-size: 24px;
  color: #c2185b;
}
.nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #c2185b;
  font-weight: 500;
}
.nav a:hover {
  text-decoration: underline;
}
</style>
