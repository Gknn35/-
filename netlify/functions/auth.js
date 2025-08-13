
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
exports.handler = async (event) => {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  if (!CLIENT_ID || !CLIENT_SECRET) return { statusCode: 500, body: JSON.stringify({ error: 'Missing GitHub OAuth env vars.' }) };
  const rawQuery = event.rawQuery ? '?' + event.rawQuery : '';
  const url = new URL('https://' + event.headers.host + event.path + rawQuery);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code){
    const redirectUri = `https://${event.headers.host}${event.path}`;
    const params = new URLSearchParams({ client_id: CLIENT_ID, redirect_uri: redirectUri, scope: 'repo,user', state: state || Math.random().toString(36).slice(2), allow_signup:'true' }).toString();
    return { statusCode: 302, headers: { Location: `https://github.com/login/oauth/authorize?${params}` }, body: '' };
  }
  try{
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', { method:'POST', headers:{'Accept':'application/json'}, body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }) });
    const data = await tokenRes.json();
    if (data.error) return { statusCode: 400, body: JSON.stringify(data) };
    return { statusCode: 200, body: JSON.stringify({ token: data.access_token, provider:'github' }) };
  }catch(e){ return { statusCode: 500, body: JSON.stringify({ error: e.message }) }; }
};
