/* TermSecure — Copier les blocs de code au presse-papiers + SSH direct Terminal */

/* ── SSH DIRECT TERMINAL (sans pop-up) ── */
(function () {
    var SSH_HOST = '62.72.37.40';
    var SSH_PORT = '65002';
    var SSH_USER = 'u734339183';
    var SSH_CMD  = 'ssh -p ' + SSH_PORT + ' ' + SSH_USER + '@' + SSH_HOST;
    var SSH_URI  = 'ssh://' + SSH_USER + '@' + SSH_HOST + ':' + SSH_PORT;

    var LAURIE_HOST = 'monitor.o2switch.net';
    var LAURIE_USER = 'gila4947';
    var LAURIE_CMD  = 'ssh ' + LAURIE_USER + '@' + LAURIE_HOST;
    var LAURIE_URI  = 'ssh://' + LAURIE_USER + '@' + LAURIE_HOST;

   /* Au clic sur le bouton SSH Hostinger :
       1. Copie la commande ssh dans le presse-papiers
       2. Ouvre directement l'URI ssh:// → macOS l'envoie au Terminal */
   document.addEventListener('click', function (e) {
         if (e.target.closest('.nav-ssh-btn')) {
                 e.preventDefault();
                 /* Copie la commande SSH dans le presse-papiers */
           navigator.clipboard.writeText(SSH_CMD).catch(function () {});
                 /* Ouvre directement le Terminal via le protocole ssh:// */
           window.location.href = SSH_URI;
         }
         if (e.target.closest('.nav-ssh-laurie-btn')) {
                 e.preventDefault();
                 navigator.clipboard.writeText(LAURIE_CMD).catch(function () {});
                 window.location.href = LAURIE_URI;
         }
   });
}());

/* ── COPIER les blocs de code ── */
document.querySelectorAll('button.copy').forEach(function(btn) {
    btn.addEventListener('click', function() {
          var pre = btn.closest('.code-wrap').querySelector('code');
          var text = pre.innerText
            .replace(/^\$ /gm, '')
            .replace(/^#[^\n]*/gm, function(m) {
                      return '';
            })
            .split('\n')
            .map(function(l) { return l.trim() === '' ? null : l; })
            .filter(Boolean)
            .join('\n');
          navigator.clipboard.writeText(text).then(function() {
                  var orig = btn.textContent;
                  btn.textContent = 'Copié ✓';
                  btn.style.color = '#28cd41';
                  setTimeout(function() { btn.textContent = orig; btn.style.color = ''; }, 1500);
          }).catch(function() {
                  var orig = btn.textContent;
                  btn.textContent = 'Erreur';
                  btn.style.color = '#ff453a';
                  setTimeout(function() { btn.textContent = orig; btn.style.color = ''; }, 1500);
          });
    });
});
