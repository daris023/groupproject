document.addEventListener('DOMContentLoaded', function () {
  // year update
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', () => {
    if (!nav) return;
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    }
  });

  // Formspree AJAX submit with reservation handling
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'Sending...';
      const data = new FormData(form);

      // Basic validation: if type reservation, require date/time
      const type = data.get('type');
      if (type === 'reservation') {
        if (!data.get('date') || !data.get('time')) {
          status.textContent = 'Please select date and time for reservation.';
          return;
        }
      }

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          status.textContent = 'Thank you! We received your request. We will contact you shortly.';
        } else {
          response.json().then(json => {
            status.textContent = json.error || 'Oops! There was a problem.';
          }).catch(() => {
            status.textContent = 'Oops! There was a problem.';
          });
        }
      }).catch(() => {
        status.textContent = 'Network error. Please try again later.';
      });
    });
  }

  // small UX: auto-fill today's date if empty
  const dateInput = document.getElementById('date');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
});
