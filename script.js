/* Radial menu logic */
const fab = document.querySelector('.fab');
const radial = document.querySelector('.radial');
const monitorBtn = document.querySelector('.btn-monitor');
const workshopBtn = document.querySelector('.btn-workshop');
const askBtn = document.querySelector('.btn-ask');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

fab.addEventListener('click', () => radial.classList.toggle('open'));
monitorBtn.addEventListener('click', () => openModal('modal-monitor'));
workshopBtn.addEventListener('click', () => openModal('modal-workshop'));
askBtn.addEventListener('click', () => openModal('modal-ask'));
closes.forEach(c => c.addEventListener('click', closeModal));
window.addEventListener('keydown', e => e.key === 'Escape' && closeModal());

function openModal(id) {
  document.getElementById(id).classList.add('active');
  radial.classList.remove('open');
}
function closeModal() {
  modals.forEach(m => m.classList.remove('active'));
}

/* Scroll scrubber */
const scrubber = document.getElementById('scrubber');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  scrubber.style.width = `${(scrolled / height) * 100}%`;
});
