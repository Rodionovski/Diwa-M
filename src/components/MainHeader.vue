<template>
  <header class="main-header">
    <div class="container">
      <div class="content-header">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/images/back.png" alt="Logo">
          </router-link>
        </div>
        <nav>
          <ul>
            <li>
              <router-link to="/">Головна</router-link>
            </li>
            <li>
              <router-link to="/services">Послуги</router-link>
            </li>
            <li>
              <router-link to="/gallery">Галерея</router-link>
            </li>
            <li>
              <router-link to="/contacts">Контакти</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader'
};
</script>

<style scoped lang="scss">
.main-header {
  background-color: transparent;
  padding: 1rem;
  width: 100%;
  z-index: 1;
}

.logo {
  img {
    max-width: 150px;
    max-height: 100%;
  }

}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav ul {
    display: flex;
    gap: 1rem;
    list-style: none;

  }

  a {
    position: relative;
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 5%;
  }

  a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    background-color: black;
    transition: all 0.3s ease;
    transition-delay: 0.15ms;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
  }

  a:hover::after {
    width: 100%;
    transform: translateX(-50%) scaleX(1);
  }

  a:hover {
    color: black;
  }

  a.router-link-active {
    color: black;
  }
}
</style>
