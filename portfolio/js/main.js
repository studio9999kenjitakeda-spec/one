document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     Hero slider — crossfade between 3 images
     ------------------------------------------------------------------ */
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    let current = 0;
    const SLIDE_INTERVAL = 4000;

    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, SLIDE_INTERVAL);
  }

  /* ------------------------------------------------------------------
     Mobile hamburger navigation
     ------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  mobileNavClose?.addEventListener('click', closeMobileNav);

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ------------------------------------------------------------------
     Work detail modal (Graphic / Web Tool)
     — 内容はすべて index.html 内の <dialog class="work-dialog"> に直接
       記述されています。ここではネイティブ <dialog> の開閉のみを扱う
       汎用処理です(テキストを増減しても変更不要)。
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.modalOpen);
    if (!dialog) return;
    trigger.addEventListener('click', () => {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelectorAll('dialog.work-dialog').forEach((dialog) => {
    // 背景(::backdrop)クリックで閉じる
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    // 閉じるボタン
    dialog.querySelector('.modal-close')?.addEventListener('click', () => {
      dialog.close();
    });

    // Escキー・close()呼び出しなど、閉じた後の後処理
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  });

  // Escキーで開いているダイアログを閉じる(ネイティブ挙動の補助)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('dialog.work-dialog[open]').forEach((dialog) => {
      dialog.close();
    });
  });

});
