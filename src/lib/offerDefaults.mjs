export const defaultOffers = {
  certificate: {
    visible: true,
    isExample: true,
    eyebrow: 'ПОДАРУНОК ІЗ ТУРБОТОЮ',
    title: 'Подаруйте час для себе.',
    description: 'Є подарунки, які залишають теплі спогади. Сертифікат Diwa-M — це запрошення зупинитися, відчути турботу та присвятити час власній красі. Для мами, подруги, коханої людини — або для себе.',
    price: '1 000 грн',
    duration: '',
    benefits: ['Подарунок, який можна обрати з увагою до людини', 'Вартість та послуги узгоджуються під час замовлення', 'Деталі оформлення та використання уточнюйте у студії'],
    buttonText: 'Придбати сертифікат',
    buttonUrl: 'https://www.instagram.com/diwa_m_/',
    image: { id: 'certificate-image', asset: 'gift-certificate.jpg', title: 'Концепт подарункового сертифіката Diwa-M' },
  },
  course: {
    visible: true,
    isExample: true,
    eyebrow: 'НАВЧАННЯ ТА ОСОБИСТІ ВІДКРИТТЯ',
    title: 'Самомакіяж. Ваша краса у ваших руках.',
    description: 'Навчіться підкреслювати себе, а не змінювати до невпізнання. Індивідуальний урок самомакіяжу — знайомство з техніками, які легко повторити вдома, і косметикою, що працює саме для вашого образу.',
    price: '1 500 грн',
    duration: '90 хвилин',
    benefits: ['Послідовність створення повсякденного макіяжу', 'Розбір базових засобів і пензлів', 'Практика нанесення тону та акцентів', 'Поради, як повторити образ самостійно'],
    buttonText: 'Записатися на урок',
    buttonUrl: 'https://www.instagram.com/diwa_m_/',
    image: { id: 'course-image', asset: 'makiyazh.jpg', title: 'Макіяж — ілюстрація до індивідуального уроку' },
  },
};

export function createDefaultOffers() {
  return JSON.parse(JSON.stringify(defaultOffers));
}

export function contentImages(data) {
  return [...data.photos, ...Object.values(data.offers || {}).map((offer) => offer.image)];
}

export function isOfferLink(value) {
  try {
    const url = new URL(value);
    if (url.username || url.password) return false;
    if (url.protocol === 'https:') return true;
    if (url.protocol === 'tel:') return /^tel:\+?[\d ()-]{6,30}$/.test(value);
    return url.protocol === 'viber:' && url.hostname === 'chat';
  } catch { return false; }
}
