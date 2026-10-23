<template>
  <footer class="site-footer" id="contacts">
    <div class="container footer-main">
      <div><router-link class="footer-logo" :to="{ name: 'home' }" aria-label="Diwa-M — головна"><img src="@/assets/images/back.png" alt="Diwa-M — твоя студія краси" width="818" height="283" loading="lazy"></router-link><p class="eyebrow">ЧАС ДЛЯ СЕБЕ</p><h4>Ваша наступна красива історія.</h4><br><a class="text-link" href="tel:+380674247498">+38 (067) 424 74 98</a></div>
      <div class="footer-details"><p class="eyebrow">ЗАВІТАЙТЕ ДО НАС</p><p>Хмельницький, вул. Шевченка, 50</p> <p class="eyebrow">Щоденно з 09:00 по 20:00</p> <div class="social-links"><a class="text-link" href="https://www.instagram.com/diwa_m_/" target="_blank" rel="noopener noreferrer">Instagram</a><a class="text-link" href="viber://chat?number=%2B380674247498">Viber</a></div></div>
    </div>
    <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} Diwa-M</span><span>З турботою про вашу красу.</span><a href="#app">Нагору</a></div>
  </footer>
</template>
