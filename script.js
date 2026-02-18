/* TermSecure — Copier les blocs de code au presse-papiers + SSH Modal */

/* ── SSH MODAL ── */
(function () {
  var SSH_HOST = '62.72.37.40';
  var SSH_PORT = '65002';
  var SSH_USER = 'u734339183';
  var SSH_CMD  = 'ssh -p ' + SSH_PORT + ' ' + SSH_USER + '@' + SSH_HOST;
  var SSH_URI  = 'ssh://' + SSH_USER + '@' + SSH_HOST + ':' + SSH_PORT;

  /* Créer l'overlay */
  var overlay = document.createElement('div');
  overlay.className = 'ssh-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<div class="ssh-modal">' +
      '<div class="ssh-modal-header">' +
        '<div class="ssh-modal-title">' +
          '<span class="ssh-dot"></span>' +
          'Connexion SSH — Hostinger' +
        '</div>' +
        '<button class="ssh-close-btn" aria-label="Fermer">' +
          '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#1d1d1f" stroke-width="1.8" stroke-linecap="round">' +
            '<line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="ssh-field">' +
        '<label>Commande SSH</label>' +
        '<div class="ssh-copy-row">' +
          '<code id="sshCmdVal">' + SSH_CMD + '</code>' +
          '<button data-copy="sshCmdVal">Copier</button>' +
        '</div>' +
      '</div>' +
      '<div class="ssh-key-badge">' +
        '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M7 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>' +
          '<path d="M11 7h8M16 7v3M19 7v3"/>' +
        '</svg>' +
        'Authentification par clé SSH' +
      '</div>' +
      '<a class="ssh-launch-btn" href="' + SSH_URI + '" target="_blank">' +
        '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="2" y="3" width="16" height="14" rx="2"/>' +
          '<polyline points="6 8 9 11 6 14"/><line x1="11" y1="14" x2="15" y2="14"/>' +
        '</svg>' +
        'Ouvrir dans le Terminal' +
      '</a>' +
      '<p class="ssh-hint">La commande est copiée automatiquement · Collez dans votre terminal</p>' +
    '</div>';
  document.body.appendChild(overlay);

  function openModal() {
    overlay.classList.add('open');
    navigator.clipboard.writeText(SSH_CMD).catch(function () {});
  }
  function closeModal() { overlay.classList.remove('open'); }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-ssh-btn')) openModal();
  });
  overlay.querySelector('.ssh-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  overlay.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = document.getElementById(btn.getAttribute('data-copy')).textContent;
      navigator.clipboard.writeText(val).then(function () {
        var orig = btn.textContent;
        btn.textContent = 'Copié ✓';
        btn.style.color = '#28cd41';
        setTimeout(function () { btn.textContent = orig; btn.style.color = ''; }, 1500);
      }).catch(function () {});
    });
  });
}());

/* ── COPIER LES BLOCS DE CODE ── */
document.querySelectorAll('button.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var pre = btn.closest('.code-wrap').querySelector('code');
    var text = pre.innerText
      .replace(/^\$ /gm, '')
      .replace(/^#[^\n]*/gm, function () { return ''; })
      .split('\n')
      .map(function (l) { return l.trim() === '' ? null : l; })
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text).then(function () {
      var orig = btn.textContent;
      btn.textContent = 'Copié ✓';
      btn.style.color = '#28cd41';
      setTimeout(function () { btn.textContent = orig; btn.style.color = ''; }, 1500);
    }).catch(function () {
      var orig = btn.textContent;
      btn.textContent = 'Erreur';
      btn.style.color = '#ff453a';
      setTimeout(function () { btn.textContent = orig; btn.style.color = ''; }, 1500);
    });
  });
});
