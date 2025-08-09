<template>
  <div class="background-color-hero">
    <section class="container">
      <img class="hero-title" src="@/assets/images/back.png" alt="Logo">
      <p class="hero-description">Твоя краса — наша турбота.</p>
    </section>
  </div>

  <section id="about" class="section">
    <div class="container">
      <div class="title-text">Трішки про нас</div>
      <div class="about-content">
        <img class="about-title" src="@/assets/images/background2.jpg" alt="Logo">
        <div class="about-text">
          Ласкаво просимо до нашого салону краси — місця, де кожен клієнт стає частиною великої сім’ї, а краса розквітає
          в унікальному стилі. Ми з любов’ю та відповідальністю працюємо над тим, щоб дарувати вам не просто
          послуги, а справжні емоції та впевненість у собі.
          Наш колектив — це команда справжніх професіоналів, які постійно вдосконалюють свої навички, слідкують за
          сучасними трендами та використовують тільки найкращі матеріали. Ми розуміємо, наскільки важливо відчувати себе
          комфортно
          і доглянуто, тому створюємо затишну атмосферу, де ви можете розслабитися і насолодитися процесом перетворення.
          У нашому салоні кожен клієнт — це особлива історія, яку ми допомагаємо розповісти через стиль, красу та
          індивідуальний підхід. Ми не просто виконуємо процедури — ми створюємо ваш ідеальний образ, який підкреслить
          вашу унікальність і додасть впевненості у будь-якій ситуації.
          Якщо ви шукаєте місце, де вас почують, зрозуміють і подбають про вас на найвищому рівні — ви знайшли саме
          його.
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="section">
    <div class="container">
      <div class="title-text">Наші послуги</div>
      <div class="service-list">
        <div class="service-item">
          <span class="service-icon">
            <img src="@/assets/images/icon1.png" alt="icon">️</span>
          <h3>Стрижки</h3>
          <p>Модні та класичні стрижки з індивідуальним підходом.</p>
        </div>
        <div class="service-item">
          <span class="service-icon">
            <img src="@/assets/images/icon2.png" alt="icon">️</span>
          <h3>Манікюр</h3>
          <p>Дизайни на будь-який смак, гігієна та акуратність — гарантія!</p>
        </div>
        <div class="service-item">
          <span class="service-icon">
            <img src="@/assets/images/icon3.png" alt="icon">️</span>
          <h3>Візаж</h3>
          <p>Професійний макіяж для фотосесій, свят та подій.</p>
        </div>
      </div>
      <div class="btn">
        <button class="button" @click="$router.push('/services')">
          <span class="bottom"></span>
          <span class="left"></span>
          <span class="right"></span>
          <slot/>
          Дізнатись більше
        </button>
      </div>
    </div>
  </section>

  <section id="gallery" class="section">
    <div class="container">
      <div class="title-text">Галерея</div>
      <div class="contact-text">Натхнення прямо з нашого салону — роботи наших майстрів 💖</div>
      <div class="content-gallery">
        <img src="@/assets/images/galery1.webp" alt="icon">️
        <img src="@/assets/images/galery2.jpg" alt="icon">️
        <img src="@/assets/images/galery3.jpeg" alt="icon">️
        <img src="@/assets/images/galery4.jpeg" alt="icon">️
        <img src="@/assets/images/galery5.jpg" alt="icon">️
        <img src="@/assets/images/galery6.jpeg" alt="icon">️
      </div>
      <div class="btn">
        <button class="button" @click="$router.push('/gallery')">
          <span class="bottom"></span>
          <span class="left"></span>
          <span class="right"></span>
          <slot/>
          Дізнатись більше
        </button>
      </div>
    </div>
  </section>

  <section id="contacts" class="section">
    <div class="title-text">Контакти</div>
    <div class="contact-text">Зв'яжіться з нами для запису або консультації.</div>
    <div>
      <a href="tel:+380674247498" class="call-button">
        <img src="@/assets/images/phone.svg" alt="icon">
        Подзвонити
      </a>
      <a href="https://www.instagram.com/diwa_m_/" target="_blank" class="instagram-button">
        <img src="@/assets/images/instagram.svg" alt="icon">
        Instagram
      </a>
    </div>
    <div class="btn">
      <button class="button" @click="$router.push('/contacts')">
        <span class="bottom"></span>
        <span class="left"></span>
        <span class="right"></span>
        <slot/>
        Контактна інформація
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({behavior: "smooth"});
      }
    },
  },
};
</script>

<style scoped>
.background-color-hero {
  background: url('@/assets/images/background.jpg') no-repeat center top;
  background-size: cover;
  padding: 20px 0;
  position: relative;
  top: -100px;
  border-bottom: 5px solid #5d492b;

  .hero-title {
    width: 100%;
    height: 100%;
    margin-top: 7%;
  }

  .hero-description {
    font-size: 2.5rem;
    margin-bottom: 55px;
    width: 100%;
    color: #000000;
    text-align: center;
  }
}

#about {
  background-color: #8b7858;
  border-bottom: 5px solid #5d492b;

  .title-text {
    font-size: 4rem;
    margin-top: -10%;
    padding-top: 20px;
    color: black;
  }

  .about-content {
    width: 100%;
    height: 65vh;
    padding: 30px 0;

    .about-title {
      float: left;
      width: 40%;
      height: auto;
      padding-right: 10px;
    }

    .about-text {
      font-size: 1.3rem;
      width: 100%;
      height: 100%;
      color: black;
    }
  }
}

#services {
  width: 100%;
  background-color: #8b7858;
  border-bottom: 5px solid #5d492b;
  padding-bottom: 30px;
  margin-bottom: 0;

  .title-text {
    font-size: 4rem;
    padding-top: 20px;
    color: black;
  }

  .service-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;

    & > * {
      flex: 1 1 220px;
    }

    .service-item {
      background-color: tan;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      text-align: center;
      transition: transform 0.2s ease;
    }

    .service-item:hover {
      transform: translateY(-5px);
    }

    .service-icon {
      img {
        margin-bottom: 10px;
        max-width: 100px;
        max-height: 100px;
      }
    }

    .service-item h3 {
      font-size: 1.3rem;
      margin-bottom: 8px;
      color: black;
    }

    .service-item p {
      font-size: 1rem;
      line-height: 1.4;
      color: black;
    }
  }
}

#gallery {
  width: 100%;
  background-color: #8b7858;
  border-bottom: 5px solid #5d492b;
  padding-bottom: 30px;
  margin-bottom: 0;

  .title-text {
    font-size: 4rem;
    padding-top: 20px;
    color: black;
  }

  .contact-text {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: black;
  }

  .content-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;

    & > * {
      flex: 1 1;
    }
  }

  img {
    width:  30%;
    height: auto;
    margin-bottom: 20px;
  }
}

#contacts {
  width: 100%;
  background-color: #8b7858;
  border-bottom: 5px solid #5d492b;
  padding: 15px 0;
  margin-bottom: 0;

  .title-text {
    font-size: 3rem;
    margin-bottom: 15px;
    color: black;
  }

  .contact-text {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: black;
  }

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
}

.btn {
  .button {
    position: relative;
    padding: 15px 40px;
    background: transparent;
    color: black;
    font-size: 21px;
    cursor: pointer;
    border: none;
    outline: none;
    overflow: hidden;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 30%;
    background: tan;
    transition: all 0.4s ease;
  }

  .button span.left {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 70%;
    background: tan;
    transition: all 0.4s ease;
  }

  .button span.right {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 2px;
    height: 70%;
    background: tan;
    transition: all 0.4s ease;
  }

  .button span.bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2px;
    width: 30%;
    background: tan;
    transition: all 0.4s ease;
  }

  .button:hover::before {
    width: 100%;
  }

  .button:hover span.bottom {
    width: 100%;
  }

  .button:hover span.left,
  .button:hover span.right {
    height: 100%;
  }
}

.section {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>
