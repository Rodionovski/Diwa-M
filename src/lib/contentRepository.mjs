export function validateContent(data) {
  const text = (value, max, required = true) => typeof value === 'string' && value.length <= max && (!required || value.trim().length > 0);
  const identified = (rows, limit) => Array.isArray(rows) && rows.length <= limit &&
    rows.every((row) => row && text(row.id, 100)) && new Set(rows.map((row) => row.id)).size === rows.length;
  if (!data || !identified(data.sections, 30) || !identified(data.photos, 300)) return false;
  return data.sections.every((section) => text(section.name, 120) && identified(section.groups, 50) &&
    section.groups.every((group) => text(group.name, 120) && text(group.note, 400, false) && identified(group.items, 100) &&
      group.items.every((item) => text(item.name, 200) && text(item.price, 80, false) && typeof item.divider === 'boolean'))) &&
    data.photos.every((photo) => text(photo.title, 200) && (text(photo.asset, 100) || text(photo.path, 300)));
}

export async function readPublished(client) {
  const { data, error } = await client.from('site_content').select('data, revision').eq('id', 1).single();
  if (error) throw error;
  if (!validateContent(data?.data) || !Number.isInteger(data.revision)) throw new Error('Невірний формат опублікованих даних.');
  return data;
}

export async function savePublished(client, data, revision) {
  if (!client || !Number.isInteger(revision)) throw new Error('Спочатку завантажте дані з бази.');
  if (!validateContent(data)) throw new Error('Перевірте назви, описи та кількість записів. Дані не відповідають допустимому формату.');
  const { data: row, error } = await client.from('site_content')
    .update({ data, revision: revision + 1 }).eq('id', 1).eq('revision', revision)
    .select('data, revision').maybeSingle();
  if (error) throw error;
  if (!row) throw new Error('Інший адміністратор уже змінив дані. Скопіюйте свої зміни та натисніть «Оновити з сайту».');
  return row;
}
