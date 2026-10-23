<template>
  <section class="container admin-page">
    <p class="eyebrow">DIWA-M / КЕРУВАННЯ САЙТОМ</p>
    <h1>Кабінет <em>студії.</em></h1>
    <p v-if="error" class="admin-message error" role="alert">{{ error }}</p>
    <p v-if="message" class="admin-message" role="status">{{ message }}</p>
    <p v-if="!supabase" class="admin-notice">Кабінет ще не підключено. Потрібно завершити налаштування бази та облікового запису адміністратора.</p>
    <p v-if="booting" role="status">Перевіряємо доступ…</p>
    <form v-else-if="supabase && !session" class="admin-login" @submit.prevent="login">
      <h2>Вхід для команди</h2>
      <label>Електронна пошта<input v-model.trim="email" type="email" autocomplete="username" required></label>
      <label>Пароль<input v-model="password" type="password" autocomplete="current-password" required minlength="8"></label>
      <button class="button-primary" :disabled="busy">{{ busy ? 'Входимо…' : 'Увійти' }} <span>↗</span></button>
      <p>Обліковий запис видає власник студії. Якщо забули пароль, зверніться до нього.</p>
    </form>
    <template v-else-if="session">
      <div class="admin-account"><span>{{ session.user.email }}</span><button :disabled="busy" @click="logout">Вийти</button></div>
      <p v-if="!authorized && !booting" class="admin-notice">Цьому обліковому запису не надано права редагування. Зверніться до власника студії.</p>
      <template v-if="authorized && draft">
        <div class="admin-toolbar">
          <div><strong>{{ dirty ? 'Є неопубліковані зміни' : 'Усі зміни опубліковано' }}</strong><p>Відвідувачі побачать зміни після публікації.</p></div>
          <button :disabled="busy" @click="reload">Оновити з сайту</button>
          <button class="button-primary" :disabled="busy || !dirty" @click="publish">{{ busy ? 'Зберігаємо…' : 'Опублікувати зміни' }} <span>↗</span></button>
        </div>
        <div class="admin-tabs" role="group" aria-label="Розділи керування">
          <button :aria-pressed="tab === 'photos'" @click="tab = 'photos'">Приклади робіт ({{ draft.photos.length }})</button>
          <button :aria-pressed="tab === 'prices'" @click="tab = 'prices'">Послуги та прайс</button>
        </div>
        <fieldset :disabled="busy" class="admin-editor">
          <div v-if="tab === 'photos'">
            <h2>Приклади робіт</h2>
            <p class="admin-help">Додайте фото та короткий опис. Перші три фото також з’являться на головній.</p>
            <label class="upload-label">Додати фото<input type="file" accept="image/jpeg,image/png,image/webp" multiple @change="addPhotos"></label>
            <p class="admin-help">JPG, PNG або WebP, до 5 МБ кожне.</p>
            <div class="admin-photos">
              <article v-for="(photo, index) in draft.photos" :key="photo.id" class="admin-photo">
                <img :src="preview(photo)" :alt="photo.title">
                <label>Опис роботи<input v-model.trim="photo.title" maxlength="200" required></label>
                <div class="admin-photo-actions"><button :disabled="index === 0" aria-label="Перемістити фото раніше" @click="movePhoto(index, -1)">↑</button><button :disabled="index === draft.photos.length - 1" aria-label="Перемістити фото пізніше" @click="movePhoto(index, 1)">↓</button><button class="danger" @click="removePhoto(photo)">Прибрати</button></div>
              </article>
            </div>
          </div>
          <div v-else>
            <h2>Послуги та прайс</h2>
            <p class="admin-help">Ціну можна вказати текстом: «450 грн», «від 600 грн» або «500–700 грн».</p>
            <article v-for="section in draft.sections" :key="section.id" class="admin-price-section">
              <div class="admin-section-title"><label>Назва розділу<input v-model.trim="section.name" maxlength="120"></label><button class="danger" @click="removeSection(section)">Видалити розділ</button></div>
              <div v-for="group in section.groups" :key="group.id" class="admin-price-group">
                <div class="admin-section-title"><label>Група послуг<input v-model.trim="group.name" maxlength="120"></label><button class="danger" @click="removeGroup(section, group)">Видалити групу</button></div>
                <div v-for="item in group.items" :key="item.id" class="admin-price-row">
                  <label>Послуга<input v-model.trim="item.name" maxlength="200"></label>
                  <label>Ціна<input v-model.trim="item.price" maxlength="80" placeholder="450 грн"></label>
                  <label class="checkbox-label"><input v-model="item.divider" type="checkbox">Роздільник</label>
                  <button class="danger" :aria-label="`Видалити послугу ${item.name}`" @click="removeItem(group, item)">×</button>
                </div>
                <button @click="group.items.push({ id: id(), name: '', price: '', divider: false })">+ Додати послугу</button>
                <label class="admin-note">Примітка<input v-model.trim="group.note" maxlength="400" placeholder="Наприклад, доплата за довжину волосся"></label>
              </div>
              <button @click="section.groups.push({ id: id(), name: '', note: '', items: [] })">+ Додати групу</button>
            </article>
            <button @click="draft.sections.push({ id: id(), name: '', groups: [] })">+ Додати розділ</button>
          </div>
        </fieldset>
      </template>
    </template>
    <button v-if="session && authorized && !draft && !booting" @click="reload">Спробувати завантажити ще раз</button>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { supabase, content, loadContent, publishContent, photoUrl } from '@/lib/content';

const session = ref(null);
const booting = ref(Boolean(supabase));
const authorized = ref(false);
const email = ref('');
const password = ref('');
const error = ref('');
const message = ref('');
const busy = ref(false);
const draft = ref(null);
const baseline = ref('');
const revision = ref(null);
const tab = ref('photos');
const dirty = computed(() => draft.value && JSON.stringify(draft.value) !== baseline.value);
const files = new Map();
let subscription;
let alive = true;
const id = () => crypto.randomUUID();
const preview = (photo) => files.get(photo.id)?.preview || photoUrl(photo);
function clearFiles() {
  for (const entry of files.values()) URL.revokeObjectURL(entry.preview);
  files.clear();
}
function setDraft() {
  clearFiles();
  draft.value = JSON.parse(JSON.stringify(content.data));
  baseline.value = JSON.stringify(draft.value);
  revision.value = content.revision;
}
async function checkSession(next) {
  session.value = next;
  authorized.value = false;
  draft.value = null;
  clearFiles();
  if (!next) { booting.value = false; return; }
  booting.value = true;
  try {
    const { data, error: accessError } = await supabase.from('admin_users').select('user_id').eq('user_id', next.user.id).maybeSingle();
    if (accessError) throw accessError;
    if (!alive || session.value?.user.id !== next.user.id) return;
    authorized.value = Boolean(data);
    if (data) { await loadContent(); if (alive && session.value?.user.id === next.user.id) setDraft(); }
  } catch { error.value = 'Не вдалося завантажити кабінет. Перевірте підключення та налаштування доступу.'; }
  finally { if (alive) booting.value = false; }
}
async function login() {
  busy.value = true; error.value = ''; message.value = '';
  try {
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
    if (authError) throw authError;
    password.value = '';
  } catch { error.value = 'Не вдалося увійти. Перевірте пошту та пароль або спробуйте пізніше.'; }
  finally { busy.value = false; }
}
async function logout() {
  if (dirty.value && !window.confirm('Вийти й відкинути неопубліковані зміни?')) return;
  busy.value = true; error.value = ''; message.value = '';
  try {
    const { error: authError } = await supabase.auth.signOut();
    if (authError) throw authError;
    clearFiles(); draft.value = null;
  } catch { error.value = 'Не вдалося вийти. Спробуйте ще раз.'; }
  finally { busy.value = false; }
}
async function reload() {
  if (dirty.value && !window.confirm('Завантажити опубліковані дані та відкинути свої зміни?')) return;
  busy.value = true; error.value = ''; message.value = '';
  try { await loadContent(); setDraft(); }
  catch { error.value = 'Не вдалося завантажити дані. Спробуйте ще раз.'; }
  finally { busy.value = false; }
}
function addPhotos(event) {
  error.value = ''; message.value = '';
  for (const file of event.target.files) {
    if (draft.value.photos.length >= 300) { error.value = 'У галереї може бути не більше 300 фото.'; break; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      error.value = 'Деякі фото не додано: потрібен JPG, PNG або WebP розміром до 5 МБ.';
      continue;
    }
    const photoId = id();
    files.set(photoId, { file, preview: URL.createObjectURL(file) });
    draft.value.photos.unshift({ id: photoId, title: file.name.replace(/\.[^.]+$/, '') });
  }
  event.target.value = '';
}
function movePhoto(index, direction) {
  const photos = draft.value.photos;
  const [photo] = photos.splice(index, 1);
  photos.splice(index + direction, 0, photo);
}
function removePhoto(photo) {
  if (!window.confirm('Прибрати це фото з галереї? Зміна набуде чинності після публікації.')) return;
  draft.value.photos = draft.value.photos.filter((p) => p.id !== photo.id);
  const entry = files.get(photo.id);
  if (entry) { URL.revokeObjectURL(entry.preview); files.delete(photo.id); }
}
function removeSection(section) {
  if (window.confirm(`Видалити розділ «${section.name}» разом з усіма його послугами?`)) draft.value.sections = draft.value.sections.filter((s) => s.id !== section.id);
}
function removeGroup(section, group) {
  if (window.confirm(`Видалити групу «${group.name}» та її послуги?`)) section.groups = section.groups.filter((g) => g.id !== group.id);
}
function removeItem(group, item) {
  if (window.confirm(`Видалити послугу «${item.name}»?`)) group.items = group.items.filter((i) => i.id !== item.id);
}
async function publish() {
  error.value = ''; message.value = '';
  if (draft.value.photos.some((p) => !p.title) || draft.value.sections.some((s) => !s.name || s.groups.some((g) => !g.name || g.items.some((i) => !i.name)))) {
    error.value = 'Заповніть назви розділів, груп, послуг та описи фото перед публікацією.'; return;
  }
  busy.value = true;
  try {
    const next = JSON.parse(JSON.stringify(draft.value));
    for (const photo of next.photos) {
      const entry = files.get(photo.id);
      if (!entry) continue;
      if (entry.path) { photo.path = entry.path; continue; }
      const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[entry.file.type];
      const path = `${session.value.user.id}/${id()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('gallery').upload(path, entry.file, { contentType: entry.file.type, upsert: false });
      if (uploadError) throw new Error('Не вдалося завантажити фото. Перевірте інтернет і спробуйте ще раз.');
      entry.path = path; photo.path = path;
    }
    await publishContent(next, revision.value);
    setDraft();
    message.value = 'Опубліковано! Фото та прайс уже доступні відвідувачам після оновлення сторінки.';
    // Keep removed published files in storage: older browser tabs can still reference them.
  } catch (failure) {
    // Never delete uploaded files on ambiguous network failures: the publish may have committed.
    error.value = failure.message || 'Не вдалося опублікувати зміни.';
  } finally { busy.value = false; }
}
function beforeUnload(event) {
  if (dirty.value || busy.value) { event.preventDefault(); event.returnValue = ''; }
}
onBeforeRouteLeave(() => {
  if (busy.value) return false;
  return !dirty.value || window.confirm('Залишити кабінет і відкинути неопубліковані зміни?');
});
onMounted(async () => {
  window.addEventListener('beforeunload', beforeUnload);
  if (!supabase) return;
  const { data } = supabase.auth.onAuthStateChange((event, next) => {
    // Defer API calls until the auth callback releases its internal lock.
    if (event === 'SIGNED_IN' && next?.user.id === session.value?.user.id) return;
    if (['SIGNED_IN', 'SIGNED_OUT'].includes(event)) setTimeout(() => { if (alive) checkSession(next); }, 0);
  });
  subscription = data.subscription;
  try {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) throw authError;
    if (alive) await checkSession(authData.session);
  } catch { booting.value = false; error.value = 'Не вдалося перевірити вхід. Оновіть сторінку.'; }
});
onBeforeUnmount(() => {
  alive = false;
  subscription?.unsubscribe();
  clearFiles();
  window.removeEventListener('beforeunload', beforeUnload);
});
</script>

<style scoped>
.admin-page { padding-top: 55px; padding-bottom: 90px; }
h1 { font-size: clamp(48px, 6vw, 80px); margin-bottom: 35px; }
h2 { font-size: 34px; margin-bottom: 18px; }
button { font: inherit; cursor: pointer; border: 1px solid var(--line); padding: 11px 15px; background: var(--bg); color: var(--ink); font-size: 13px; }
button:disabled { opacity: .5; cursor: default; }
.button-primary { background: var(--olive); color: white; }
label { display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
input { width: 100%; min-width: 0; padding: 12px; background: white; border: 1px solid var(--line); border-radius: 0; color: var(--ink); font: inherit; font-size: 15px; }
input:focus-visible { outline: 2px solid var(--olive); outline-offset: 2px; }
.admin-login { max-width: 440px; display: grid; gap: 22px; background: var(--paper); padding: 28px; }
.admin-login p, .admin-help, .admin-toolbar p { font-size: 12px; color: var(--muted); line-height: 1.8; }
.admin-account { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 25px; font-size: 13px; overflow-wrap: anywhere; }
.admin-toolbar { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; border: 1px solid var(--line); padding: 20px; background: var(--paper); }
.admin-toolbar > div { flex: 1; min-width: 200px; font-size: 13px; }
.admin-tabs { display: flex; gap: 12px; margin: 30px 0; }
.admin-tabs [aria-pressed="true"] { background: var(--graphite); color: white; }
.admin-editor { border: none; min-width: 0; }
.upload-label { display: inline-flex; border: 1px dashed var(--olive); padding: 18px; margin: 20px 0 10px; gap: 15px; max-width: 100%; }
.admin-photos { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 28px; }
.admin-photo { border: 1px solid var(--line); padding: 16px; }
.admin-photo img { width: 100%; height: 220px; object-fit: cover; margin-bottom: 18px; }
.admin-photo-actions { display: flex; gap: 8px; margin-top: 12px; }
.danger { color: #973b39; }
.admin-price-section { margin: 30px 0; border: 1px solid var(--line); padding: 24px; }
.admin-section-title { display: flex; align-items: flex-end; gap: 18px; margin-bottom: 20px; }
.admin-section-title label { flex: 1; }
.admin-price-group { background: var(--paper); padding: 20px; margin-bottom: 25px; }
.admin-price-row { display: grid; grid-template-columns: minmax(0, 2fr) minmax(100px, 1fr) auto auto; gap: 12px; align-items: end; margin-bottom: 18px; }
.checkbox-label { flex-direction: row; align-items: center; align-self: center; margin-top: 22px; }
.checkbox-label input { width: auto; }
.admin-note { margin-top: 22px; }
.admin-notice, .admin-message { padding: 20px; background: var(--paper); margin: 25px 0; line-height: 1.7; font-size: 14px; }
.admin-message { border: 1px solid var(--line); box-shadow: 0 4px 24px #2b292714; }
.error { color: #973b39; border-color: #973b39; }
@media(max-width: 850px) { .admin-photos { grid-template-columns: repeat(2, minmax(0, 1fr)); } .admin-price-row { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); } .checkbox-label { margin-top: 0; } }
@media(max-width: 550px) { .admin-photos { grid-template-columns: 1fr; } .admin-section-title { flex-direction: column; align-items: stretch; } .admin-price-section, .admin-price-group { padding: 14px; } .admin-tabs { flex-wrap: wrap; } }
</style>
