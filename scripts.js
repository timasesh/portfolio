// Theme persistence
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  }
  const switchBtn = document.querySelector('.theme-switch');
  if (switchBtn) switchBtn.setAttribute('aria-checked', String(document.documentElement.classList.contains('light')));
  updateThemeLabel();
})();

// Theme toggle
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.theme-switch');
  if (!btn) return;
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  btn.setAttribute('aria-checked', String(isLight));
  updateThemeLabel();
});

function updateThemeLabel() {
  const label = document.querySelector('.theme-text');
  if (!label) return;
  const isLight = document.documentElement.classList.contains('light');
  label.textContent = isLight ? 'Светлая' : 'Тёмная';
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
  navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal on scroll for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Expandable project details
function toggleProjectDetails(button) {
  const targetId = button.getAttribute('data-target');
  const details = document.getElementById(targetId);
  if (!details) return;
  const isHidden = details.hasAttribute('hidden');
  if (isHidden) {
    details.removeAttribute('hidden');
    // Measure content to set max-height for animation
    details.classList.add('open');
    details.style.maxHeight = details.scrollHeight + 'px';
    button.textContent = 'Свернуть';
  } else {
    details.style.maxHeight = details.scrollHeight + 'px';
    requestAnimationFrame(() => {
      details.style.maxHeight = '0px';
      details.classList.remove('open');
    });
    button.textContent = 'Подробнее';
    // After animation, hide to remove from tab order
    setTimeout(() => details.setAttribute('hidden', ''), 400);
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.project-toggle');
  if (btn) {
    e.preventDefault();
    openProjectDrawer(btn.getAttribute('data-project'));
  }
});

// Project drawer data
const projectData = {
  study: {
    title: 'Study Task — онлайн‑школа IT‑направлений',
    meta: 'Стек: Django, MySQL, HTML/CSS, Bootstrap · Роль: Fullstack',
    images: [
      'images/study-task-2.png',
      'images/study-task-3.png',
      'images/study-task-4.png',
      'images/study-task-5.png',
      'images/study-task-6.png'
    ],
    html: `
      <p>Study Task — собственная платформа для изучения IT‑дисциплин: курсы, модули, уроки, квизы, отслеживание прогресса.</p>
      <ul>
        <li><b>Система курсов:</b> создание, управление, уникальные коды для доступа.</li>
        <li><b>Модули и уроки:</b> видео и PDF‑материалы, открепление без удаления.</li>
        <li><b>Квизы:</b> вопросы с 4 вариантами, привязка к модулям, попытка 1 раз, сохранение результата.</li>
        <li><b>Страница студента:</b> доступ к курсам/модулям, просмотр видео, скачивание PDF, прохождение квизов.</li>
        <li><b>Админ:</b> добавление и редактирование курсов/модулей/уроков/квизов, управление связями.</li>
        <li><b>Парсинг и загрузка:</b> импорт из CSV/Word, ссылки на видео и PDF с удалённых дисков.</li>
      </ul>
      <p><b>Ценность:</b> демонстрирует умение создать полноценный образовательный сервис с нуля: от БД до интерфейсов ролей (админ/студент).</p>
    `
  },
  adaptation: {
    title: 'Adaptation — внутренний сайт для AlmaU',
    meta: 'Стек: Django, MySQL, HTML/CSS/JS, Bootstrap · Роль: Fullstack',
    images: [
      'images/adaptation-2.png',
      'images/adaptation-3.png',
      'images/adaptation-4.png'
    ],
    html: `
      <p>Портал для адаптации новых сотрудников AlmaU: быстрее влиться в процессы, инструкции и материалы по ролям, доступ к общим сервисам.</p>
      <ul>
        <li><b>Главная:</b> приветствие, выбор языка (RU/KZ/EN), тёмная/светлая тема.</li>
        <li><b>Памятка сотрудника:</b> выбор роли (ППС, HR, IT, бухгалтер, топ‑менеджер), контент по роли, доступ к сервисам (AlmaUni, Booking, Rent, QEvent, Documentolog).</li>
        <li><b>Об университете:</b> история, миссия, ценности, структура.</li>
        <li><b>Нормативка:</b> устав, политика безопасности, регламенты, шаблоны.</li>
        <li><b>3D‑тур:</b> интеграция интерактивного тура через iframe.</li>
        <li><b>FAQ:</b> поиск и фильтрация по тегам.</li>
        <li><b>Обратная связь:</b> форма предложений.</li>
      </ul>
      <p><b>Технически:</b> мультиязычность, авторизация Google/Microsoft, админ‑панель HR/IT, разграничение доступа, адаптивная вёрстка.</p>
      <p><b>Результат:</b> прототип внутреннего портала с удобной структурой и современным UI/UX.</p>
    `
  },
  infokaz: {
    title: 'Info‑Kaz — новостной сайт',
    meta: 'Стек: Django, MySQL, Bootstrap · Роль: Fullstack',
    images: [
      'images/info-kaz-2.png',
      'images/info-kaz-3.png',
      'images/info-kaz-4.png'
    ],
    html: `
      <p>Новостной портал с публикацией статей, категориями и простой админкой. Реализованы список, деталка, категории.</p>
    `
  },
  detective: {
    title: 'Детективная игра — Concept & Prototype (UE5)',
    meta: 'UE5, Blueprints, C++ (план), Photoshop/Figma (UI), GitHub · Роль: Game Designer & Developer',
    images: [
      'images/game-2.png',
      'images/game-3.png',
      'images/game-4.png',
      'images/game-5.png'
    ],
    html: `
      <p>Детективная игра в жанре mystery/thriller: игрок исследует окружение, собирает улики и влияет на сюжет выборами.</p>
      <ul>
        <li><b>Исследование:</b> перемещение по уровням, поиск подсказок, интеракции с объектами.</li>
        <li><b>Улики и инвентарь:</b> новые возможности (допросы, доступ к локациям).</li>
        <li><b>Диалоги:</b> реакция NPC на выборы игрока.</li>
        <li><b>Нелинейность:</b> разные концовки в зависимости от решений.</li>
      </ul>
      <p><b>Атмосфера:</b> тёмный нуар, вдохновение L.A. Noire, Heavy Rain. Идея: каждое действие имеет последствия.</p>
      <p><b>Прототип:</b> управление персонажем, логика дверей, простые диалоги, проверка улик → доступ к сцене, наработки сюжета.</p>
      <p><b>Ценность:</b> демонстрирует геймдизайн, работу с UE4/Blueprints, сюжет и прототипирование.</p>
    `
  }
};

const drawer = document.querySelector('.project-drawer');
const drawerTitle = document.querySelector('.project-drawer__title');
const drawerMeta = document.querySelector('.project-drawer__meta');
const drawerGallery = document.querySelector('.project-drawer__gallery');
const drawerText = document.querySelector('.project-drawer__text');
const drawerClose = document.querySelector('.project-drawer__close');

function openProjectDrawer(key) {
  const data = projectData[key];
  if (!data || !drawer) return;
  drawerTitle.textContent = data.title;
  drawerMeta.textContent = data.meta;
  // Render slider gallery
  drawerGallery.innerHTML = `
    <div class="gallery" data-key="${key}">
      <div class="gallery__viewport">
        <div class="gallery__track">
          ${data.images.map(src => `<div class="gallery__slide"><img src="${src}" alt=""></div>`).join('')}
        </div>
        <button class="gallery__btn gallery__btn--prev" type="button" aria-label="Предыдущий">‹</button>
        <button class="gallery__btn gallery__btn--next" type="button" aria-label="Следующий">›</button>
      </div>
      <div class="gallery__dots">
        ${data.images.map((_, i) => `<button class="gallery__dot${i===0?' is-active':''}" data-index="${i}" aria-label="Слайд ${i+1}"></button>`).join('')}
      </div>
    </div>
  `;
  drawerText.innerHTML = data.html;
  drawer.setAttribute('aria-hidden', 'false');
  drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  initGallery(drawerGallery.querySelector('.gallery'));
}

function closeProjectDrawer() {
  if (!drawer) return;
  drawer.setAttribute('aria-hidden', 'true');
}

drawerClose?.addEventListener('click', closeProjectDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectDrawer();
});

// Simple gallery (slider)
function initGallery(root) {
  if (!root) return;
  const track = root.querySelector('.gallery__track');
  const slides = Array.from(root.querySelectorAll('.gallery__slide'));
  const prev = root.querySelector('.gallery__btn--prev');
  const next = root.querySelector('.gallery__btn--next');
  const dots = Array.from(root.querySelectorAll('.gallery__dot'));
  let index = 0;

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.getAttribute('data-index')))));

  // Swipe support
  let startX = 0; let dx = 0; let dragging = false;
  root.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.gallery__btn')) return; // don't hijack button clicks
    dragging = true; startX = e.clientX; root.setPointerCapture(e.pointerId);
  });
  root.addEventListener('pointermove', (e) => {
    if (!dragging) return; dx = e.clientX - startX; track.style.transform = `translateX(calc(${-index*100}% + ${dx}px))`;
  });
  root.addEventListener('pointerup', () => {
    if (!dragging) return; dragging = false;
    if (Math.abs(dx) > 50) { dx < 0 ? go(index + 1) : go(index - 1); } else { update(); }
    dx = 0;
  });

  update();
}

// Stats counter
function animateCount(el) {
  const target = Number(el.getAttribute('data-count')) || 0;
  const duration = 900;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = String(value);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const stats = document.querySelectorAll('.stat__num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
stats.forEach((el) => statsObserver.observe(el));

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());

// Form demo
const form = document.querySelector('.form');
const statusEl = document.querySelector('.form__status');
if (form) {
  form.addEventListener('submit', () => {
    if (!statusEl) return;
    statusEl.textContent = 'Отправка...';
    setTimeout(() => {
      statusEl.textContent = 'Спасибо! Сообщение отправлено (демо).';
      form.reset();
    }, 700);
  });
}

// To top button
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  const show = window.scrollY > 600;
  toTop.classList.toggle('show', show);
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

