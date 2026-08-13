const menuButton = document.querySelector('.menu-button');
const manualNav = document.querySelector('.manual-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  manualNav.classList.toggle('open', !isOpen);
});

manualNav?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menuButton?.setAttribute('aria-expanded', 'false');
  manualNav.classList.remove('open');
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(tab) {
  const targetPanelId = tab.getAttribute('aria-controls');

  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== targetPanelId;
  });

  const targetPanel = document.getElementById(targetPanelId);
  requestAnimationFrame(() => {
    targetPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});
