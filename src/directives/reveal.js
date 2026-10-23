// Content stays visible when motion is reduced or observation is unavailable.
const states = new WeakMap();

export default {
  mounted(element, binding) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    element.style.setProperty('--reveal-delay', `${Math.min(Number(binding.value) || 0, 300)}ms`);
    const reveal = () => {
      element.classList.remove('reveal-pending');
      observer.disconnect();
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    const onPreferenceChange = () => {
      if (preference.matches) reveal();
    };

    element.classList.add('reveal-pending');
    observer.observe(element);
    preference.addEventListener('change', onPreferenceChange);
    states.set(element, { observer, preference, onPreferenceChange });
  },
  unmounted(element) {
    const state = states.get(element);
    if (!state) return;
    state.observer.disconnect();
    state.preference.removeEventListener('change', state.onPreferenceChange);
    states.delete(element);
  },
};
