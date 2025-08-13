
function onReady(){
  document.body.classList.add('ready');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('reveal'); io.unobserve(e.target); }
    })
  }, {threshold: 0.12});
  document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));
}
document.addEventListener('DOMContentLoaded', onReady);

// Modal logic
const modal = {
  root: null, title: null, img: null, audio:null, open(data){
    this.root = this.root || document.getElementById('modal-root');
    this.title = this.title || document.getElementById('modal-title');
    this.img = this.img || document.getElementById('modal-img');
    this.audio = this.audio || document.getElementById('modal-audio');
    this.title.textContent = data.title + ' — ' + data.artist;
    this.img.src = data.cover;
    this.audio.src = data.audio;
    this.audio.play().catch(()=>{});
    this.root.classList.add('open');
  },
  close(){
    if(this.audio){ this.audio.pause(); }
    if(this.root){ this.root.classList.remove('open');}
  }
};

function bindModal(){
  const closeBtns = document.querySelectorAll('[data-close]');
  closeBtns.forEach(btn=> btn.addEventListener('click', ()=> modal.close()));
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') modal.close();
  });
}
document.addEventListener('DOMContentLoaded', bindModal);

// Songs page dynamic load
async function loadSongs(){
  const grid = document.getElementById('songs-grid');
  if(!grid) return;
  try{
    const res = await fetch('songs.json');
    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : (raw.songs || raw.items || raw.data || []);
    grid.innerHTML = '';
    list.forEach(item=>{
      const card = document.createElement('div');
      card.className = 'tile fade-up';
      card.innerHTML = `
        <div class="badge">Yeni</div>
        <img src="${item.cover}" alt="${item.title}">
        <div class="info">
          <h3>${item.title}</h3>
          <div class="muted">${item.artist} · ${item.duration || ''}</div>
        </div>`;
      card.addEventListener('click', ()=> modal.open(item));
      grid.appendChild(card);
      requestAnimationFrame(()=> card.classList.add('reveal'));
    });
  }catch(err){
    grid.innerHTML = '<p>Şarkıları yüklerken bir sorun oluştu.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadSongs);