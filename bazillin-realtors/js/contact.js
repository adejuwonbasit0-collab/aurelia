/* Contact page: validates, then opens WhatsApp with the message ready */
(function () {
  var form = document.getElementById('cform');
  var type = document.getElementById('c-type');
  BZ_CATEGORIES.forEach(function (c) { type.insertAdjacentHTML('beforeend', '<option>' + BZ.esc(c.name) + '</option>'); });

  function setErr(name, msg) {
    var el = form.querySelector('[data-err=' + name + ']'), input = form.elements[name];
    el.textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, bad = null;
    var name = f.name.value.trim(), phone = f.phone.value.replace(/[^\d+]/g, '');
    setErr('name', name ? '' : 'Enter your name so we know who to ask for.');
    setErr('phone', phone.replace(/\D/g, '').length >= 7 ? '' : 'Enter a phone number we can call back.');
    bad = !name ? f.name : (phone.replace(/\D/g, '').length < 7 ? f.phone : null);
    if (bad) { bad.focus(); return; }

    var lines = ['Hello Bazillin Realtors, my name is ' + name + '.', 'I want to: ' + f.intent.value + '.'];
    if (f.type.value) lines.push('Property type: ' + f.type.value + '.');
    if (f.where.value.trim()) lines.push('Area: ' + f.where.value.trim() + '.');
    if (f.budget.value.trim()) lines.push('Budget: ' + f.budget.value.trim() + '.');
    if (f.msg.value.trim()) lines.push(f.msg.value.trim());
    lines.push('My number: ' + f.phone.value.trim());
    var url = BZ.wa(lines.join('\n'));
    var done = document.getElementById('done');
    document.getElementById('done-link').href = url;
    done.hidden = false;
    window.open(url, '_blank', 'noopener');
  });
})();
