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

    // SSGform はブラウザの fetch では CORS でブロックされるため、
    // 隠し iframe をターゲットにした通常の form POST で送信する
    termForm.action = 'https://ssgform.com/s/QMmAZFKXepx2';
    termForm.method = 'post';
    const iframe = document.createElement('iframe');
    iframe.name = 'ssgform-target';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    termForm.target = 'ssgform-target';

    termForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!termForm.checkValidity()) {
        st.innerHTML = '<span class="err">[ ERR ]</span> 必須項目が未入力です';
        return;
      }
      btn.disabled = true;
      st.innerHTML = '';

      const animSteps = [
        '> validating input.......... [  OK  ]',
        '> encrypting payload........ [  OK  ]',
        '> transmitting to server....',
      ];
      for (let i = 0; i < animSteps.length - 1; i++) {
        await new Promise(r => setTimeout(r, 420));
        st.innerHTML += animSteps[i].replace('[  OK  ]', '<span class="ok">[  OK  ]</span>') + '<br>';
      }
      await new Promise(r => setTimeout(r, 420));
      st.innerHTML += animSteps[animSteps.length - 1];

      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), 10000);
        iframe.onload = () => { clearTimeout(timer); resolve(); };
        termForm.submit();
      }).then(() => {
        st.innerHTML += ' <span class="ok">[  OK  ]</span><br>';
        st.innerHTML += '<span class="ok">&gt; message sent.</span> 24時間以内にご返信します。';
        termForm.reset();
      }).catch(() => {
        st.innerHTML += ' <span class="err">[ ERR ]</span><br>';
        st.innerHTML += '<span class="err">&gt; 送信に失敗しました。</span> 時間をおいて再度お試しください。';
      });

      setTimeout(() => { btn.disabled = false; }, 2000);
    });
  }
});
