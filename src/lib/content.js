import { reactive } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { readPublished, savePublished } from './contentRepository.mjs';
import defaults from '@/data/content.json';
import { withContentExtras } from './contentExtras.mjs';
import p1 from '@/assets/images/galery1.webp';
import p2 from '@/assets/images/galery2.jpg';
import p3 from '@/assets/images/galery3.jpeg';
import p4 from '@/assets/images/galery4.jpeg';
import p5 from '@/assets/images/galery5.jpg';
import p6 from '@/assets/images/galery6.jpeg';
const assets = { 'galery1.webp': p1, 'galery2.jpg': p2, 'galery3.jpeg': p3, 'galery4.jpeg': p4, 'galery5.jpg': p5, 'galery6.jpeg': p6 };

const url = process.env.VUE_APP_SUPABASE_URL;
const key = process.env.VUE_APP_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url, key) : null;
export const content = reactive({
  data: withContentExtras(JSON.parse(JSON.stringify(defaults))),
  revision: null,
  loading: false,
  error: '',
});
let pending;
export async function loadContent() {
  if (!supabase) return;
  if (pending) return pending;
  content.loading = true;
  pending = (async () => {
    try {
      const data = await readPublished(supabase);
      content.data = data.data;
      content.revision = data.revision;
      content.error = '';
    } catch (error) {
      content.error = 'Не вдалося отримати останні зміни. Спробуйте оновити сторінку.';
      throw error;
    } finally {
      content.loading = false;
      pending = null;
    }
  })();
  return pending;
}
export function photoUrl(photo) {
  if (photo.asset) {
    return assets[photo.asset] || '';
  }
  return supabase && photo.path
    ? supabase.storage.from('gallery').getPublicUrl(photo.path).data.publicUrl
    : '';
}
export async function publishContent(data, revision) {
  const row = await savePublished(supabase, data, revision);
  content.data = row.data;
  content.revision = row.revision;
}
