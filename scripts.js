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

// Форма: сохранение заявок в localStorage
const form = document.getElementById('contact-form');
const statusEl = document.querySelector('.form__status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!statusEl) return;

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Создаем объект заявки
    const submission = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Получаем существующие заявки из localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
    
    // Добавляем новую заявку
    existingSubmissions.push(submission);
    
    // Сохраняем обратно в localStorage
    localStorage.setItem('portfolio_submissions', JSON.stringify(existingSubmissions));

    statusEl.textContent = 'Спасибо! Ваше сообщение сохранено.';
    statusEl.style.color = 'var(--accent)';
    form.reset();

    // Очищаем сообщение через 5 секунд
    setTimeout(() => {
      statusEl.textContent = '';
    }, 5000);
  });
}

// Секретная админка: 5 кликов по аватару
let clickCount = 0;
let clickTimeout = null;
const ADMIN_PASSWORD = 'abc123';
const avatar = document.querySelector('#admin-trigger');

if (avatar) {
  avatar.style.cursor = 'pointer';
  avatar.addEventListener('click', () => {
    clickCount++;
    
    // Сбрасываем счетчик через 3 секунды бездействия
    if (clickTimeout) clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
      clickCount = 0;
    }, 3000);

    // Если 5 кликов подряд - открываем модальное окно с паролем
    if (clickCount >= 5) {
      clickCount = 0;
      openPasswordModal();
    }
  });
}

// Модальные окна
const passwordModal = document.getElementById('password-modal');
const submissionsModal = document.getElementById('submissions-modal');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordStatus = document.getElementById('password-status');
const submissionsList = document.getElementById('submissions-list');

function openPasswordModal() {
  if (passwordModal) {
    passwordModal.setAttribute('aria-hidden', 'false');
    passwordInput?.focus();
  }
}

function closePasswordModal() {
  if (passwordModal) {
    passwordModal.setAttribute('aria-hidden', 'true');
    passwordForm?.reset();
    if (passwordStatus) passwordStatus.textContent = '';
  }
}

function openSubmissionsModal() {
  if (submissionsModal) {
    submissionsModal.setAttribute('aria-hidden', 'false');
    loadSubmissions();
  }
}

function closeSubmissionsModal() {
  if (submissionsModal) {
    submissionsModal.setAttribute('aria-hidden', 'true');
  }
}

// Обработка формы пароля
if (passwordForm) {
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passwordInput.value.trim();
    
    if (password === ADMIN_PASSWORD) {
      closePasswordModal();
      openSubmissionsModal();
    } else {
      if (passwordStatus) {
        passwordStatus.textContent = 'Неверный пароль. Попробуйте ещё раз.';
        passwordStatus.style.color = 'var(--primary)';
      }
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
}

// Загрузка заявок из localStorage
function loadSubmissions() {
  if (!submissionsList) return;
  
  const submissions = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
  
  if (submissions.length === 0) {
    submissionsList.innerHTML = '<p class="form__status">Заявок пока нет.</p>';
    return;
  }

  // Сортируем по дате (новые сверху)
  submissions.sort((a, b) => b.timestamp - a.timestamp);

  submissionsList.innerHTML = `
    <div class="submissions-header">
      <p>Всего заявок: <strong>${submissions.length}</strong></p>
      <button class="btn btn--sm btn--ghost" id="clear-submissions">Очистить все</button>
    </div>
    <div class="submissions-grid">
      ${submissions.map(sub => `
        <article class="submission-card">
          <header class="submission-card__header">
            <div>
              <h4 class="h4">${escapeHtml(sub.name)}</h4>
              <p class="submission-card__email">${escapeHtml(sub.email)}</p>
            </div>
            <time class="submission-card__date">${formatDate(sub.date)}</time>
          </header>
          <p class="submission-card__message">${escapeHtml(sub.message)}</p>
          <button class="btn btn--sm btn--ghost submission-delete" data-id="${sub.id}">Удалить</button>
        </article>
      `).join('')}
    </div>
  `;

  // Обработчики удаления
  document.querySelectorAll('.submission-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      deleteSubmission(id);
    });
  });

  // Обработчик очистки всех заявок
  const clearBtn = document.getElementById('clear-submissions');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите удалить все заявки?')) {
        localStorage.removeItem('portfolio_submissions');
        loadSubmissions();
      }
    });
  }
}

function deleteSubmission(id) {
  const submissions = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
  const filtered = submissions.filter(sub => sub.id !== id);
  localStorage.setItem('portfolio_submissions', JSON.stringify(filtered));
  loadSubmissions();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Закрытие модальных окон
document.querySelectorAll('.modal__close, .modal__overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target.closest('.modal__close')) {
      closePasswordModal();
      closeSubmissionsModal();
    }
  });
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePasswordModal();
    closeSubmissionsModal();
  }
});

// To top button
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  const show = window.scrollY > 600;
  toTop.classList.toggle('show', show);
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

