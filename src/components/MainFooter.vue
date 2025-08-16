<template>
  <footer class="main-footer">
    <section id="contacts" class="section">
      <div>
        <a href="tel:+380674247498" class="call-button">
          <img src="@/assets/images/phone.svg" alt="icon">
          Подзвонити
        </a>
        <a href="https://www.instagram.com/diwa_m_/" target="_blank" class="instagram-button">
          <img src="@/assets/images/instagram.svg" alt="icon">
          Instagram
        </a>
        <a href="viber://chat?number=%2B380674247498" target="_blank" rel="noopener noreferrer" class="viber-button">
          <img src="@/assets/images/viber.svg" alt="Viber Icon"/>
          Viber
        </a>
      </div>
    </section>
    <p>© 2025 Diwa-M. Усі права захищено. м. Хмельницький, вул. Шевченка 50</p>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
};
</script>

<style scoped lang="scss">
.main-footer {
  background-color: #8b7858;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: black;
}

#contacts {
  width: 100%;
  background-color: #8b7858;
  padding: 15px 0;
  margin-bottom: 0;

  .call-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    margin-bottom: 15px;
    background-color: tan;
    color: black;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .call-button:hover {
    transform: scale(1.05);
  }

  .call-button:active {
    transform: scale(0.98);
  }

  .instagram-button {
    margin-left: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    background-color: tan;
    color: black;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  img {
    width: 30px;
    height: auto;
    margin-right: 5px;
  }

  .instagram-button:hover {
    transform: scale(1.05);
  }

  .instagram-button:active {
    transform: scale(0.98);
  }

  .viber-button {
    margin-left: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    background-color: tan;
    color: black;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  img {
    width: 30px;
    height: auto;
    margin-right: 5px;
  }

  .viber-button:hover {
    transform: scale(1.05);
  }

  .viber-button:active {
    transform: scale(0.98);
  }
}
</style>
