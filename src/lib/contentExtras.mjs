import { createDefaultOffers } from './offerDefaults.mjs';

export const defaultFaqs = [
  { id: 'faq-booking', question: 'Як записатися на візит?', answer: 'Зателефонуйте за номером +38 (067) 424 74 98 або напишіть у Viber чи Instagram. У повідомленні вкажіть бажану послугу та зручний для вас час.' },
  { id: 'faq-price', question: 'Де переглянути вартість послуг?', answer: 'У розділі «Послуги та ціни» є наш прайс. Якщо вартість указана діапазоном або «від», уточніть остаточну суму для вашого запиту під час запису.' },
  { id: 'faq-choice', question: 'Ще не визначилися з образом?', answer: 'Напишіть нам в Instagram: розкажіть про свої побажання та надішліть приклади, які вам подобаються. Це допоможе обговорити ваш запит перед візитом.' },
  { id: 'faq-address', question: 'Де розташована студія?', answer: 'Чекаємо на вас у Хмельницькому на вул. Шевченка, 50. Якщо потрібна допомога з маршрутом, зателефонуйте нам перед візитом.' },
];

// Existing databases need no migration; never replace a deliberately empty list.
export function withContentExtras(data) {
  return {
    ...data,
    offers: data.offers ?? createDefaultOffers(),
    reviews: data.reviews ?? [],
    faqs: data.faqs ?? defaultFaqs.map((faq) => ({ ...faq })),
  };
}
