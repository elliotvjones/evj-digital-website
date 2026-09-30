export function initNavDropdowns(): void {
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>('.nav-dropdown'));
  if (dropdowns.length === 0) return;

  const close = (dropdown: HTMLElement) => {
    dropdown.classList.remove('is-open');
    dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
  };

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector<HTMLButtonElement>('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      dropdowns.filter((other) => other !== dropdown).forEach(close);
    });
  });

  document.addEventListener('click', () => dropdowns.forEach(close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dropdowns.forEach(close);
  });
}
