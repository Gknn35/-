import { getStore } from '@netlify/blobs';

function b64(dataUrl){
  const i = dataUrl.indexOf(',');
  return Buffer.from(dataUrl.slice(i+1), 'base64');
}
function sanitize(name='file'){
  return name.replace(/[^a-z0-9._-]/gi,'_').toLowerCase();
}

export async function handler(event) {
  try{
    const ADMIN = process.env.ADMIN_PASSWORD || 'gokhan123';
    const key = event.headers['x-admin-key'] || event.headers['X-Admin-Key'] || '';
    if(!key || key !== ADMIN){ return { statusCode: 401, body: 'unauthorized' }; }
    const body = JSON.parse(event.body || '{}');
    const media = getStore('media');
    const store = getStore('songs');
    const ts = Date.now();
    const audioKey = `audio/${ts}_${sanitize(body.audio?.name||'audio.mp3')}`;
    await media.set(audioKey, b64(body.audio.dataUrl));

    let coverKey = null;
    if(body.cover && body.cover.dataUrl){
      coverKey = `img/${ts}_${sanitize(body.cover.name||'cover.png')}`;
      await media.set(coverKey, b64(body.cover.dataUrl));
    }

    const list = await store.get('songs.json', { type: 'json' }) || { songs: [] };
    list.songs = list.songs || [];
    list.songs.unshift({
      title: body.title || 'Yeni Şarkı',
      artist: body.artist || 'Gökhan Özkanlı',
      duration: body.duration || '',
      cover: coverKey ? `/.netlify/functions/file?key=${coverKey}` : 'assets/img/cover1.svg',
      audio: `/.netlify/functions/file?key=${audioKey}`
    });
    await store.set('songs.json', JSON.stringify(list));
    return { statusCode: 200, headers: { 'content-type':'application/json' }, body: JSON.stringify(list) };
  }catch(e){ return { statusCode: 500, body: String(e) }; }
}