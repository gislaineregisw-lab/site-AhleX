const revealItems = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const formWrappers = document.querySelectorAll('[data-form-wrapper]');

formWrappers.forEach((wrapper) => {
  const form = wrapper.querySelector('[data-contact-form]');
  const success = wrapper.querySelector('[data-form-success]');

  if (!form || !success) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is-hidden');
    success.hidden = false;
    success.classList.add('is-visible');
    success.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  });
});
