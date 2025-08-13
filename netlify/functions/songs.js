import { getStore } from '@netlify/blobs';

export async function handler(event, context) {
  const store = getStore('songs');
  const data = await store.get('songs.json', { type: 'json' }) || { songs: [] };
  return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) };
}