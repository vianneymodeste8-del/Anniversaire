/* ============================================================
   MAIN — logique d'interface : scènes, miroir enchanté, souvenirs,
   ballons, audio, coffret, porte.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- init 3D ---------- */
  Scene3D.init();

  /* ---------- prénom ---------- */
  document.querySelectorAll('[id^="name-slot-"]').forEach(el => {
    el.textContent = CONFIG.name;
  });
  const finalMsgEl = document.getElementById('final-message');
  if (finalMsgEl && CONFIG.finalMessage) finalMsgEl.textContent = CONFIG.finalMessage;

  /* ---------- lettre d'amour (scène 8) ---------- */
  const letterHeading = document.getElementById('letter-heading');
  const letterParagraphs = document.getElementById('letter-paragraphs');
  const letterSignature = document.getElementById('letter-signature');
  if (CONFIG.loveLetter) {
    if (letterHeading) letterHeading.textContent = CONFIG.loveLetter.heading;
    if (letterSignature) letterSignature.textContent = CONFIG.loveLetter.signature;
    if (letterParagraphs) {
      CONFIG.loveLetter.paragraphs.forEach(p => {
        const el = document.createElement('p');
        el.textContent = p;
        letterParagraphs.appendChild(el);
      });
    }
  }

  const audioEl = document.getElementById('bg-audio');
  if (audioEl && CONFIG.audioSrc) {
    audioEl.querySelector('source').src = CONFIG.audioSrc;
    audioEl.load();
  }

  /* ============================================================
     OBSERVATEUR DE SCÈNES
     ============================================================ */
  const scenes = Array.from(document.querySelectorAll('.scene'));
  const progressFill = document.getElementById('progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        scenes.forEach(s => s.classList.remove('is-active'));
        entry.target.classList.add('is-active');
        const n = parseInt(entry.target.dataset.scene, 10);
        Scene3D.setActiveScene(n);
        updateAudioMood(n);
        if (n === 8) revealLetter();
      }
    });
  }, { threshold: [0, 0.5, 1] });

  scenes.forEach(s => observer.observe(s));

  let letterRevealed = false;
  function revealLetter(){
    if (letterRevealed) return;
    letterRevealed = true;
    const paras = document.querySelectorAll('#letter-paragraphs p');
    paras.forEach((p, i) => {
      setTimeout(() => p.classList.add('reveal'), 350 * i);
    });
    const sig = document.getElementById('letter-signature');
    setTimeout(() => { if (sig) sig.classList.add('reveal'); }, 350 * paras.length + 300);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? scrollTop / max : 0;
    if (progressFill) progressFill.style.height = `${Math.min(100, ratio*100)}%`;
  }, { passive:true });

  /* ============================================================
     SCÈNE 1 — coffret cadeau
     ============================================================ */
  const tapPulse = document.querySelector('.tap-pulse');
  let giftTriggered = false;
  function triggerGift(){
    if (giftTriggered) return;
    giftTriggered = true;
    Scene3D.openGiftBox();
    if (tapPulse) tapPulse.style.animation = 'none';
    setTimeout(() => {
      document.getElementById('scene-2').scrollIntoView({ behavior:'smooth' });
    }, 900);
  }
  if (tapPulse) tapPulse.addEventListener('click', triggerGift);
  document.getElementById('scene-1').addEventListener('click', triggerGift);

  /* ============================================================
     SCÈNE 3 — galerie de souvenirs (médias)
     ============================================================ */
  const track = document.getElementById('memory-track');
  if (track && CONFIG.memories) {
    CONFIG.memories.forEach(m => {
      const card = document.createElement('div');
      card.className = 'memory-card';

      let mediaHTML = '<span class="memory-placeholder-icon">✦</span>';
      if (m.video) {
        mediaHTML = `<video class="memory-media" src="${m.video}" autoplay muted loop playsinline></video>`;
      } else if (m.image) {
        mediaHTML = `<img class="memory-media" src="${m.image}" alt="${m.title}">`;
      }

      const titleHTML = m.title ? `<h3>${m.title}</h3>` : '';
      const textHTML = m.text ? `<p>${m.text}</p>` : '';
      card.innerHTML = `
        ${mediaHTML}
        ${titleHTML}
        ${textHTML}
      `;
      track.appendChild(card);
    });
  }

  /* ============================================================
     SCÈNE 4 — ballons de vœux
     ============================================================ */
  const balloonsField = document.getElementById('balloons-field');
  const wishTextEl = document.getElementById('wish-text');
  const balloonClasses = ['c1', 'c2', 'c3'];

  if (balloonsField && CONFIG.wishes) {
    const positions = [
      { left:'6%',  top:'40%' }, { left:'24%', top:'10%' }, { left:'44%', top:'30%' },
      { left:'64%', top:'5%'  }, { left:'80%', top:'35%' }, { left:'50%', top:'55%' }
    ];
    CONFIG.wishes.forEach((wish, i) => {
      const b = document.createElement('div');
      const pos = positions[i % positions.length];
      b.className = `balloon ${balloonClasses[i % balloonClasses.length]}`;
      b.style.left = pos.left;
      b.style.top = pos.top;
      b.style.animationDelay = `${(i * 0.4).toFixed(1)}s`;
      b.addEventListener('click', () => {
        if (b.classList.contains('popped')) return;
        b.classList.add('popped');
        revealWish(wish);
      });
      balloonsField.appendChild(b);
    });
  }

  function revealWish(text){
    if (!wishTextEl) return;
    wishTextEl.classList.remove('show');
    setTimeout(() => {
      wishTextEl.textContent = `"${text}"`;
      wishTextEl.classList.add('show');
    }, 150);
  }

  /* ============================================================
     SCÈNE 5 — miroir enchanté (mots doux qui défilent)
     ============================================================ */
  const mirrorTextEl = document.getElementById('mirror-text');
  const mirrorWords = (CONFIG.mirrorWords && CONFIG.mirrorWords.length)
    ? CONFIG.mirrorWords
    : ["Ma princesse, tu es la plus belle chose qui me soit arrivée."];
  let mirrorIndex = 0;

  function showMirrorWord(){
    if (!mirrorTextEl) return;
    mirrorTextEl.classList.remove('show');
    setTimeout(() => {
      mirrorTextEl.textContent = mirrorWords[mirrorIndex];
      mirrorTextEl.classList.add('show');
      mirrorIndex = (mirrorIndex + 1) % mirrorWords.length;
    }, 400);
  }
  showMirrorWord();
  setInterval(showMirrorWord, 4800);

  /* ============================================================
     SCÈNE 6 — porte du seuil
     ============================================================ */
  const doorBtn = document.getElementById('door-btn');
  if (doorBtn) {
    doorBtn.addEventListener('click', () => {
      Scene3D.openDoor();
      doorBtn.disabled = true;
      doorBtn.textContent = 'Elle s\'ouvre…';
      setTimeout(() => {
        document.getElementById('scene-7').scrollIntoView({ behavior:'smooth' });
      }, 1100);
    });
  }

  /* ============================================================
     AUDIO
     ============================================================ */
  const audioBtn = document.getElementById('audio-toggle');
  let audioPlaying = false;
  if (audioBtn && audioEl) {
    audioBtn.addEventListener('click', () => {
      if (audioPlaying) {
        audioEl.pause();
        audioBtn.classList.add('muted');
      } else {
        audioEl.play().catch(() => {});
        audioBtn.classList.remove('muted');
      }
      audioPlaying = !audioPlaying;
    });
    audioBtn.classList.add('muted');
  }

  function updateAudioMood(sceneNumber){
    if (!audioEl || audioEl.paused) return;
    // volume progressif : doux à l'ouverture, plus intense vers la fin
    const vol = 0.35 + (sceneNumber / 7) * 0.6;
    audioEl.volume = Math.min(1, vol);
  }

});
