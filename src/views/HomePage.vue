<template>
  <div class="background-color">
    <section class="container">
      <img class="hero-title" src="@/assets/images/back.png" alt="Logo">
      <div class="hero-section">
        <p class="hero-description">Твоя краса — наша турбота.</p>
        <button class="hero-button" @click="scrollToSection('about')">Дізнатися більше</button>
      </div>
    </section>
  </div>

  <section id="about" class="section">
    <h2>Про нас</h2>
    <p>
      Ласкаво просимо до нашого салону краси — місця, де кожен клієнт стає частиною великої сім’ї, а краса розквітає в
      унікальному стилі. Ми з любов’ю та відповідальністю працюємо над тим, щоб дарувати вам не просто
      послуги, а справжні емоції та впевненість у собі.

      Наш колектив — це команда справжніх професіоналів, які постійно вдосконалюють свої навички, слідкують за сучасними
      трендами та використовують тільки найкращі матеріали. Ми розуміємо, наскільки важливо відчувати себе комфортно і
      доглянуто, тому створюємо затишну атмосферу, де ви можете розслабитися і насолодитися процесом перетворення.

      У нашому салоні кожен клієнт — це особлива історія, яку ми допомагаємо розповісти через стиль, красу та
      індивідуальний підхід. Ми не просто виконуємо процедури — ми створюємо ваш ідеальний образ, який підкреслить вашу
      унікальність і додасть впевненості у будь-якій ситуації.

      Якщо ви шукаєте місце, де вас почують, зрозуміють і подбають про вас на найвищому рівні — ви знайшли саме його.
      Запишіться до нас вже сьогодні і зробіть перший крок до оновлення, яке змінить ваше життя на краще. Дозвольте собі
      бути найкращою версією себе — ми допоможемо вам у цьому!
    </p>
  </section>

  <section id="services" class="section">
    <h2>Наші послуги</h2>
    <div class="service-list">
      <div class="service-item">
        <span class="service-icon">💇‍♀️</span>
        <h3>Стрижки</h3>
        <p>Модні та класичні стрижки з індивідуальним підходом.</p>
      </div>
      <div class="service-item">
        <span class="service-icon">💅</span>
        <h3>Манікюр</h3>
        <p>Дизайни на будь-який смак, гігієна та акуратність — гарантія!</p>
      </div>
      <div class="service-item">
        <span class="service-icon">💆‍♀️</span>
        <h3>Догляд за волоссям</h3>
        <p>Відновлення, живлення та професійне фарбування.</p>
      </div>
      <div class="service-item">
        <span class="service-icon">👁️</span>
        <h3>Корекція брів</h3>
        <p>Форма, фарбування, довершений образ — швидко та якісно.</p>
      </div>

      <div class="service-item">
        <span class="service-icon">🎨</span>
        <h3>Візаж</h3>
        <p>Професійний макіяж для фотосесій, свят та подій.</p>
      </div>

      <div class="service-item">
        <span class="service-icon">🌟</span>
        <h3>Ламінування вій</h3>
        <p>Підкресли природну красу без туші — виглядай ефектно щодня.</p>
      </div>
    </div>
    <router-link to="/services" class="btn-link">Переглянути всі послуги</router-link>
  </section>

  <section id="gallery" class="section">
    <h2>Галерея</h2>
    <p>Натхнення прямо з нашого салону — роботи наших майстрів 💖</p>

    <div class="gallery-grid">
      <img :src="require('@/assets/images/manicure.jpg')" alt="Манікюр">
      <img :src="require('@/assets/images/makiyazh.jpg')" alt="Макіяж">
      <img :src="require('@/assets/images/brov.jpeg')" alt="Брови">
    </div>
    <router-link to="/gallery" class="btn-link">
      Переглянути більше
    </router-link>
  </section>

  <section id="team" class="section">
    <h2>Наша команда</h2>
    <p>Наші майстри — професіонали з досвідом і справжнім талантом 💫</p>

    <div class="team-grid">
      <div class="team-member">
        <img :src="require('@/assets/images/julia.jpg')" alt="Марія">
        <h3>Юлія</h3>
        <p>Майстер перукар</p>
      </div>

      <div class="team-member">
        <img :src="require('@/assets/images/anna.jpg')" alt="Олена">
        <h3>Анна</h3>
        <p>Майстер манікюру</p>
      </div>

      <div class="team-member">
        <img :src="require('@/assets/images/viktoria.png')" alt="Ірина">
        <h3>Вікторія</h3>
        <p>Бровіст & візажист</p>
      </div>
    </div>
  </section>

  <section id="contacts" class="section">
    <h2>Контакти</h2>
    <p>Зв'яжіться з нами для запису або консультації.</p>
    <router-link to="/contacts" class="btn-link">Контактна інформація</router-link>
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
.background-color {
  background: url('@/assets/images/background.jpg')  no-repeat left bottom;
  background-size: 100% 661px;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-title {
  width: 100%;
  height: 100%;
  margin-top: 5%;
}

.hero-description {
  font-size: 2.5rem;
  margin-bottom: 35px;
  width: 100%;
  color: #000000;
}

.hero-button {
  color: black;
  border: none;
  padding: 12px 30px;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero-button:hover {
  background-color: #541e54;
}

.section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto 40px auto;
  text-align: center;
  color: #3a003a;
  border-bottom: 1px solid #d8b0d8;
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.section p {
  font-size: 1.2rem;
  line-height: 1.5;
}

.btn-link {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 25px;
  background-color: #7a2f78;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-link:hover {
  background-color: #541e54;
}

.service-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.service-item {
  background-color: #fff0fa;
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
  font-size: 2.5rem;
  margin-bottom: 10px;
  display: block;
}

.service-item h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #7a2f78;
}

.service-item p {
  font-size: 1rem;
  line-height: 1.4;
  color: #4a004a;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.gallery-grid img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.gallery-button {
  display: inline-block;
  margin-top: 20px;
}

.team-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.team-member {
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
  transition: transform 0.3s;
}

.team-member:hover {
  transform: translateY(-5px);
}

.team-member img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}


</style>
