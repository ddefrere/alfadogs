document.addEventListener('DOMContentLoaded', () => {
  const introSplash = document.querySelector('.intro-splash');

  if (introSplash) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finishIntro = () => {
      introSplash.classList.add('is-hidden');
      document.body.classList.remove('intro-active');
      window.setTimeout(() => introSplash.remove(), prefersReducedMotion ? 0 : 1000);
    };

    if (prefersReducedMotion) {
      finishIntro();
    } else {
      window.addEventListener('load', () => {
        window.setTimeout(finishIntro, 1800);
      });

      window.setTimeout(finishIntro, 3500);
    }
  }

  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const hero = document.querySelector('.hero, .page-hero');
    const syncHeader = () => {
      if (!hero) {
        siteHeader.classList.add('is-solid');
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom;
      const headerBottom = siteHeader.getBoundingClientRect().bottom;
      siteHeader.classList.toggle('is-solid', heroBottom < headerBottom - 4);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
    window.addEventListener('resize', syncHeader);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navOverlay = document.querySelector('.nav-overlay');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navOverlay.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navOverlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    let sending = false;

    const ajaxEndpoint = (action) => {
      const url = new URL(action, window.location.href);
      if (url.hostname === 'formsubmit.co' && !url.pathname.startsWith('/ajax/')) {
        url.pathname = `/ajax${url.pathname}`;
      }
      return url.toString();
    };

    const setStatus = (message, state) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('is-success', state === 'success');
      status.classList.toggle('is-error', state === 'error');
    };

    const flagAccepted = (value) => value === true || value === 'true';

    // FormSubmit answers a delivered submission with HTTP 200 and a JSON body,
    // but labels that body text/html. success is the string "true"; a refusal
    // is also HTTP 200, with success "false".
    const submissionDelivered = (response, text) => {
      if (!response.ok) return false;
      const trimmed = text.trim();
      let payload = null;
      if (trimmed.startsWith('{')) {
        try {
          payload = JSON.parse(trimmed);
        } catch {
          payload = null;
        }
      }
      if (payload && typeof payload === 'object') {
        if (Object.prototype.hasOwnProperty.call(payload, 'success')) {
          return flagAccepted(payload.success);
        }
        if (Object.prototype.hasOwnProperty.call(payload, 'ok')) {
          return flagAccepted(payload.ok);
        }
        return /submitted successfully/i.test(String(payload.message || ''));
      }
      if (/needs activation|unable to submit|something went wrong|not formatted correctly|form should post/i.test(trimmed)) {
        return false;
      }
      return /thank you|submitted successfully/i.test(trimmed);
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (sending) return;
      if (!contactForm.reportValidity()) return;

      const data = Object.fromEntries(new FormData(contactForm).entries());
      if (String(data._honey || '').trim() !== '') return;
      delete data._honey;
      if (data.email) data._replyto = data.email;

      sending = true;
      btn.disabled = true;
      btn.textContent = 'Bezig met verzenden…';
      setStatus('', '');

      try {
        const response = await fetch(ajaxEndpoint(contactForm.action), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        });
        const body = await response.text();
        if (!submissionDelivered(response, body)) {
          throw new Error('Verzenden mislukt.');
        }
        contactForm.reset();
        setStatus('Bericht verzonden! We nemen zo snel mogelijk contact met je op.', 'success');
      } catch (err) {
        setStatus('Het bericht kon niet worden verzonden. Probeer het opnieuw, of mail ons via alfadogsbmb@gmail.com.', 'error');
      } finally {
        sending = false;
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }
});
