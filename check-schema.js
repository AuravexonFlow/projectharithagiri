// Probe which columns exist in committee_members
const API_URL = 'http://localhost:3000/api/admin';

async function adminApi(action, table, data = null, id = null, filters = null) {
  const body = { action, table };
  if (data) body.data = data;
  if (id) body.id = id;
  if (filters) body.filters = filters;
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return resp.json();
}

async function tryInsert(table, data, label) {
  const res = await adminApi('insert', table, data);
  if (res.error) {
    console.log('FAIL [' + label + ']: ' + res.error);
    return null;
  }
  console.log('OK   [' + label + ']: inserted');
  if (res.data && res.data[0]) {
    await adminApi('delete', table, null, res.data[0].id);
  }
  return res.data;
}

async function main() {
  await tryInsert('committee_members', { name: '__test__' }, 'name only');
  await tryInsert('committee_members', { name: '__test__', role: 'test' }, '+role');
  await tryInsert('committee_members', { name: '__test__', name_si: 'test' }, '+name_si');
  await tryInsert('committee_members', { name: '__test__', role_si: 'test' }, '+role_si');
  await tryInsert('committee_members', { name: '__test__', category: 'test' }, '+category');
  await tryInsert('committee_members', { name: '__test__', description_si: 'test' }, '+description_si');
  await tryInsert('committee_members', { name: '__test__', photo: 'test' }, '+photo');
  await tryInsert('committee_members', { name: '__test__', initials: 'T' }, '+initials');
  await tryInsert('committee_members', { name: '__test__', color: 'test' }, '+color');
  await tryInsert('committee_members', { name: '__test__', phone: 'test' }, '+phone');
  await tryInsert('committee_members', { name: '__test__', email: 'test' }, '+email');
  await tryInsert('committee_members', { name: '__test__', display_order: 1 }, '+display_order');
  await tryInsert('committee_members', { name: '__test__', is_active: true }, '+is_active');
}

main().catch(function(e) { console.error('Fatal:', e); });
