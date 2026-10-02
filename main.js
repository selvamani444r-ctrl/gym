/* â”€â”€ CUSTOM CURSOR â”€â”€ */
(function(){
  const cursor=document.getElementById('cursor'),follower=document.getElementById('cursor-follower'),glow=document.getElementById('mouse-glow');
  let mx=0,my=0,fx=0,fy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';glow.style.left=mx+'px';glow.style.top=my+'px';});
  (function af(){fx+=(mx-fx)*0.12;fy+=(my-fy)*0.12;follower.style.left=fx+'px';follower.style.top=fy+'px';requestAnimationFrame(af);})();
  document.querySelectorAll('a,button,.btn,.workout-flip-card,.gallery-item,.trainer-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2.5)';follower.style.transform='translate(-50%,-50%) scale(1.5)';});
    el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';follower.style.transform='translate(-50%,-50%) scale(1)';});
  });
})();

/* â”€â”€ SCROLL: PROGRESS + NAVBAR + BACK-TO-TOP + STATS â”€â”€ */
const statsSection=document.getElementById('statistics');let statsCounted=false;
window.addEventListener('scroll',()=>{
  const s=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('scroll-progress').style.width=(s/h*100)+'%';
  document.getElementById('navbar').classList.toggle('scrolled',s>60);
  document.getElementById('back-to-top').classList.toggle('visible',s>400);
  if(!statsCounted&&statsSection){const r=statsSection.getBoundingClientRect();if(r.top<window.innerHeight-100){statsCounted=true;animateCounters('.counter-big');}}
});

/* â”€â”€ HAMBURGER â”€â”€ */
(function(){
  const ham=document.getElementById('hamburger'),mnav=document.getElementById('mobile-nav');
  ham.addEventListener('click',()=>{ham.classList.toggle('active');mnav.classList.toggle('open');});
  document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{ham.classList.remove('active');mnav.classList.remove('open');}));
})();

/* â”€â”€ TYPING EFFECT â”€â”€ */
(function(){
  const el=document.getElementById('hero-typing'),phrases=['Transform Your Body.','Unleash Your Strength.','Redefine Your Limits.','Become Unstoppable.'];
  let pi=0,ci=0,del=false;
  function type(){const p=phrases[pi];if(!del){el.textContent=p.slice(0,ci+1);ci++;if(ci===p.length){del=true;setTimeout(type,1800);return;}}else{el.textContent=p.slice(0,ci-1);ci--;if(ci===0){del=false;pi=(pi+1)%phrases.length;}}setTimeout(type,del?50:90);}
  setTimeout(type,600);
})();

/* â”€â”€ HERO CANVAS PARTICLES â”€â”€ */
(function(){
  const canvas=document.getElementById('hero-canvas'),ctx=canvas.getContext('2d');
  function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  class P{constructor(){this.reset();}reset(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.r=1+Math.random()*2.5;this.vx=(Math.random()-.5)*.4;this.vy=-.3-Math.random()*.5;this.a=0;this.ta=.2+Math.random()*.6;this.da=.005+Math.random()*.005;this.fade='in';}draw(){if(this.fade==='in'){this.a+=this.da;if(this.a>=this.ta)this.fade='out';}else{this.a-=this.da;if(this.a<=0){this.reset();return;}}this.x+=this.vx;this.y+=this.vy;ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(229,9,20,${this.a})`;ctx.fill();}}
  const particles=[];for(let i=0;i<80;i++)particles.push(new P());
  (function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>p.draw());requestAnimationFrame(animate);})();
})();

/* â”€â”€ COUNTERS â”€â”€ */
function animateCounters(sel){document.querySelectorAll(sel).forEach(el=>{const target=parseInt(el.getAttribute('data-target')),step=target/(1800/16);let cur=0;(function u(){cur=Math.min(cur+step,target);el.textContent=Math.floor(cur).toLocaleString('en-IN');if(cur<target)requestAnimationFrame(u);})();});}
window.addEventListener('load',()=>animateCounters('.counter'));

/* â”€â”€ BMI CALCULATOR â”€â”€ */
let bmiGender='male';
function setGender(g){bmiGender=g;document.getElementById('btn-male').classList.toggle('active',g==='male');document.getElementById('btn-female').classList.toggle('active',g==='female');}
function calculateBMI(){
  const h=parseFloat(document.getElementById('bmi-height').value),w=parseFloat(document.getElementById('bmi-weight').value);
  if(!h||!w||h<50||w<10){alert('Please enter valid values.');return;}
  const hm=h/100,bmi=(w/(hm*hm)).toFixed(1);
  const circle=document.getElementById('bmi-circle'),valEl=document.getElementById('bmi-value'),statEl=document.getElementById('bmi-status'),suggEl=document.getElementById('bmi-suggestion');
  valEl.textContent=bmi;
  let color,status,suggestion;
  if(bmi<18.5){color='#60a5fa';status='UNDERWEIGHT';suggestion='You are underweight. Focus on calorie-dense nutritious foods and strength training to build muscle mass.';}
  else if(bmi<25){color='#4ade80';status='NORMAL';suggestion='Great! Your BMI is in the healthy range. Maintain this with regular exercise and balanced nutrition.';}
  else if(bmi<30){color='#fbbf24';status='OVERWEIGHT';suggestion='Slightly overweight. A combo of cardio, strength training, and calorie control will help!';}
  else{color='#FF2B2B';status='OBESE';suggestion='With professional guidance you can transform! Our certified trainers specialize in safe weight loss programs.';}
  circle.style.borderColor=color;circle.style.boxShadow=`0 0 30px ${color}55`;statEl.style.color=color;statEl.textContent=status;suggEl.textContent=suggestion;
}

/* â”€â”€ CALORIES CALCULATOR â”€â”€ */
let calGender='male';
function setCalGender(g){calGender=g;document.getElementById('cal-btn-male').classList.toggle('active',g==='male');document.getElementById('cal-btn-female').classList.toggle('active',g==='female');}
function calculateCalories(){
  const age=parseFloat(document.getElementById('cal-age').value),h=parseFloat(document.getElementById('cal-height').value),w=parseFloat(document.getElementById('cal-weight').value),act=parseFloat(document.getElementById('cal-activity').value),goal=document.getElementById('cal-goal').value;
  if(!age||!h||!w){alert('Please fill in all fields.');return;}
  let bmr=calGender==='male'?10*w+6.25*h-5*age+5:10*w+6.25*h-5*age-161;
  let tdee=Math.round(bmr*act+(goal==='loss'?-500:goal==='gain'?400:0));
  const protein=Math.round(w*2),fat=Math.round(tdee*.25/9),carbs=Math.round((tdee-protein*4-fat*9)/4);
  const valEl=document.getElementById('cal-value');let cur=0;const step=tdee/40;(function a(){cur=Math.min(cur+step,tdee);valEl.textContent=Math.floor(cur).toLocaleString('en-IN');if(cur<tdee)requestAnimationFrame(a);})();
  document.getElementById('cal-protein').textContent=protein+'g';document.getElementById('cal-carbs').textContent=carbs+'g';document.getElementById('cal-fat').textContent=fat+'g';
}

/* â”€â”€ SCHEDULE â”€â”€ */
const scheduleData={
  mon:[{time:'06:00',ampm:'AM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'07:30',ampm:'AM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'},{time:'09:00',ampm:'AM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'06:00',ampm:'PM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'},{time:'07:00',ampm:'PM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'08:00',ampm:'PM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'}],
  tue:[{time:'06:00',ampm:'AM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'},{time:'07:30',ampm:'AM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'},{time:'09:00',ampm:'AM',class:'Pilates',trainer:'Neha Singh',duration:'45 min'},{time:'06:00',ampm:'PM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'07:30',ampm:'PM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'},{time:'08:30',ampm:'PM',class:'BoxFit',trainer:'Arjun Patel',duration:'60 min'}],
  wed:[{time:'06:00',ampm:'AM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'07:00',ampm:'AM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'},{time:'09:00',ampm:'AM',class:'Pilates',trainer:'Neha Singh',duration:'45 min'},{time:'06:00',ampm:'PM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'},{time:'07:00',ampm:'PM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'08:30',ampm:'PM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'}],
  thu:[{time:'06:30',ampm:'AM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'},{time:'08:00',ampm:'AM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'},{time:'09:00',ampm:'AM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'06:30',ampm:'PM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'},{time:'07:30',ampm:'PM',class:'BoxFit',trainer:'Arjun Patel',duration:'60 min'},{time:'09:00',ampm:'PM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'}],
  fri:[{time:'06:00',ampm:'AM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'07:00',ampm:'AM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'},{time:'09:00',ampm:'AM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'06:00',ampm:'PM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'},{time:'07:00',ampm:'PM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'08:30',ampm:'PM',class:'HIIT Burn',trainer:'Aditi Verma',duration:'30 min'}],
  sat:[{time:'07:00',ampm:'AM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'},{time:'08:00',ampm:'AM',class:'Pilates',trainer:'Neha Singh',duration:'45 min'},{time:'09:30',ampm:'AM',class:'CrossFit WOD',trainer:'Arjun Patel',duration:'60 min'},{time:'05:00',ampm:'PM',class:'Yoga Flow',trainer:'Neha Singh',duration:'45 min'},{time:'06:30',ampm:'PM',class:'Strength Camp',trainer:'Rahul Sharma',duration:'75 min'},{time:'08:00',ampm:'PM',class:'Community Workout',trainer:'All Trainers',duration:'90 min'}],
  sun:[{time:'08:00',ampm:'AM',class:'Yoga & Mindfulness',trainer:'Neha Singh',duration:'60 min'},{time:'10:00',ampm:'AM',class:'Open Gym',trainer:'Rahul Sharma',duration:'120 min'},{time:'11:30',ampm:'AM',class:'Pilates',trainer:'Neha Singh',duration:'45 min'},{time:'04:00',ampm:'PM',class:'Dance Fitness',trainer:'Aditi Verma',duration:'45 min'}]
};
function showDay(btn,day){document.querySelectorAll('.day-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderSchedule(day);}
function renderSchedule(day){document.getElementById('schedule-content').innerHTML=scheduleData[day].map(i=>`<div class="schedule-card"><div class="schedule-time"><div class="time">${i.time}</div><div class="ampm">${i.ampm}</div></div><div class="schedule-divider"></div><div class="schedule-info"><div class="class-name">${i.class}</div><div class="trainer-name"><i class="fa-solid fa-user" style="color:var(--red-neon);margin-right:4px;font-size:10px;"></i>${i.trainer}</div><span class="duration">${i.duration}</span></div></div>`).join('');}
document.addEventListener('DOMContentLoaded',()=>renderSchedule('mon'));

/* â”€â”€ FAQ â”€â”€ */
function toggleFAQ(btn){const item=btn.parentElement,answer=item.querySelector('.faq-answer'),isOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-answer').style.maxHeight='0';});if(!isOpen){item.classList.add('open');answer.style.maxHeight=answer.scrollHeight+40+'px';}}

/* â”€â”€ CONTACT FORM â”€â”€ */
function submitForm(e){e.preventDefault();const btn=e.target.querySelector('button[type="submit"]'),orig=btn.innerHTML;btn.innerHTML='<i class="fa-solid fa-check"></i> Message Sent!';btn.style.background='#22c55e';btn.disabled=true;setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';btn.disabled=false;e.target.reset();},3000);}

/* â”€â”€ NEWSLETTER â”€â”€ */
function subscribeNewsletter(e){e.preventDefault();const btn=e.target.querySelector('button'),input=e.target.querySelector('input');btn.innerHTML='<i class="fa-solid fa-check"></i>';btn.style.background='#22c55e';setTimeout(()=>{btn.innerHTML='<i class="fa-solid fa-paper-plane"></i>';btn.style.background='';input.value='';},3000);}

/* â”€â”€ SWIPER â”€â”€ */
new Swiper('.transform-swiper',{loop:true,autoplay:{delay:4000,disableOnInteraction:false},pagination:{el:'.swiper-pagination',clickable:true},speed:600,effect:'fade',fadeEffect:{crossFade:true}});

/* â”€â”€ AOS â”€â”€ */
AOS.init({duration:700,once:true,easing:'ease-out-cubic',offset:80});

/* â”€â”€ RIPPLE â”€â”€ */
document.addEventListener('click',e=>{const btn=e.target.closest('.btn');if(!btn)return;const ripple=document.createElement('span'),rect=btn.getBoundingClientRect(),size=Math.max(rect.width,rect.height),x=e.clientX-rect.left-size/2,y=e.clientY-rect.top-size/2;ripple.style.cssText=`position:absolute;width:${size}px;height:${size}px;left:${x}px;top:${y}px;background:rgba(255,255,255,0.25);border-radius:50%;transform:scale(0);animation:rippleAnim .5s ease-out forwards;pointer-events:none;z-index:10;`;if(!document.getElementById('ripple-style')){const s=document.createElement('style');s.id='ripple-style';s.textContent='@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}';document.head.appendChild(s);}btn.style.position='relative';btn.style.overflow='hidden';btn.appendChild(ripple);setTimeout(()=>ripple.remove(),500);});

/* â”€â”€ SMOOTH SCROLL â”€â”€ */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}}));

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-red').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`;});btn.addEventListener('mouseleave',()=>{btn.style.transform='';});});

/* ── REVIEWS MODAL SYSTEM ── */
const reviewsData = [
  {
    name: 'Vikram Khanna',
    tag: 'Pro Member · 8 months',
    avatar: 'VK',
    stars: 5,
    highlight: '🔥 Achievement: Lost 18 kg fat & gained core athletic strength in 4 months',
    text: '"ARIA FITNESS completely revolutionized my lifestyle. When I joined, I weighed 96 kg and suffered from chronic fatigue and low back pain. Coach Rahul designed a personalized training split focusing on functional strength and hypertrophy, paired with a calorie deficit meal plan. Within 4 months, I lost 18 kg of fat and built visible muscle definition. The luxury environment, world-class Eleiko equipment, and motivating community make me look forward to every single session. Truly an elite gym experience!"'
  },
  {
    name: 'Sneha Mehta',
    tag: 'Elite VIP · 1 year',
    avatar: 'SM',
    stars: 5,
    highlight: '⚡ Achievement: Body Fat 32% → 19% · Completed first powerlifting meet',
    text: '"Hands down the best luxury fitness club in Mumbai! The trainers are certified professionals who really care about your form, recovery, and long-term health. Coach Aditi\'s HIIT and strength sessions pushed me to fitness levels I didn\'t think were possible at 34. The spa facilities, cold plunge, and private lounge make it feel like a 5-star hotel combined with an Olympic training facility. Worth every single rupee!"'
  },
  {
    name: 'Aman Rawat',
    tag: 'Pro Member · 10 months',
    avatar: 'AR',
    stars: 5,
    highlight: '💪 Achievement: Gained +15 kg lean muscle · Bench press increased by 45 kg',
    text: '"I had been skinny my entire life and struggled to gain even 1 kg. Joining ARIA was the turning point. Coach Arjun crafted a high-volume progressive overload program combined with a 3,200 kcal surplus nutrition protocol. In 10 months, I packed on 15 kg of lean mass while staying aesthetic and sharp. The dumbbells go up to 60 kg and the plate-loaded machines from Hammer Strength are incredible."'
  },
  {
    name: 'Pooja Jain',
    tag: 'Pro Member · 6 months',
    avatar: 'PJ',
    stars: 5,
    highlight: '🏃‍♀️ Achievement: Marathon training ready · Visceral fat reduced by 50%',
    text: '"The CrossFit and HIIT functional training classes here are world-class! Every day is a new challenge with battle ropes, sled pushes, kettlebells, and barbell complexes. The trainers ensure safety first while pushing you to your peak performance. Plus, 24/7 biometric access means I can work out according to my erratic corporate schedule without any stress."'
  },
  {
    name: 'Kavya Shah',
    tag: 'Basic Member · 5 months',
    avatar: 'KS',
    stars: 5,
    highlight: '🧘‍♀️ Achievement: Completely pain-free posture · Hamstring & hip mobility 2x',
    text: '"After years of desk work causing stiff posture and cervical pain, Coach Neha\'s yoga, pilates, and mobility sessions gave me a new lease on life. The dedicated luxury studio with calming ambient lighting and sound systems makes every session a rejuvenating escape. My flexibility has doubled and my posture is completely restored."'
  },
  {
    name: 'Rohan Desai',
    tag: 'Elite VIP · 9 months',
    avatar: 'RD',
    stars: 5,
    highlight: '🏆 Achievement: Dropped 14 kg visceral fat · Deadlift achieved 210 kg PR',
    text: '"The in-house nutritionists at ARIA are the real deal. They calculated my exact macros, adjusted for my busy travel schedule, and provided healthy recipe guides. Combined with 4 days of heavy lifting and recovery sessions in the sauna, I dropped 14 kg of visceral fat and increased my deadlift to 210 kg. ARIA FITNESS is simply in a league of its own."'
  }
];

let currentReviewIndex = 0;

function openReview(index) {
  currentReviewIndex = (index + reviewsData.length) % reviewsData.length;
  const r = reviewsData[currentReviewIndex];
  const overlay = document.getElementById('review-modal');
  if (!overlay || !r) return;
  
  let starsHtml = '';
  for (let i = 0; i < r.stars; i++) starsHtml += '<i class="fa-solid fa-star"></i> ';
  document.getElementById('rm-stars').innerHTML = starsHtml;
  
  document.getElementById('rm-text').textContent = r.text;
  document.getElementById('rm-highlight').textContent = r.highlight;
  document.getElementById('rm-avatar').textContent = r.avatar;
  document.getElementById('rm-name').textContent = r.name;
  document.getElementById('rm-tag').textContent = r.tag;
  document.getElementById('rm-counter').textContent = (currentReviewIndex + 1) + ' / ' + reviewsData.length;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function nextReview() {
  openReview(currentReviewIndex + 1);
}

function prevReview() {
  openReview(currentReviewIndex - 1);
}

function closeReview(e) {
  if (e.target === document.getElementById('review-modal')) closeReviewDirect();
}

function closeReviewDirect() {
  const overlay = document.getElementById('review-modal');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeReviewDirect();
  } else if (e.key === 'ArrowRight' && document.getElementById('review-modal')?.classList.contains('active')) {
    nextReview();
  } else if (e.key === 'ArrowLeft' && document.getElementById('review-modal')?.classList.contains('active')) {
    prevReview();
  }
});
