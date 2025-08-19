// Weather Card Demo
function weatherDemo() {
  const temps = [27, 28, 29, 25, 30];
  const descs = ['Sunny','Partly Cloudy','Thunderstorms','Dry & Breezy','Monsoon'];
  const hums = [58, 62, 65, 49, 73];
  let idx = Math.floor(Math.random() * temps.length);
  document.getElementById('weather-t').innerText = temps[idx] + "°C";
  document.getElementById('weather-d').innerText = descs[idx];
  document.getElementById('weather-h').innerText = hums[idx] + "%";
  showToast('Weather updated!');
}

// Sensor slider interactivity
document.getElementById('sensor-slider').oninput = function() {
  document.getElementById('sensor-value').innerText = this.value;
  let level = Number(this.value);
  if(level >= 80) showToast('Precision Max: Ultra Accurate');
  else if(level <= 20) showToast('Precision Low: May miss details');
};

// Crop growth simulator
function simulateGrowth() {
  let chance = Math.random();
  let msg = chance > 0.6 ? 'Crop growth optimal! 🎉' : 'Suboptimal growth, try tweaking nutrients 🧪';
  document.getElementById('growth-result').innerText = msg;
  showToast('Simulation complete');
}

// Simple field drawing
const canvas = document.getElementById('fieldcanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
canvas.addEventListener('mousedown',()=>drawing=true);
canvas.addEventListener('mouseup',()=>drawing=false);
canvas.addEventListener('mouseleave',()=>drawing=false);
canvas.addEventListener('mousemove', function(e){
  if(!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 2.8;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#3fa34d";
  ctx.lineTo(e.clientX-rect.left, e.clientY-rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX-rect.left, e.clientY-rect.top);
});
function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  showToast('Map cleared');
}

// Floating radial menu logic
const fab=document.querySelector('.fab');
const radial=document.querySelector('.radial');
const monitorBtn=document.querySelector('.btn-monitor');
const workshopBtn=document.querySelector('.btn-workshop');
const askBtn=document.querySelector('.btn-ask');
const modals=document.querySelectorAll('.modal');
const closes=document.querySelectorAll('.close');
fab.addEventListener('click',()=>radial.classList.toggle('open'));
monitorBtn.addEventListener('click',()=>openModal('modal-monitor'));
workshopBtn.addEventListener('click',()=>openModal('modal-workshop'));
askBtn.addEventListener('click',()=>openModal('modal-ask'));
closes.forEach(c=>c.addEventListener('click',closeModal));
window.addEventListener('keydown',e=>e.key==='Escape'&&closeModal());
function openModal(id){
  document.getElementById(id).classList.add('active');
  radial.classList.remove('open');
}
function closeModal(){
  modals.forEach(m=>m.classList.remove('active'));
}

// Register toast notifications
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('active');
  setTimeout(()=>t.classList.remove('active'),1750);
}

// Workshop form
document.getElementById('workshop-form').onsubmit = function(e){
  e.preventDefault();
  closeModal();
  showToast("Workshop registered! Details sent on email.");
};

// Live Q&A Drawer
const qaDrawer = document.getElementById('qa-drawer');
function openDrawer(){ qaDrawer.classList.add('open'); }
function closeDrawer(){ qaDrawer.classList.remove('open'); }
window.addEventListener('keydown',e=>e.key==='Escape'&&closeDrawer());
let qaSubmit = document.getElementById('qa-submit');
let qaInput = document.getElementById('qa-input');
let qaLog = document.getElementById('qa-log');
qaSubmit.onclick = function() {
  if(!qaInput.value.trim()) return;
  let div = document.createElement('div');
  div.style.marginBottom = '.3em';
  div.textContent = "You: " + qaInput.value;
  qaLog.appendChild(div);
  setTimeout(()=>{
    let reply = document.createElement('div');
    reply.style.marginBottom = '.2em';
    reply.style.color='var(--accent)';
    reply.textContent = "Expert: We’ll reply soon! (Demo)";
    qaLog.appendChild(reply);
  },600);
  qaInput.value = '';
  showToast('Question submitted!');
};

// Scrubber progress
const scrubber=document.getElementById('scrubber');
window.addEventListener('scroll',()=>{
  const scrolled=window.scrollY;
  const height=document.body.scrollHeight-window.innerHeight;
  scrubber.style.width=`${(scrolled/height)*100}%`;
});
