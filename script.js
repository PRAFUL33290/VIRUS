/* TermSecure — Copier les blocs de code au presse-papiers */
document.querySelectorAll('button.copy').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var pre = btn.closest('.code-wrap').querySelector('code');
    var text = pre.innerText
      .replace(/^\$ /gm, '')
      .replace(/^#[^\n]*/gm, function(m) {
        // garder les commentaires inline (après du code), retirer les lignes commentaires seules
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
