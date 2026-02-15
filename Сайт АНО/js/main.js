/**
 * АНО "Академия Молодых Лидеров" - Основной JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initEcosystemDiagram();
  initEventsCarousel();
});

// Мобильное меню
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = 0;
    nav.style.right = 0;
    nav.style.background = 'white';
    nav.style.padding = '24px';
    nav.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
  });
}

// Интерактивная круговая схема экосистемы
function initEcosystemDiagram() {
  const diagram = document.querySelector('.ecosystem-diagram');
  if (!diagram) return;

  const directions = [
    { id: 'center-kompetentsiy', angle: 0, label: 'Центр компетенций', icon: 'school' },
    { id: 'career-hub', angle: 45, label: 'Карьерный хаб', icon: 'work' },
    { id: 'it-master', angle: 90, label: 'IT-мастерская', icon: 'code' },
    { id: 'zhurnal', angle: 135, label: 'Журнал «Мой Нижний»', icon: 'article' },
    { id: 'tvoy-brend', angle: 180, label: 'Твой Бренд', icon: 'shopping_bag' },
    { id: 'laboratoriya-grantov', angle: 225, label: 'Лаборатория грантов', icon: 'request_quote' },
    { id: 'event-marketing', angle: 270, label: 'Центр событийного маркетинга', icon: 'event' },
    { id: 'sport', angle: 315, label: 'Спорт', icon: 'sports' }
  ];

  const center = diagram.querySelector('.ecosystem-center');
  const container = diagram.querySelector('.ecosystem-items') || document.createElement('div');
  if (!container.classList.contains('ecosystem-items')) {
    container.className = 'ecosystem-items';
    diagram.appendChild(container);
  }
  container.innerHTML = '';

  const radius = 42; // процент от центра
  const size = diagram.offsetWidth || 400;

  directions.forEach((d, i) => {
    const rad = (d.angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);

    const item = document.createElement('a');
    item.href = `directions/${d.id}.html`;
    item.className = 'ecosystem-item';
    item.style.left = `${x}%`;
    item.style.top = `${y}%`;
    item.style.transform = 'translate(-50%, -50%)';
    item.setAttribute('data-tooltip', d.label);
    item.innerHTML = `
      <span class="ecosystem-item-icon material-symbols-outlined">${d.icon}</span>
      <span>${d.label.split(' ')[0]}</span>
    `;

    item.addEventListener('mouseenter', () => {
      item.title = d.label;
    });

    container.appendChild(item);
  });
}

// Карусель мероприятий (простая версия с прокруткой)
function initEventsCarousel() {
  const carousel = document.querySelector('.events-carousel');
  if (!carousel) return;

  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const track = carousel.querySelector('.events-grid');

  if (prevBtn && nextBtn && track) {
    let scrollAmount = 0;
    const scrollStep = 320;

    nextBtn.addEventListener('click', () => {
      scrollAmount = Math.min(scrollAmount + scrollStep, track.scrollWidth - track.clientWidth);
      track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - scrollStep, 0);
      track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}
