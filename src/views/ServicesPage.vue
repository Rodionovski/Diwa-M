<template>
  <div class="background">
    <div class="container services-intro"><p class="eyebrow">DIWA-M / ПОСЛУГИ ТА ЦІНИ</p><h1>Турбота про <em>вас.</em></h1><p>Оберіть свій ритуал краси. Ми подбаємо про деталі.</p></div>
    <section class="haircuts-services">
      <div class="container">
        <div class="title">
          <div class="title-text">
            Послуги Перукаря
          </div>
          <span class="title-icon">
            <img src="@/assets/images/icon1.png" alt="icon">️</span>
        </div>
        <div class="service-card">
          <div class="service-content reveal" v-reveal>
            <div class="description"> Чоловічі Стрижки</div>
            <div class="service">
              <p>Наголо</p>
              <p>160 грн</p>
            </div>
            <div class="service">
              <p>Машинка</p>
              <p>200 грн</p>
            </div>
            <div class="service">
              <p>Машинка + Ножиці</p>
              <p>250 грн</p>
            </div>
            <div class="service">
              <p>Стрижка бороди</p>
              <p>70-100 грн</p>
            </div>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Жіночі Стрижки</div>
            <div class="service">
              <p>Чубчик</p>
              <p>80-100 грн</p>
            </div>
            <div class="service">
              <p>Коротке волосся</p>
              <p>від 350 грн</p>
            </div>
            <div class="service">
              <p>Середня довжина</p>
              <p>400 грн</p>
            </div>
            <div class="service">
              <p>Довге волосся</p>
              <p>від 450 грн</p>
            </div>
            <p> (+ 50 - 100 грн за додаткову довжину або густину)</p>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Фарбування</div>
            <div class="service">
              <p>Коріння</p>
              <p>350-400 грн</p>
            </div>
            <div class="service">
              <p>вся довжина</p>
              <p>400-500 грн</p>
            </div>
            <div class="service">
              <p>Висвітлення + Тонування</p>
              <p>від 700 грн</p>
            </div>
            <div class="service">
              <p>Мілірування</p>
              <p>750 - 1000 грн</p>
            </div>
            <div class="service">
              <p>Складні техніки фарбування</p>
              <p>від 1300 грн</p>
            </div>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Укладка феном/Вирівнювачем</div>
            <div class="service">
              <p>Коротке волосся</p>
              <p>300 грн</p>
            </div>
            <div class="service">
              <p>Середня довжина</p>
              <p>350 грн</p>
            </div>
            <div class="service">
              <p>Довге волосся</p>
              <p>400 грн</p>
            </div>
            <div class="service service-divider">
              <p>Вечірні зачіски</p>
              <p>500 - 700 грн</p>
            </div>
            <div class="service">
              <p>Весільні зачіски</p>
              <p>600 - 1000 грн</p>
            </div>
          </div>
          <!--          <div class="service-content reveal" v-reveal>-->
          <!--            <div class="description">Додаткові послуги</div>-->
          <!--            <div class="service">-->
          <!--              <p>Вихід майстра в поза робочий час</p>-->
          <!--              <p>з 6:00 до 8:00 + 150 грн</p>-->
          <!--            </div>-->
          <!--            <div class="service">-->
          <!--              <p></p>-->
          <!--              <p>з 8:00 до 8:30 + 80 грн</p>-->
          <!--            </div>-->
          <!--            <div class="service">-->
          <!--              <p></p>-->
          <!--              <p>з 8:30 до 9:00 + 50грн</p>-->
          <!--            </div>-->
          <!--            <div class="service service-divider">-->
          <!--              <p>Виїзд до вас</p>-->
          <!--              <p>в межах міста 300 - 500 грн</p>-->
          <!--            </div>-->
          <!--            <div class="service">-->
          <!--              <p></p>-->
          <!--              <p>поза містом плата погодинно</p>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </section>
    <section class="makeup-services">
      <div class="container">
        <div class="title">
          <div class="title-text">
            Послуги Візажиста
          </div>
          <span class="title-icon">
            <img src="@/assets/images/icon3.png" alt="icon">️</span>
        </div>
        <div class="service-card">
          <div class="service-content reveal" v-reveal>
            <div class="description">Брови</div>
            <div class="service">
              <p>Корекція + фарбування брів фарбою</p>
              <p>350 грн</p>
            </div>
            <div class="service">
              <p>Корекція + фарбування брів (хна)</p>
              <p>400 грн</p>
            </div>
            <div class="service">
              <p>Корекція брів</p>
              <p>200 грн</p>
            </div>
            <div class="service">
              <p>Фарбування брів</p>
              <p>200 грн</p>
            </div>
            <div class="service">
              <p>Фарбування вій</p>
              <p>200 грн</p>
            </div>
            <div class="service">
              <p>Корекція та створення форми</p>
              <p>250 грн</p>
            </div>
            <div class="service">
              <p>Чоловіча корекція брів</p>
              <p>300 грн</p>
            </div>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Ламінування/Макіяж</div>
            <div class="service">
              <p>Ламінування вій</p>
              <p>500 грн</p>
            </div>
            <div class="service">
              <p>Ламінування брів</p>
              <p>500 грн</p>
            </div>
            <div class="service service-divider">
              <p>Ваксинг верхньої губи</p>
              <p>150 грн</p>
            </div>
            <div class="service">
              <p>Ваксинг підборіддя</p>
              <p>120 - 180 грн</p>
            </div>
            <div class="service service-divider">
              <p>Денний макіяж</p>
              <p>600 грн</p>
            </div>
            <div class="service">
              <p>Вечірній макіяж</p>
              <p>650 - 1000 грн</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="nails-services">
      <div class="container">
        <div class="title">
          <div class="title-text">
            Послуги Майстра манікюру
          </div>
          <span class="title-icon">
            <img src="@/assets/images/icon2.png" alt="icon">️</span>
        </div>
        <div class="service-card">
          <div class="service-content reveal" v-reveal>
            <div class="description">Манікюр</div>
            <div class="service">
              <p>Манікюр жіночий (без покриття)</p>
              <p>280 грн</p>
            </div>
            <div class="service">
              <p>Манікюр чоловічий</p>
              <p>300 грн</p>
            </div>
            <div class="service service-divider">
              <p>Зняття</p>
            </div>
            <div class="service">
              <p>Матеріалу іншого майстра з подальшим покриттям</p>
              <p>50 грн</p>
            </div>
            <div class="service">
              <p>Без подальшого покриття</p>
              <p>80 грн</p>
            </div>
            <div class="service">
              <p>Зняття нарощених нігтів</p>
              <p>100 грн</p>
            </div>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Манікюр та покриття гель-лаком</div>
            <div class="service">
              <p>Однотонне</p>
              <p>450 грн</p>
            </div>
            <div class="service">
              <p>З дизайном</p>
              <p>480 - 500 грн</p>
            </div>
            <div class="service">
              <p>Френч</p>
              <p>+ 50 грн</p>
            </div>
            <div class="service service-divider">
              <p>Покриття гель-лаком (без манікюру)</p>
            </div>
            <div class="service">
              <p>Однотонне</p>
              <p>380 грн</p>
            </div>
            <div class="service">
              <p>З дизайном</p>
              <p>400 грн</p>
            </div>
            <div class="service service-divider">
              <p>Укріплення</p>
              <p>+ 50 грн</p>
            </div>
          </div>
          <div class="service-content reveal" v-reveal>
            <div class="description">Педикюр</div>
            <div class="service">
              <p>Педикюр</p>
              <p>350 - 500 грн</p>
            </div>
            <div class="service">
              <p>Педикюр з покриттям</p>
              <p>500 - 600 грн</p>
            </div>
            <div class="service">
              <p>Чистка пальчиків ніг з покриттям</p>
              <p>420 - 600 грн</p>
            </div>
            <div class="service service-divider">
              <p>Чистка пальчиків ніг без покриття</p>
              <p>250 грн</p>
            </div>
            <div class="service">
              <p>Однотонне</p>
              <p>380 грн</p>
            </div>
            <div class="service service-divider">
              <p>Нарощування нігтів</p>
              <p>600 - 800 грн</p>
            </div>
            <div class="service">
              <p>Корекція</p>
              <p>500 - 700 грн</p>
            </div>
            <div class="service service-divider">
              <p>Ремонт нігтика</p>
              <p>30 грн</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="additionally-services">
      <div class="container">
        <div class="title">
          <div class="title-text">
            Додаткові послуги
          </div>
        </div>
        <div class="service-card">
          <div class="service-content reveal" v-reveal>
            <div class="service">
              <p>Вихід майстра в поза робочий час</p>
            </div>
            <div class="service">
              <p>з 6:00 до 8:00</p>
              <p>+ 150 грн</p>
            </div>
            <div class="service">
              <p>з 8:00 до 8:30</p>
              <p>+ 80 грн</p>
            </div>
            <div class="service">
              <p>з 8:30 до 9:00</p>
              <p>+ 50 грн</p>
            </div>
            <div class="service service-divider">
              <p>Виїзд на локацію</p>
            </div>
            <div class="service">
              <p>в межах міста</p>
              <p>від 300 - 500 грн</p>
            </div>
            <div class="service">
              <p>поза містом</p>
              <p>плата погодинно</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage'
};
</script>

<style scoped lang="scss">
.background { padding: 32px 0 90px; }
.services-intro { padding-top: 30px; padding-bottom: 20px; }
.services-intro h1 { font-size: clamp(58px, 7vw, 90px); }
.services-intro > p:last-child { margin-top: 24px; font-size: 13px; line-height: 1.8; color: var(--muted); }
section { padding: 40px 0; }
.title { display: flex; align-items: center; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid var(--line); }
.title-text { font-family: var(--serif); font-size: clamp(30px, 4vw, 48px); }
.title-icon img { width: 40px; opacity: .65; }
.service-card { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 60px; margin-top: 36px; }
.service-content { padding: 24px; background: var(--paper); }
.description { font-family: var(--serif); font-size: 26px; margin-bottom: 22px; }
.service { display: flex; justify-content: space-between; gap: 20px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 14px; line-height: 1.6; }
.service p:last-child:not(:first-child) { white-space: nowrap; }
.service-divider { margin-top: 18px; border-top: 1px solid var(--olive); }
@media(max-width: 640px) { .service-card { grid-template-columns: 1fr; gap: 20px; } .service-content { padding: 18px; } }
</style>
