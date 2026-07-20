const loginView = document.getElementById('login-view');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const welcomeModal = document.getElementById('welcome-modal');
const enterPortal = document.getElementById('enter-portal');
const loadingView = document.getElementById('loading-view');
const portalView = document.getElementById('portal-view');
const progressBar = document.getElementById('progress-bar');
const loadingTitle = document.getElementById('loading-title');
const terminalLines = document.getElementById('terminal-lines');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const identifiant = document.getElementById('identifiant').value.trim().toUpperCase();
  const password = document.getElementById('password').value.trim().toUpperCase();

  if (identifiant !== 'JQ-0731') {
    loginMessage.textContent = 'Identifiant non reconnu.';
    return;
  }

  if (password !== 'JQTV') {
    loginMessage.textContent = 'Clé d’accès incorrecte.';
    return;
  }

  loginMessage.textContent = 'Authentification en cours…';
  setTimeout(() => {
    welcomeModal.hidden = false;
    loginMessage.textContent = '';
  }, 700);
});

enterPortal.addEventListener('click', () => {
  welcomeModal.hidden = true;
  loginView.hidden = true;
  loadingView.hidden = false;
  runLoadingSequence();
});

function runLoadingSequence() {
  const steps = [
    ['Connexion au serveur BME-PARIS-07', 18],
    ['Vérification de l’identité JQ-0731', 36],
    ['Déchiffrement AES-256', 58],
    ['Synchronisation du dossier', 79],
    ['Validation du niveau d’accès', 93],
    ['ACCÈS AUTORISÉ', 100]
  ];

  terminalLines.innerHTML = '';
  progressBar.style.width = '0%';

  steps.forEach((step, index) => {
    setTimeout(() => {
      const [text, percent] = step;
      loadingTitle.textContent = text;
      progressBar.style.width = `${percent}%`;
      const line = document.createElement('div');
      line.textContent = `> ${text} ... OK`;
      terminalLines.appendChild(line);

      if (index === steps.length - 1) {
        setTimeout(() => {
          loadingView.hidden = true;
          portalView.hidden = false;
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 650);
      }
    }, index * 620);
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.toggle('active-section', section.id === sectionId);
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  if (window.innerWidth < 900) {
    window.scrollTo({ top: 72, behavior: 'smooth' });
  }
}

document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.section));
});

document.querySelectorAll('.jump-btn').forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.target));
});
