import { getStore } from '@netlify/blobs';

const mime = (k='') => k.endsWith('.mp3') ? 'audio/mpeg' :
  k.endsWith('.wav') ? 'audio/wav' :
  k.endsWith('.png') ? 'image/png' :
  k.endsWith('.jpg') || k.endsWith('.jpeg') ? 'image/jpeg' :
  k.endsWith('.svg') ? 'image/svg+xml' : 'application/octet-stream';

export async function handler(event) {
  try{
    const key = (event.queryStringParameters && event.queryStringParameters.key) || '';
    if(!key) return { statusCode: 400, body: 'key required' };
    const store = getStore('media');
    const buf = await store.get(key, { type: 'buffer' });
    if(!buf) return { statusCode: 404, body: 'not found' };
    return { statusCode: 200, headers: { 'content-type': mime(key), 'cache-control':'public, max-age=31536000' }, body: buf.toString('base64'), isBase64Encoded: true };
  }catch(e){ return { statusCode: 500, body: String(e) }; }
}