
document.addEventListener('DOMContentLoaded', ()=> document.body.classList.add('ready'));
async function loadSongs(){
  const grid=document.getElementById('songs-grid'); if(!grid) return;
  try{ const res=await fetch('songs.json'); const raw=await res.json(); const list=Array.isArray(raw)?raw:(raw.songs||[]);
    grid.innerHTML=''; list.forEach(item=>{ const card=document.createElement('div'); card.className='tile'; card.innerHTML=`<img src="${item.cover}"><div class="info"><h3>${item.title}</h3><div class="lead">${item.artist||''} · ${item.duration||''}</div></div>`; const audio=new Audio(item.audio); card.addEventListener('click',()=>audio.play().catch(()=>{})); grid.appendChild(card);}); }
  catch(e){ grid.innerHTML='<p>Şarkı listesi yüklenemedi.</p>'; }
}
document.addEventListener('DOMContentLoaded', loadSongs);
