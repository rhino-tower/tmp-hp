document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav__close');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => mobileNav.classList.add('on'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('on'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('on')));
  }

  // Shell uptime
  const uptimeEl = document.getElementById('shell-uptime');
  if (uptimeEl) {
    const start = Date.now();
    setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, '0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const sec = String(s % 60).padStart(2, '0');
      uptimeEl.textContent = `${h}h ${m}m ${sec}s`;
    }, 1000);
  }

  // Current date in shell
  const dateEl = document.getElementById('shell-date');
  if (dateEl) {
    const now = new Date();
    const y = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    dateEl.textContent = `JST ${y}.${mo}.${d}`;
  }

  // Contact form (terminal style)
  const termForm = document.getElementById('termForm');
  if (termForm) {
    const btn = document.getElementById('termSubmit');
    const st = document.getElementById('termStatus');
    termForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!termForm.checkValidity()) {
        st.innerHTML = '<span class="err">[ ERR ]</span> 必須項目が未入力です';
        return;
      }
      btn.disabled = true;
      const steps = [
        '> validating input.......... [  OK  ]',
        '> encrypting payload........ [  OK  ]',
        '> transmitting to server.... [  OK  ]',
      ];
      st.innerHTML = '';
      for (const s of steps) {
        await new Promise(r => setTimeout(r, 420));
        st.innerHTML += s.replace('[  OK  ]', '<span class="ok">[  OK  ]</span>') + '<br>';
      }
      await new Promise(r => setTimeout(r, 300));
      st.innerHTML += '<span class="ok">&gt; message sent.</span> 24時間以内にご返信します。';
      termForm.reset();
      setTimeout(() => { btn.disabled = false; }, 2000);
    });
  }
});
