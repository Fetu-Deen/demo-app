// Typing animation for terminal
const cmds = document.querySelectorAll('.cmd[data-text]');

function typeText(el, text, speed = 45) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  for (const cmd of cmds) {
    await new Promise(r => setTimeout(r, 300));
    await typeText(cmd, cmd.dataset.text);
  }
}

// Intersection Observer to trigger terminal when visible
const terminalSection = document.querySelector('.terminal-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runTerminal();
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });
observer.observe(terminalSection);

// Modal
function handleDeploy() {
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Scroll to cards
function scrollToCards() {
  document.getElementById('cards').scrollIntoView({ behavior: 'smooth' });
}

// Card entrance animation via IntersectionObserver
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.2s';
  cardObserver.observe(card);
});