/* ═══ NAV ═══ */
function nav(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  const page=document.getElementById(id);
  if(page)page.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>{
    const oc=b.getAttribute('onclick')||'';
    if(oc.includes(`'${id}'`))b.classList.add('active');
  });
  updateStats();
}

/* ═══ GREETING ═══ */
(function(){
  const h=new Date().getHours();
  const g=h<5?'Good night':h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  document.getElementById('greeting-txt').textContent=g;
})();

/* ═══ TOAST ═══ */
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._to);t._to=setTimeout(()=>t.classList.remove('show'),3000);
}
const showToast=toast;

/* ═══ STATS ═══ */
function updateStats(){
  const moods=JSON.parse(localStorage.getItem('moods')||'[]');
  const sessions=parseInt(localStorage.getItem('focus_sessions')||'0');
  const streak=parseInt(localStorage.getItem('streak')||'1');
  const habits=JSON.parse(localStorage.getItem('habits')||'[]');
  const today=new Date().toDateString();
  const todayDone=habits.filter(h=>(h.done||{})[today]).length;
  document.getElementById('s-streak').textContent=streak;
  document.getElementById('s-moods').textContent=moods.length;
  document.getElementById('s-sessions').textContent=sessions;
  document.getElementById('s-habits').textContent=todayDone+'/'+habits.length;
}
updateStats();

/* ═══ STREAK ═══ */
const today=new Date().toDateString();
const last=localStorage.getItem('last_visit');
let streak=parseInt(localStorage.getItem('streak')||'0');
if(last!==today){
  const yest=new Date(Date.now()-86400000).toDateString();
  streak=(last===yest)?streak+1:1;
  localStorage.setItem('streak',streak);
  localStorage.setItem('last_visit',today);
}

/* ═══ AFFIRMATIONS ═══ */
const AFFIRMS=[
  {t:"I am worthy of love, kindness, and belonging exactly as I am.",c:"selfworth"},
  {t:"My value is not determined by my productivity.",c:"selfworth"},
  {t:"I deserve rest without guilt. Rest is not laziness.",c:"selfworth"},
  {t:"I am allowed to take up space. My needs matter.",c:"selfworth"},
  {t:"I have survived every difficult day so far.",c:"resilience"},
  {t:"Healing is not linear. Today's struggle is not a step backward.",c:"resilience"},
  {t:"I am not my anxiety. I am the one who notices it.",c:"resilience"},
  {t:"This feeling is temporary. I have moved through hard things before.",c:"resilience"},
  {t:"Right now, in this breath, I am safe.",c:"calm"},
  {t:"I release what I cannot control. My peace matters more.",c:"calm"},
  {t:"My body is doing its best to protect me. I can soften.",c:"calm"},
  {t:"My brain is different, not broken. Different is not less.",c:"adhd"},
  {t:"I can begin. I only need to start one small thing.",c:"adhd"},
  {t:"My creativity and curiosity are gifts, not burdens.",c:"adhd"},
  {t:"Brighter days are ahead, even when I can't see them from here.",c:"hope"},
  {t:"Every small step forward is still forward.",c:"hope"},
  {t:"Something good is possible today.",c:"hope"},
];
const dashAffirm = document.getElementById('dash-affirm');
if(dashAffirm) dashAffirm.textContent=AFFIRMS[Math.floor(Math.random()*AFFIRMS.length)].t;

/* ═══ HERO CANVAS — replaced by CSS orb ═══ */

/* ═══ BREATHING ═══ */
const TECHS={
  box:{phases:['Inhale','Hold','Exhale','Hold'],durations:[4,4,4,4],desc:'Inhale 4s · Hold 4s · Exhale 4s · Hold 4s',cycles:4},
  '478':{phases:['Inhale','Hold','Exhale'],durations:[4,7,8],desc:'Inhale 4s · Hold 7s · Exhale 8s',cycles:4},
  calm:{phases:['Inhale','Exhale'],durations:[5,5],desc:'Inhale 5s · Exhale 5s — gentle, no holds',cycles:6},
  resonant:{phases:['Inhale','Exhale'],durations:[6,6],desc:'Inhale 6s · Exhale 6s — heart rate variability',cycles:5},
  triangle:{phases:['Inhale','Hold','Exhale'],durations:[4,4,4],desc:'Inhale 4s · Hold 4s · Exhale 4s — quick reset',cycles:5},
};
let bRunning=false,bTimer=null,bPhase=0,bCycle=0,bTick=0,curTech=TECHS.box;
function selectTech(btn){
  document.querySelectorAll('.tech-card').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  curTech=TECHS[btn.dataset.tech];
  document.getElementById('b-desc').textContent=curTech.desc;
  resetBreath();
}
function resetBreath(){
  clearInterval(bTimer);bRunning=false;bPhase=0;bCycle=0;bTick=0;
  document.getElementById('b-phase').textContent='Ready';
  document.getElementById('b-count').textContent='—';
  document.getElementById('b-cycle').textContent=`Cycle 0 of ${curTech.cycles}`;
  document.getElementById('b-prog').style.width='0%';
  const _orb=document.getElementById('breath-orb');
  if(_orb){_orb.style.transition='none';_orb.style.transform='scale(1)';}
  document.getElementById('b-start-btn').textContent='▶ Start';
}
function toggleBreath(){
  if(bRunning){clearInterval(bTimer);bRunning=false;document.getElementById('b-start-btn').textContent='▶ Resume';return;}
  bRunning=true;document.getElementById('b-start-btn').textContent='Pause';
  runBPhase();
}
function runBPhase(){
  const ph=curTech.phases[bPhase],dur=curTech.durations[bPhase];
  document.getElementById('b-phase').textContent=ph;
  document.getElementById('b-count').textContent=dur+'s';
  bTick=0;
  const orb=document.getElementById('breath-orb');

  // ── Fix: double-rAF so browser commits current state before transitioning ──
  if(ph==='Inhale'){
    // First snap to scale(1) with no transition, then in next frames animate to 1.35
    orb.style.transition='none';
    orb.style.transform='scale(1)';
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        orb.style.transition=`transform ${dur}s cubic-bezier(0.4,0,0.2,1)`;
        orb.style.transform='scale(1.38)';
      });
    });
  } else if(ph==='Exhale'){
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        orb.style.transition=`transform ${dur}s cubic-bezier(0.4,0,0.6,1)`;
        orb.style.transform='scale(1)';
      });
    });
  } else {
    // Hold — no scale change, just freeze
    orb.style.transition='none';
  }

  clearInterval(bTimer);
  // Sync: show dur immediately, then decrement each second
  bTimer=setInterval(()=>{
    if(!bRunning){clearInterval(bTimer);return;}
    bTick++;
    const remaining=dur-bTick;
    document.getElementById('b-count').textContent=remaining>0?remaining:'';
    const totalDur=curTech.durations.reduce((a,b)=>a+b,0);
    const elapsed=bCycle*totalDur+curTech.durations.slice(0,bPhase).reduce((a,b)=>a+b,0)+bTick;
    const total=curTech.cycles*totalDur;
    document.getElementById('b-prog').style.width=Math.min(100,elapsed/total*100)+'%';
    if(bTick>=dur){
      clearInterval(bTimer);
      bPhase=(bPhase+1)%curTech.phases.length;
      if(bPhase===0){
        bCycle++;
        document.getElementById('b-cycle').textContent=`Cycle ${bCycle} of ${curTech.cycles}`;
        if(bCycle>=curTech.cycles){
          bRunning=false;
          document.getElementById('b-phase').textContent='Complete ✓';
          document.getElementById('b-count').textContent='';
          document.getElementById('b-start-btn').textContent='▶ Start';
          orb.style.transition='transform 1.5s ease-out';
          orb.style.transform='scale(1)';
          toast('Breathing session complete');return;
        }
      }
      if(bRunning)runBPhase();
    }
  },1000);
}

/* ═══ SOS BREATHING ═══ */
(function(){
  let sp=0,sRunning=false,sTimer=null;
  const sPhases=[{t:'Breathe in…',d:4},{t:'Hold…',d:4},{t:'Breathe out…',d:6},{t:'Pause…',d:2}];
  function runSOS(){
    sRunning=true;
    function nextPhase(){
      const p=sPhases[sp%sPhases.length],d=p.d;
      document.getElementById('sos-phase-txt').textContent=p.t;
      let tick=0;
      document.getElementById('sos-bar').style.width='0%';
      clearInterval(sTimer);
      sTimer=setInterval(()=>{
        tick++;
        document.getElementById('sos-count-txt').textContent=d-tick+1;
        document.getElementById('sos-bar').style.width=(tick/d*100)+'%';
        if(tick>=d){clearInterval(sTimer);sp++;nextPhase();}
      },1000);
    }
    nextPhase();
  }
  // Auto-start when SOS page becomes active
  const sosPage = document.getElementById('sos');
  if(sosPage) {
    const observer=new MutationObserver(()=>{
      if(sosPage.classList.contains('active')&&!sRunning){runSOS();}
      if(!sosPage.classList.contains('active')){sRunning=false;sp=0;clearInterval(sTimer);}
    });
    observer.observe(sosPage,{attributes:true,attributeFilter:['class']});
  }
})();

/* ═══ GROUNDING ═══ */
const G_STEPS=[
  {n:'5',sense:'See',emoji:'Eye',prompt:'Look around you. Name 5 things you can see right now — objects, colours, shapes, patterns.',count:5},
  {n:'4',sense:'Touch',emoji:'Hand',prompt:'Notice what you can feel. Name 4 things you can physically touch — fabric, air, a surface.',count:4},
  {n:'3',sense:'Hear',emoji:'Ear',prompt:'Listen carefully. Name 3 sounds you can hear — near or far, loud or faint.',count:3},
  {n:'2',sense:'Smell',emoji:'Nose',prompt:'Breathe in gently. Name 2 things you can smell, or two scents you love.',count:2},
  {n:'1',sense:'Taste',emoji:'Taste',prompt:'Notice your mouth. Name 1 thing you can taste, or a taste you enjoy.',count:1},
];
let gStep=0,gInputs=[];
function resetGrounding(){gStep=0;renderGrounding();}
function renderGrounding(){
  const prog=document.getElementById('ground-prog');
  if(prog) prog.innerHTML=G_STEPS.map((_,i)=>`<div class="ground-step-dot ${i<gStep?'done':i===gStep?'active':''}"></div>`).join('');

  const content=document.getElementById('ground-content');
  if(!content) return;
  if(gStep>=G_STEPS.length){
    content.innerHTML=`<div class="ground-done-card"><h3>Beautifully done.</h3><p>You just brought yourself fully back to the present moment.<br>Take a deep breath and notice how you feel right now.</p></div>`;
    document.getElementById('g-next').textContent='↺ Start Over';
    document.getElementById('g-next').onclick=()=>{gStep=0;renderGrounding();};
    document.getElementById('g-prev').style.display='inline-flex';
    return;
  }
  const s=G_STEPS[gStep];
  const savedInputs=gInputs[gStep]||Array(s.count).fill('');
  content.innerHTML=`
    <div class="ground-big-num">${s.n}</div>
    <div class="ground-sense-head">${s.emoji} ${s.sense}</div>
    <div class="ground-prompt">${s.prompt}</div>
    <div class="ground-input-list">
      ${Array(s.count).fill(0).map((_,i)=>`
        <div class="ground-input-row ${savedInputs[i]?'filled':''}" id="grow-${i}">
          <div class="ground-input-bullet">${i+1}</div>
          <input class="input" style="flex:1;" value="${savedInputs[i]||''}" placeholder="I ${s.sense.toLowerCase()}…"
            oninput="saveGInput(${i},this.value)">
        </div>
      `).join('')}
    </div>`;
  document.getElementById('g-next').textContent='Next →';
  document.getElementById('g-next').onclick=()=>gNav(1);
  const gPrev = document.getElementById('g-prev');
  if(gPrev) gPrev.style.display=gStep===0?'none':'inline-flex';
}
function saveGInput(i,v){
  if(!gInputs[gStep])gInputs[gStep]=Array(G_STEPS[gStep].count).fill('');
  gInputs[gStep][i]=v;
  const row=document.getElementById('grow-'+i);
  if(row)row.classList.toggle('filled',!!v);
}
function gNav(d){gStep=Math.max(0,Math.min(G_STEPS.length,gStep+d));renderGrounding();}

/* ═══ BODY SCAN ═══ */
const BODY_AREAS=[
  {name:'Head & Scalp',emoji:'',instr:'Close your eyes. Bring attention to your scalp and forehead. Notice any tightness, tingling, or pressure. On each exhale, imagine the muscles softening and releasing. Let your jaw drop slightly.'},
  {name:'Neck & Shoulders',emoji:'',instr:'Focus on your neck and shoulders — one of the most common places we hold stress. Gently roll your shoulders once. Now let them drop as far as they can. Feel any tension beginning to melt with each breath.'},
  {name:'Chest & Heart',emoji:'',instr:'Place awareness on your chest. Notice its rise and fall. Is there tightness, heaviness, or constriction? Breathe into that space. With each inhale, create a little more room. With each exhale, let the tightness soften.'},
  {name:'Arms & Hands',emoji:'',instr:'Bring attention to your arms — upper arms, elbows, forearms, hands, fingers. Notice any tension or holding. Make a gentle fist, then release it completely. Let your hands rest heavy and open.'},
  {name:'Stomach & Core',emoji:'',instr:'Bring awareness to your belly. Allow it to be soft — we often hold tension here. Let it relax outward as you breathe. Notice any knots, butterflies, or tightness. Breathe space into this area.'},
  {name:'Hips & Lower Back',emoji:'',instr:'Shift focus to your hips, pelvis, and lower back. This area stores a lot of unexpressed emotion. Feel the weight of your hips. Notice any ache or tightness, and breathe gently into it without judgment.'},
  {name:'Legs & Knees',emoji:'',instr:'Move attention down through your thighs, knees, calves. Notice the sensations — heaviness, tingling, warmth. Your legs carry you through everything. Take a moment to appreciate them and let them rest completely.'},
  {name:'Feet & Toes',emoji:'',instr:'Finally, bring full awareness to your feet. Feel them connecting with the floor or surface beneath you. Wiggle your toes slowly. You are grounded. You are here. Take a long, slow breath and smile gently.'},
];
let scanArea=0,scanRunning=false,scanTimer=null,scanSec=0,scanTension=0;
(function buildBodyScan(){
  const list=document.getElementById('body-area-list');
  if(!list)return;
  list.innerHTML=BODY_AREAS.map((a,i)=>`<button class="body-area-btn ${i===0?'active':''}" onclick="selBodyArea(${i})">${a.emoji} ${a.name}</button>`).join('');
  const tRow=document.getElementById('tension-row');
  if(tRow)tRow.innerHTML=Array(5).fill(0).map((_,i)=>`<div class="tension-dot" onclick="selTension(${i+1})">${i+1}</div>`).join('');
  renderBodyArea();
})();
function selBodyArea(i){
  scanArea=i;
  document.querySelectorAll('.body-area-btn').forEach((b,j)=>b.classList.toggle('active',j===i));
  resetScan();renderBodyArea();
}
function renderBodyArea(){
  const a=BODY_AREAS[scanArea];
  const scanTitle = document.getElementById('scan-title');
  if(scanTitle) scanTitle.textContent=a.emoji+' '+a.name;
  const scanInstr = document.getElementById('scan-instr');
  if(scanInstr) scanInstr.textContent=a.instr;
  const scanTimerEl = document.getElementById('scan-timer');
  if(scanTimerEl) scanTimerEl.textContent='60s';
  const scanBtn = document.getElementById('scan-btn');
  if(scanBtn) scanBtn.textContent='▶ Begin';
}
function selTension(n){
  scanTension=n;
  document.querySelectorAll('.tension-dot').forEach((d,i)=>d.classList.toggle('selected',i<n));
}
function toggleScan(){
  if(scanRunning){clearInterval(scanTimer);scanRunning=false;document.getElementById('scan-btn').textContent='▶ Resume';return;}
  scanRunning=true;scanSec=60;document.getElementById('scan-btn').textContent='⏸ Pause';
  scanTimer=setInterval(()=>{
    scanSec--;document.getElementById('scan-timer').textContent=scanSec+'s';
    if(scanSec<=0){clearInterval(scanTimer);scanRunning=false;document.getElementById('scan-btn').textContent='▶ Done ✓';toast('Body scan area complete ');}
  },1000);
}
function resetScan(){clearInterval(scanTimer);scanRunning=false;scanSec=60;renderBodyArea();}

/* ═══ MOOD ═══ */
const MOOD_TAGS=['anxious','sad','angry','tired','hopeful','content','overwhelmed','numb','grateful','irritable','calm','lonely','excited','stressed','peaceful'];
(function(){
  const el=document.getElementById('mood-tags');
  if(!el)return;
  el.innerHTML=MOOD_TAGS.map(t=>`<span class="chip" onclick="toggleMoodTag(this)">${t}</span>`).join('');
})();
function toggleMoodTag(el){el.classList.toggle('active');}
let selMoodVal=null;
function selMood(btn){
  document.querySelectorAll('.mood-face-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selMoodVal={score:parseInt(btn.dataset.m),emoji:btn.dataset.e};
}
function saveMood(){
  if(!selMoodVal){toast('Please select how you\'re feeling');return;}
  const note=document.getElementById('mood-note').value.trim();
  const tags=[...document.querySelectorAll('#mood-tags .chip.active')].map(c=>c.textContent);
  const moods=JSON.parse(localStorage.getItem('moods')||'[]');
  moods.unshift({mood:selMoodVal,note,tags,date:new Date().toISOString()});
  localStorage.setItem('moods',JSON.stringify(moods.slice(0,90)));
  document.getElementById('mood-note').value='';
  document.querySelectorAll('.mood-face-btn').forEach(b=>b.classList.remove('selected'));
  document.querySelectorAll('#mood-tags .chip').forEach(c=>c.classList.remove('active'));
  selMoodVal=null;renderMoodHist();updateStats();toast('Mood logged ');
}
function renderMoodHist(){
  const moods=JSON.parse(localStorage.getItem('moods')||'[]');
  const el=document.getElementById('mood-history');
  if(!el)return;
  if(!moods.length){el.innerHTML='<div style="color:var(--text-3);font-size:13px;padding:8px 0;">No entries yet — start tracking today.</div>';return;}
  const cols={5:'#4E8C6A',4:'#7EB09B',3:'#7A7470',2:'#D4A97D',1:'#C07070'};
  el.innerHTML=moods.map(e=>{
    const d=new Date(e.date);
    const ds=d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})+' · '+d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
    return `<div class="mood-hist-item">
      <div class="mood-hist-emoji"><svg style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${{'great':'ic-smile2','good':'ic-smile','okay':'ic-meh','low':'ic-frown','rough':'ic-frown2'}[e.mood.emoji]||'ic-meh'}"/></svg></div>
      <div class="mood-hist-info">
        <div class="mood-hist-date">${ds}</div>
        ${e.tags&&e.tags.length?`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:3px;">${e.tags.map(t=>`<span style="font-size:10px;padding:2px 7px;background:var(--surface-2);border-radius:100px;color:var(--text-3);">${t}</span>`).join('')}</div>`:''}
        <div class="mood-hist-note">${e.note||'<em style="color:var(--text-3)">No note</em>'}</div>
      </div>
      <div class="mood-hist-score" style="background:${cols[e.mood.score]}20;color:${cols[e.mood.score]};">${e.mood.score}</div>
    </div>`;
  }).join('');
}
renderMoodHist();

/* ═══ GRATITUDE ═══ */
function saveGratitude(){
  const g1=document.getElementById('g1').value.trim();
  const g2=document.getElementById('g2').value.trim();
  const g3=document.getElementById('g3').value.trim();
  if(!g1){toast('Write at least one thing you\'re grateful for');return;}
  const note=document.getElementById('gratitude-note').value.trim();
  const hist=JSON.parse(localStorage.getItem('gratitude')||'[]');
  hist.unshift({items:[g1,g2,g3].filter(Boolean),note,date:new Date().toISOString()});
  localStorage.setItem('gratitude',JSON.stringify(hist.slice(0,60)));
  ['g1','g2','g3','gratitude-note'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderGratHist();toast('Gratitude saved ');
}
function renderGratHist(){
  const hist=JSON.parse(localStorage.getItem('gratitude')||'[]');
  const el=document.getElementById('gratitude-history');
  if(!el)return;
  if(!hist.length){el.innerHTML='<div style="color:var(--text-3);font-size:13px;padding:8px 0;">No entries yet.</div>';return;}
  el.innerHTML=hist.map(e=>{
    const d=new Date(e.date);
    const ds=d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
    return `<div class="gratitude-hist-item">
      <div class="gratitude-hist-date">${ds}</div>
      <div class="gratitude-hist-things">${e.items.map(t=>`<div class="gratitude-thing">${t}</div>`).join('')}</div>
      ${e.note?`<div style="font-size:12px;color:var(--text-3);margin-top:6px;font-style:italic;">${e.note}</div>`:''}
    </div>`;
  }).join('');
}

/* ═══ THOUGHT REFRAMING ═══ */
const TRAPS=[
  {name:'All-or-Nothing',desc:'Seeing things in black and white — "I always fail" or "It must be perfect."'},
  {name:'Catastrophising',desc:'Expecting the worst possible outcome — "This will be a disaster."'},
  {name:'Mind Reading',desc:'Assuming you know what others think — "They definitely hate me."'},
  {name:'Emotional Reasoning',desc:'Treating feelings as facts — "I feel stupid, so I must be stupid."'},
  {name:'Should Statements',desc:'Harsh rules for yourself — "I should be able to handle this."'},
  {name:'Personalisation',desc:'Taking blame for things outside your control.'},
  {name:'Overgeneralisation',desc:'Drawing broad conclusions from one event — "This always happens to me."'},
  {name:'Mental Filter',desc:'Focusing only on the negative and ignoring the positive.'},
];
function renderTraps(){
  const el=document.getElementById('thinking-traps-list');
  if(!el)return;
  el.innerHTML=TRAPS.map(t=>`
    <div style="padding:10px 12px;background:var(--surface-2);border-radius:var(--r-sm);margin-bottom:6px;">
      <div style="font-size:12.5px;font-weight:500;color:var(--text);margin-bottom:2px;">${t.name}</div>
      <div style="font-size:12px;color:var(--text-3);line-height:1.5;">${t.desc}</div>
    </div>`).join('');
}
const REFRAME_PROMPTS=[
  "Based on the evidence you've gathered, here's a more balanced view:\n\n\"{}\" — while there are valid concerns, the evidence suggests a more nuanced picture. The things that contradict this thought deserve equal weight.\n\nTry holding both sides: the difficulties are real, and they are not the whole story.",
  "Looking at what you've written:\n\n\"{}\" — this thought may feel very true right now, but notice the evidence you found against it. Feelings aren't always facts.\n\nA kinder, more accurate thought might be: you are doing your best with what you have in this moment.",
  "Your evidence tells an interesting story:\n\n\"{}\" — when you weigh both sides, this thought starts to look less absolute. The mind often exaggerates in difficult moments.\n\nWhat would you say to a dear friend who shared this thought with you?",
];
function reframe(){
  const sit=document.getElementById('cbf-situation').value.trim();
  const tht=document.getElementById('cbf-thought').value.trim();
  const fore=document.getElementById('cbf-for').value.trim();
  const agn=document.getElementById('cbf-against').value.trim();
  if(!tht){toast('Please describe your automatic thought first');return;}
  const out=document.getElementById('cbf-output');
  out.className='cbf-output loading';
  out.innerHTML='<div class="thinking-dots"><span>●</span><span>●</span><span>●</span></div> Reflecting…';
  setTimeout(()=>{
    const prompt=REFRAME_PROMPTS[Math.floor(Math.random()*REFRAME_PROMPTS.length)];
    let resp=prompt.replace('{}',tht);
    if(agn){resp+=`\n\nYou noted: "${agn}" — this is meaningful evidence. Let it carry weight.`;}
    out.className='cbf-output';out.textContent=resp;
  },1800);
}

/* ═══ FOCUS TIMER ═══ */
let tTotal=1500,tLeft=1500,tRunning=false,tInterval=null,tSession=1,tSessionTotal=4,tLabel='Focus 25';
const tCirc=2*Math.PI*105;
function setTMode(btn,sec,label){
  document.querySelectorAll('.tmode-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');tTotal=sec;tLabel=label;
  tSessionTotal=(sec===1500)?4:(sec===3000)?2:1;
  resetTimer();
}
function updateTDisplay(){
  const m=Math.floor(tLeft/60),s=tLeft%60;
  const tDisplay = document.getElementById('t-display');
  if(tDisplay) tDisplay.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const offset=tCirc*(1-tLeft/tTotal);
  const fc=document.getElementById('t-fill');
  if(fc){fc.style.strokeDasharray=tCirc;fc.style.strokeDashoffset=offset;}
}
function toggleTimer(){
  const tBtn = document.getElementById('t-btn');
  if(tRunning){clearInterval(tInterval);tRunning=false;if(tBtn) tBtn.textContent='▶ Start';return;}
  tRunning=true;if(tBtn) tBtn.textContent='⏸ Pause';
  tInterval=setInterval(()=>{
    tLeft--;updateTDisplay();
    if(tLeft<=0){
      clearInterval(tInterval);tRunning=false;
      if(tBtn) tBtn.textContent='▶ Start';
      const n=parseInt(localStorage.getItem('focus_sessions')||'0')+1;
      localStorage.setItem('focus_sessions',n);
      tSession=tSession<tSessionTotal?tSession+1:1;
      const tSessionEl = document.getElementById('t-session');
      if(tSessionEl) tSessionEl.textContent=`Session ${tSession} of ${tSessionTotal}`;
      updateStats();toast('Session complete! Take a break ');
      tLeft=tTotal;updateTDisplay();
    }
  },1000);
}
function resetTimer(){
  clearInterval(tInterval);tRunning=false;tLeft=tTotal;
  const tBtn = document.getElementById('t-btn');
  if(tBtn) tBtn.textContent='▶ Start';
  const tSessionEl = document.getElementById('t-session');
  if(tSessionEl) tSessionEl.textContent=`Session ${tSession} of ${tSessionTotal}`;
  updateTDisplay();
}
updateTDisplay();
let tasks=JSON.parse(localStorage.getItem('tasks')||'[]');
function renderTasks(){
  const el=document.getElementById('task-list');
  if(!el)return;
  if(!tasks.length){el.innerHTML='<div style="color:var(--text-3);font-size:13px;padding:8px 0;">Add what you\'ll work on this session.</div>';return;}
  el.innerHTML=tasks.map((t,i)=>`<div class="task-item ${t.done?'done':''}">
    <div class="task-cb ${t.done?'checked':''}" onclick="toggleTask(${i})">${t.done?'✓':''}</div>
    <div class="task-txt">${t.text}</div>
    <button class="task-del" onclick="deleteTask(${i})">✕</button>
  </div>`).join('');
}
function addTask(){const inp=document.getElementById('task-inp');if(!inp.value.trim())return;tasks.unshift({text:inp.value.trim(),done:false});inp.value='';localStorage.setItem('tasks',JSON.stringify(tasks));renderTasks();}
function toggleTask(i){tasks[i].done=!tasks[i].done;localStorage.setItem('tasks',JSON.stringify(tasks));renderTasks();}
function deleteTask(i){tasks.splice(i,1);localStorage.setItem('tasks',JSON.stringify(tasks));renderTasks();}
renderTasks();

/* ═══ MEDITATION ═══ */
let mTotal=120,mLeft=120,mRunning=false,mInterval=null,mPromptIdx=0,mPromptTimer=null;
const MED_PROMPTS=[
  'Notice the rise and fall of your breath.',
  'Let thoughts drift past like clouds — you don\'t need to hold them.',
  'Feel the weight of your body, grounded and supported.',
  'Soften your jaw, your shoulders, your hands.',
  'You are here. Right here. That is enough.',
  'Breathe in calm. Breathe out whatever you don\'t need.',
  'Nothing to fix. Nothing to do. Just be.',
  'Gently return to the breath whenever the mind wanders.',
  'You are safe. You are present. You are enough.',
  'Every exhale is a small release. Every inhale, a gift.',
];
function setMedDur(btn){
  document.querySelectorAll('.dur-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');mTotal=parseInt(btn.dataset.dur);resetMed();
}
function updateMedDisplay(){
  const m=Math.floor(mLeft/60),s=mLeft%60;
  const medDisplay = document.getElementById('med-display');
  if(medDisplay) medDisplay.textContent=`${m}:${String(s).padStart(2,'0')}`;
}
function toggleMed(){
  const medBtn = document.getElementById('med-btn');
  if(mRunning){clearInterval(mInterval);clearInterval(mPromptTimer);mRunning=false;if(medBtn) medBtn.textContent='▶ Begin';return;}
  mRunning=true;if(medBtn) medBtn.textContent='⏸ Pause';
  showMedPrompt();
  mPromptTimer=setInterval(showMedPrompt,14000);
  mInterval=setInterval(()=>{mLeft--;updateMedDisplay();
    if(mLeft<=0){clearInterval(mInterval);clearInterval(mPromptTimer);mRunning=false;
      if(medBtn) medBtn.textContent='▶ Begin';
      const medPrompt = document.getElementById('med-prompt');
      if(medPrompt) medPrompt.textContent='Session complete. Return gently to your day.';
      const n=parseInt(localStorage.getItem('focus_sessions')||'0')+1;
      localStorage.setItem('focus_sessions',n);updateStats();toast('Meditation complete  Beautiful work.');
    }
  },1000);
}
function showMedPrompt(){
  const el=document.getElementById('med-prompt');if(!el)return;el.style.opacity=0;
  setTimeout(()=>{el.textContent=MED_PROMPTS[mPromptIdx%MED_PROMPTS.length];el.style.opacity=1;mPromptIdx++;},450);
}
function resetMed(){
  clearInterval(mInterval);clearInterval(mPromptTimer);mRunning=false;mLeft=mTotal;
  const medBtn = document.getElementById('med-btn');
  if(medBtn) medBtn.textContent='▶ Begin';
  const medPrompt = document.getElementById('med-prompt');
  if(medPrompt) medPrompt.textContent='Choose your duration and begin when ready.';
  updateMedDisplay();
}
updateMedDisplay();

/* ═══ HABITS ═══ */
const DEFAULT_HABITS=[
  {name:'Drink 8 glasses of water',icon:'droplet'},
  {name:'Move or exercise',icon:'walk'},
  {name:'Meditate or breathe',icon:'moon'},
  {name:'Journal or reflect',icon:'pencil'},
  {name:'Get outside',icon:'leaf'},
  {name:'Avoid screens before bed',icon:'moon'},
];
function getHabits(){
  let h=JSON.parse(localStorage.getItem('habits')||'null');
  if(!h){h=DEFAULT_HABITS.map(x=>({...x,done:{}}));localStorage.setItem('habits',JSON.stringify(h));}
  return h;
}
function saveHabits(h){localStorage.setItem('habits',JSON.stringify(h));}
function renderHabits(){
  const habits=getHabits();
  const now=new Date();
  const days=Array.from({length:7},(_,i)=>{const d=new Date(now);d.setDate(d.getDate()-6+i);return d;});
  const header=document.getElementById('week-days-header');
  const range=document.getElementById('habit-week-range');
  if(!header)return;
  header.innerHTML='<div class="week-day" style="flex:1;text-align:left;">Habit</div>'+days.map(d=>`<div class="week-day">${['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]}</div>`).join('');
  if(range)range.textContent=days[0].toLocaleDateString('en-IN',{month:'short',day:'numeric'})+' – '+days[6].toLocaleDateString('en-IN',{month:'short',day:'numeric'});
  const rows=document.getElementById('habit-rows');
  rows.innerHTML=habits.map((h,hi)=>{
    const streak=calcHabitStreak(h);
    return `<div class="habit-row">
      <div class="habit-name">${h.name}</div>
      <div class="habit-dots">${days.map(d=>{const k=d.toDateString();const isToday=k===now.toDateString();return `<div class="habit-dot ${(h.done||{})[k]?'done':''} ${isToday?'today':''}" onclick="toggleHabit(${hi},'${k}')" title="${d.toLocaleDateString()}">${(h.done||{})[k]?'✓':''}</div>`;}).join('')}</div>
      <div class="habit-streak">${streak>0?'<svg style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><use href="#ic-flame"/></svg> '+streak:''}</div>
      <button onclick="deleteHabit(${hi})" style="background:none;border:none;cursor:pointer;color:var(--text-3);font-size:13px;padding:0 4px;opacity:.5;" title="Delete">✕</button>
    </div>`;
  }).join('');
}
function calcHabitStreak(h){
  let s=0,d=new Date();
  while(true){if((h.done||{})[d.toDateString()])s++;else break;d.setDate(d.getDate()-1);}
  return s;
}
function toggleHabit(i,k){const h=getHabits();h[i].done=h[i].done||{};h[i].done[k]=!h[i].done[k];saveHabits(h);renderHabits();updateStats();}
function deleteHabit(i){const h=getHabits();h.splice(i,1);saveHabits(h);renderHabits();}
function addHabit(){
  const inp=document.getElementById('habit-inp');
  if(!inp.value.trim())return;
  const h=getHabits();h.push({name:inp.value.trim(),icon:'check-sm',done:{}});
  saveHabits(h);inp.value='';renderHabits();toast('Habit added ');
}

/* ═══ SLEEP ═══ */
let sleepQuality=null;
function updateSleepHours(){
  const v=parseFloat(document.getElementById('sleep-slider').value);
  const disp = document.getElementById('sleep-hours-display');
  if(disp) disp.textContent=v.toFixed(1)+' hrs';
}
function selSQ(btn){
  document.querySelectorAll('.sq-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');sleepQuality=parseInt(btn.dataset.q);
}
function saveSleep(){
  const hrs=parseFloat(document.getElementById('sleep-slider').value);
  const note=document.getElementById('sleep-note').value.trim();
  const hist=JSON.parse(localStorage.getItem('sleep')||'[]');
  hist.unshift({hrs,quality:sleepQuality||3,note,date:new Date().toISOString()});
  localStorage.setItem('sleep',JSON.stringify(hist.slice(0,60)));
  document.getElementById('sleep-note').value='';
  document.querySelectorAll('.sq-btn').forEach(b=>b.classList.remove('selected'));
  sleepQuality=null;renderSleepHist();toast('Sleep logged ');
}
function renderSleepHist(){
  const hist=JSON.parse(localStorage.getItem('sleep')||'[]');
  const el=document.getElementById('sleep-history');if(!el)return;
  if(!hist.length){el.innerHTML='<div style="color:var(--text-3);font-size:13px;padding:8px 0;">No entries yet.</div>';return;}
  const qEmoji=['','1★','2★','3★','4★','5★'];
  el.innerHTML=hist.map(e=>{
    const d=new Date(e.date);
    const ds=d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
    return `<div class="sleep-hist-item">
      <div class="sleep-hist-date">${ds}</div>
      <div><span class="sleep-hist-hours">${e.hrs}</span><span class="sleep-hist-unit">hrs</span></div>
      <div class="sleep-hist-quality">${qEmoji[e.quality||3]}</div>
    </div>`;
  }).join('');
}

/* ═══ SELF-CARE ═══ */
const SC_ITEMS={
  'Body':[
    {icon:'droplet',text:'Drink 2+ glasses of water today'},
    {icon:'leaf',text:'Eat at least one nourishing meal'},
    {icon:'walk',text:'Move your body, even a short walk'},
    {icon:'shower',text:'Shower or freshen up'},
    {icon:'moon',text:'Prioritise sleep tonight'},
  ],
  'Mind':[
    {icon:'phone-off',text:'Take a 10-min break from your phone'},
    {icon:'moon',text:'Do one breathing or mindfulness exercise'},
    {icon:'pencil',text:'Write or journal for 5 minutes'},
    {icon:'headphones',text:'Listen to something calming or uplifting'},
  ],
  'Connection':[
    {icon:'message',text:'Reach out to someone you care about'},
    {icon:'tree',text:'Spend time in nature or outdoors'},
    {icon:'paint',text:'Do something creative or playful'},
  ],
  'Boundaries':[
    {icon:'no',text:'Say no to something that drains you'},
    {icon:'stop-sq',text:'Avoid doomscrolling today'},
    {icon:'heart',text:'Be gentle with yourself if things go unfinished'},
  ],
};
let scState={};
function renderSelfCare(){
  const todayKey='sc_'+new Date().toDateString();
  scState=JSON.parse(localStorage.getItem(todayKey)||'{}');
  const el=document.getElementById('selfcare-sections');if(!el)return;
  let html='';
  for(const [sec,items] of Object.entries(SC_ITEMS)){
    html+=`<div class="selfcare-section"><div class="selfcare-sec-title">${sec}</div>`;
    items.forEach((item,i)=>{
      const key=sec+'_'+i;const done=!!scState[key];
      html+=`<div class="selfcare-item ${done?'done':''}" onclick="toggleSC('${sec}',${i},'${todayKey}')">
        <div class="selfcare-check">${done?'✓':''}</div>
        <div class="selfcare-txt">${item.text}</div>
        <div class="selfcare-icon"><svg style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${item.icon}"/></svg></div>
      </div>`;
    });
    html+='</div>';
  }
  const customItems=JSON.parse(localStorage.getItem('sc_custom')||'[]');
  if(customItems.length){
    html+='<div class="selfcare-section"><div class="selfcare-sec-title">Custom</div>';
    customItems.forEach((text,i)=>{
      const key='custom_'+i;const done=!!scState[key];
      html+=`<div class="selfcare-item ${done?'done':''}" onclick="toggleSCCustom(${i},'${todayKey}')">
        <div class="selfcare-check">${done?'✓':''}</div>
        <div class="selfcare-txt">${text}</div>
        <div class="selfcare-icon"><svg style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-check-sm"/></svg></div>
      </div>`;
    });
    html+='</div>';
  }
  el.innerHTML=html;updateSCProgress(todayKey);
}
function toggleSC(sec,i,key){
  const k=sec+'_'+i;scState[k]=!scState[k];
  localStorage.setItem(key,JSON.stringify(scState));renderSelfCare();
}
function addSCItem(){
  const inp=document.getElementById('sc-new-inp');
  if(!inp||!inp.value.trim())return;
  const customItems=JSON.parse(localStorage.getItem('sc_custom')||'[]');
  customItems.push(inp.value.trim());
  localStorage.setItem('sc_custom',JSON.stringify(customItems));
  inp.value='';
  renderSelfCare();
  showToast('Added to checklist');
}
function toggleSCCustom(i,key){
  const k='custom_'+i;
  scState[k]=!scState[k];
  localStorage.setItem(key,JSON.stringify(scState));
  renderSelfCare();
}
function updateSCProgress(key){
  scState=JSON.parse(localStorage.getItem(key)||'{}');
  const customItems=JSON.parse(localStorage.getItem('sc_custom')||'[]');
  const total=Object.values(SC_ITEMS).reduce((a,v)=>a+v.length,0)+customItems.length;
  const done=Object.values(scState).filter(Boolean).length;
  const pct=total?Math.round(done/total*100):0;
  const p=document.getElementById('sc-pct');const c=document.getElementById('sc-count');const b=document.getElementById('sc-bar');
  if(p)p.textContent=pct+'%';if(c)c.textContent=`${done} of ${total} done`;if(b)b.style.width=pct+'%';
}

/* ═══ EMOTION WHEEL ═══ */
const EMOTIONS={
  Joy:{color:'#F5C842',icon:'',children:{Serenity:{color:'#F7D46B',desc:'A peaceful, calm sense of well-being.',coping:['Take a mindful moment to savour this feeling.','Share it with someone you care about.','Note it in your journal so you can return to it.']},Gratitude:{color:'#F9DF8F',desc:'Appreciation for what you have and who supports you.',coping:['Write down 3 things you\'re grateful for.','Express thanks to someone today.','Let the feeling deepen with slow, intentional breaths.']},Ecstasy:{color:'#F0B800',desc:'Intense, overwhelming joy and excitement.',coping:['Channel this energy into something creative.','Move your body — dance, run, celebrate.','Ground yourself if it feels overwhelming.']}}},
  Trust:{color:'#4E8C6A',icon:'handshake',children:{Acceptance:{color:'#6FAA87',desc:'Feeling comfortable with yourself and others.',coping:['Acknowledge what you\'re accepting and why.','Extend this same acceptance toward yourself.','Let go of the need to change what you\'ve accepted.']},Admiration:{color:'#5D9E7A',desc:'Deep respect and appreciation for someone or something.',coping:['Tell the person you admire them.','Identify what quality you admire and reflect on it.','Ask yourself: do you have this quality too?']},Submission:{color:'#3C7A58',desc:'Feeling powerless or yielding to others\' needs.',coping:['Notice if this is chosen or forced.','Set one small boundary today.','Talk to someone you trust about how you feel.']}}},
  Fear:{color:'#7B9ED9',icon:'',children:{Apprehension:{color:'#9AB3E2',desc:'A mild sense of unease about what might happen.',coping:['Write down your worries to externalise them.','Ask: is this likely, or just possible?','Try the 5-4-3-2-1 grounding technique.']},Terror:{color:'#5D84C8',desc:'Intense, overwhelming fear.',coping:['Activate the SOS Panic Mode breathing guide.','Ground yourself: feet on the floor, slow breaths.','Call someone safe to be with or talk to.']},Awe:{color:'#A8C0E8',desc:'A mix of fear and wonder — feeling small before something vast.',coping:['Sit with the feeling without needing to resolve it.','Acknowledge what moved you.','Journal about the experience.']}}},
  Anger:{color:'#0A0A0A',icon:'',children:{Annoyance:{color:'#C48A90',desc:'Mild irritation at something or someone.',coping:['Name what\'s bothering you specifically.','Take 3 slow breaths before responding.','Ask: is this worth my energy?']},Rage:{color:'#0A0A0A',desc:'Intense, consuming anger.',coping:['Remove yourself from the situation if possible.','Do vigorous physical activity to discharge the energy.','Write what you\'d say but won\'t — then delete it.']},Contempt:{color:'#8B4A50',desc:'Feeling superior to or dismissive of others.',coping:['Examine whether this is protecting something deeper.','Practice curiosity about the other person\'s perspective.','Consider if contempt is masking hurt or fear.']}}},
  Disgust:{color:'#9B59B6',icon:'',children:{Boredom:{color:'#B07CC6',desc:'A lack of engagement or stimulation.',coping:['Change your environment, even briefly.','Try one small creative act.','Notice whether boredom is actually avoidance.']},Aversion:{color:'#8E44A3',desc:'Strong dislike or repulsion toward something.',coping:['Name what\'re avoiding and why.','Consider if this protects you or limits you.','Explore it gradually, at your own pace.']},Loathing:{color:'#7D3A96',desc:'Deep, intense disgust — sometimes self-directed.',coping:['Practice self-compassion: you\'re human.','Talk to a trusted person or therapist.','Challenge the harsh inner critic with kindness.']}}},
  Sadness:{color:'#5B8DB8',icon:'',children:{Pensiveness:{color:'#7AA8CE',desc:'Quiet reflection, tinged with melancholy.',coping:['Allow the feeling without judgment.','Listen to music that matches your mood.','Write about what you\'re reflecting on.']},Grief:{color:'#4A7BA8',desc:'Deep sorrow from loss — a person, relationship, or part of yourself.',coping:['Allow yourself to feel it fully — grief is love.','Reach out to someone who can sit with you.','Consider grief support if it feels unmanageable.']},Sadness:{color:'#5B8DB8',desc:'A gentle heaviness or sorrow.',coping:['Be kind to yourself today.','Do one small nourishing thing.','Let someone know you\'re having a hard day.']}}},
  Surprise:{color:'#E8B84B',icon:'',children:{Distraction:{color:'#EEC870',desc:'Pulled in many directions, unable to focus.',coping:['Write a short list: what are the 3 most important things?','Use the Focus Timer to commit to one task.','Remove notifications and distractions for 25 minutes.']},Amazement:{color:'#E6A820',desc:'Astonishment and wonder at something unexpected.',coping:['Savour this feeling — it\'s rare and precious.','Share what amazed you with someone.','Let it inspire curiosity.']},Anticipation:{color:'#D4A030',desc:'Eagerness mixed with some anxiety about what\'s ahead.',coping:['Channel it into preparation, not worry.','Break the upcoming event into manageable steps.','Breathe and trust that you\'re ready.']}}},
};
let selectedEmotion=null;
function drawWheel(){
  const canvas=document.getElementById('emotion-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');const W=canvas.width,H=canvas.height;
  const cx=W/2,cy=H/2;const outerR=W/2-10,innerR=outerR*.55,coreR=innerR*.5;
  ctx.clearRect(0,0,W,H);
  const parents=Object.entries(EMOTIONS);const pCount=parents.length;
  parents.forEach(([pName,pData],pi)=>{
    const pStart=pi/pCount*2*Math.PI-Math.PI/2;
    const pEnd=(pi+1)/pCount*2*Math.PI-Math.PI/2;
    // Inner (parent)
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,innerR,pStart,pEnd);ctx.closePath();
    ctx.fillStyle=pData.color+(selectedEmotion&&selectedEmotion.parent===pName?'FF':'CC');
    ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.7)';ctx.lineWidth=2;ctx.stroke();
    // Parent label
    const midA=(pStart+pEnd)/2,labelR=(coreR+innerR)/2;
    ctx.save();ctx.translate(cx+Math.cos(midA)*labelR,cy+Math.sin(midA)*labelR);
    ctx.rotate(midA+Math.PI/2);ctx.font='bold 11px DM Sans';
    ctx.fillStyle='rgba(255,255,255,0.9)';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(pName,0,0);ctx.restore();
    // Outer (children)
    const children=Object.entries(pData.children);
    children.forEach(([cName,cData],ci)=>{
      const cStart=pStart+ci/children.length*(pEnd-pStart);
      const cEnd=pStart+(ci+1)/children.length*(pEnd-pStart);
      ctx.beginPath();ctx.moveTo(cx+Math.cos(cStart)*innerR,cy+Math.sin(cStart)*innerR);
      ctx.arc(cx,cy,outerR,cStart,cEnd);
      ctx.arc(cx,cy,innerR,cEnd,cStart,true);ctx.closePath();
      ctx.fillStyle=cData.color+(selectedEmotion&&selectedEmotion.name===cName?'FF':'BB');
      ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.6)';ctx.lineWidth=1.5;ctx.stroke();
      const midCA=(cStart+cEnd)/2,childR=(innerR+outerR)/2;
      ctx.save();ctx.translate(cx+Math.cos(midCA)*childR,cy+Math.sin(midCA)*childR);
      ctx.rotate(midCA+Math.PI/2);ctx.font='9px DM Sans';
      ctx.fillStyle='rgba(0,0,0,0.7)';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(cName,0,0);ctx.restore();
    });
  });
  // Core circle
  ctx.beginPath();ctx.arc(cx,cy,coreR,0,2*Math.PI);
  ctx.fillStyle='#FFFFFF';ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.06)';ctx.lineWidth=1;ctx.stroke();
  ctx.font='11px DM Sans';ctx.fillStyle='var(--text-2)';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#57534E';
  ctx.fillText('How do',cx,cy-8);ctx.fillText('you feel?',cx,cy+8);
}
function emotionClick(e){
  const canvas=document.getElementById('emotion-canvas');
  if(!canvas) return;
  const rect=canvas.getBoundingClientRect();
  const scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;
  const x=(e.clientX-rect.left)*scaleX,y=(e.clientY-rect.top)*scaleY;
  const cx=canvas.width/2,cy=canvas.height/2;
  const dx=x-cx,dy=y-cy;
  const dist=Math.sqrt(dx*dx+dy*dy);
  let angle=Math.atan2(dy,dx)+Math.PI/2;if(angle<0)angle+=2*Math.PI;
  const outerR=canvas.width/2-10,innerR=outerR*.55,coreR=innerR*.5;
  if(dist<coreR||dist>outerR)return;
  const parents=Object.entries(EMOTIONS);const pCount=parents.length;
  const normAngle=angle/(2*Math.PI);
  const pi=Math.floor(normAngle*pCount);
  const pData=parents[pi];if(!pData)return;
  if(dist>=coreR&&dist<innerR){
    selectedEmotion={name:pData[0],parent:pData[0],data:{color:pData[1].color,desc:'The core emotion of '+pData[0].toLowerCase()+'. It encompasses a range of related feelings.',coping:['Notice and name this feeling without judgment.','Where do you feel it in your body?','What does this emotion need right now?']}};
  } else {
    const children=Object.entries(pData[1].children);const cCount=children.length;
    const pStart=pi/pCount,pEnd=(pi+1)/pCount;
    const ci=Math.floor((normAngle-pStart)/(pEnd-pStart)*cCount);
    const child=children[Math.min(ci,cCount-1)];
    if(child)selectedEmotion={name:child[0],parent:pData[0],data:child[1]};
  }
  if(selectedEmotion){
    const eIcon = document.getElementById('emotion-icon');
    if(eIcon) eIcon.innerHTML='<svg style="width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><use href="#ic-palette"/></svg>';
    const eName = document.getElementById('emotion-name');
    if(eName) eName.textContent=selectedEmotion.name;
    const eParent = document.getElementById('emotion-parent');
    if(eParent) eParent.textContent='Part of: '+selectedEmotion.parent;
    const eDesc = document.getElementById('emotion-desc');
    if(eDesc) eDesc.textContent=selectedEmotion.data.desc;
    const copEl=document.getElementById('emotion-coping');
    if(copEl) copEl.innerHTML=(selectedEmotion.data.coping||[]).map(c=>`<div class="emotion-coping-item">${c}</div>`).join('');
    drawWheel();
  }
}

/* ═══ CHARTS ═══ */
function drawCharts(){
  drawMoodChart();drawMoodDist();drawSleepChart();
}
function drawMoodChart(){
  const canvas=document.getElementById('mood-chart');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-48;canvas.width=W;canvas.height=180;
  const moods=JSON.parse(localStorage.getItem('moods')||'[]');
  const days=14;const pts=[];
  for(let i=days-1;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);const ds=d.toDateString();
    const dayMoods=moods.filter(m=>new Date(m.date).toDateString()===ds);
    pts.push(dayMoods.length?dayMoods.reduce((a,m)=>a+m.mood.score,0)/dayMoods.length:null);
  }
  ctx.clearRect(0,0,W,180);
  const pad={t:20,b:30,l:30,r:20};const pw=W-pad.l-pad.r,ph=180-pad.t-pad.b;
  const grd=ctx.createLinearGradient(0,pad.t,0,pad.t+ph);
  grd.addColorStop(0,'rgba(26,46,26,0.15)');grd.addColorStop(1,'rgba(123,56,64,0)');
  const xs=pts.map((_,i)=>pad.l+i/(pts.length-1)*pw);
  const ys=pts.map(v=>v?pad.t+ph-(v-1)/4*ph:null);
  // Area fill
  ctx.beginPath();const validFirst=pts.findIndex(p=>p!==null);
  if(validFirst>=0){
    ctx.moveTo(xs[validFirst],pad.t+ph);ctx.lineTo(xs[validFirst],ys[validFirst]);
    for(let i=validFirst+1;i<pts.length;i++){if(ys[i]!==null){ctx.lineTo(xs[i],ys[i]);}}
    ctx.lineTo(xs[pts.length-1],pad.t+ph);ctx.closePath();ctx.fillStyle=grd;ctx.fill();
  }
  // Line
  ctx.beginPath();let first=true;
  for(let i=0;i<pts.length;i++){if(ys[i]===null)continue;if(first){ctx.moveTo(xs[i],ys[i]);first=false;}else ctx.lineTo(xs[i],ys[i]);}
  ctx.strokeStyle='#0A0A0A';ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
  // Dots
  for(let i=0;i<pts.length;i++){
    if(ys[i]===null)continue;
    ctx.beginPath();ctx.arc(xs[i],ys[i],4,0,2*Math.PI);
    ctx.fillStyle='#0A0A0A';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
  }
  // Y labels
  ctx.font='10px DM Sans';ctx.fillStyle='#5E5E5E';ctx.textAlign='right';
  ['1','2','3','4','5'].forEach((l,i)=>{
    const y=pad.t+ph-i/4*ph;ctx.fillText(l,pad.l-6,y+4);
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+pw,y);
    ctx.strokeStyle='rgba(0,0,0,0.04)';ctx.lineWidth=1;ctx.stroke();
  });
  // X labels
  ctx.textAlign='center';
  const labelIdxs=[0,3,6,9,13];
  labelIdxs.forEach(i=>{
    const d=new Date();d.setDate(d.getDate()-(days-1-i));
    ctx.fillStyle='#5E5E5E';ctx.fillText(d.toLocaleDateString('en-IN',{month:'short',day:'numeric'}),xs[i],pad.t+ph+18);
  });
}
function drawMoodDist(){
  const moods=JSON.parse(localStorage.getItem('moods')||'[]');
  const counts={5:0,4:0,3:0,2:0,1:0};
  moods.forEach(m=>counts[m.mood.score]=(counts[m.mood.score]||0)+1);
  const max=Math.max(...Object.values(counts))||1;
  const el=document.getElementById('mood-dist');if(!el)return;
  const colors={5:'#4E8C6A',4:'#7EB09B',3:'#7A7470',2:'#D4A97D',1:'#C07070'};
  const emojis={5:'Great',4:'Good',3:'Okay',2:'Low',1:'Rough'};
  el.innerHTML=[5,4,3,2,1].map(k=>`
    <div class="dist-bar-wrap">
      <div class="dist-bar-outer"><div class="dist-bar-inner" style="height:${counts[k]/max*100}%;background:${colors[k]};"></div></div>
      <div class="dist-bar-lbl">${emojis[k]}</div>
      <div class="dist-bar-val">${counts[k]}</div>
    </div>`).join('');
}
function drawSleepChart(){
  const canvas=document.getElementById('sleep-chart');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-48;canvas.width=W;canvas.height=120;
  const sleepLog=JSON.parse(localStorage.getItem('sleep')||'[]');
  const days=7;const pts=[];
  for(let i=days-1;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);const ds=d.toDateString();
    const entry=sleepLog.find(s=>new Date(s.date).toDateString()===ds);
    pts.push(entry?entry.hrs:null);
  }
  ctx.clearRect(0,0,W,120);
  const pad={t:12,b:28,l:28,r:12};const pw=W-pad.l-pad.r,ph=120-pad.t-pad.b;
  const xs=pts.map((_,i)=>pad.l+i/(pts.length-1)*pw);
  ctx.font='10px DM Sans';ctx.textAlign='center';ctx.fillStyle='#5E5E5E';
  for(let i=0;i<pts.length;i++){
    const d=new Date();d.setDate(d.getDate()-(days-1-i));
    ctx.fillText(['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()],xs[i],120-6);
    if(pts[i]!==null){
      const barH=(pts[i]/12)*ph;const barY=pad.t+ph-barH;const barW=Math.min(24,pw/pts.length*.7);
      const g=ctx.createLinearGradient(0,barY,0,pad.t+ph);
      g.addColorStop(0,'#7B9ED9');g.addColorStop(1,'rgba(123,158,217,0.3)');
      ctx.fillStyle=g;
      ctx.beginPath();ctx.roundRect(xs[i]-barW/2,barY,barW,barH,4);ctx.fill();
      ctx.fillStyle='#234F7A';ctx.font='9px DM Sans';
      ctx.fillText(pts[i]+'h',xs[i],barY-4);
    }
  }
}

/* ══ WORRY JOURNAL ══ */
let wActionable=null;
function wMarkStep(i,val){
  const el=document.getElementById('ws-'+i);
  if(el)el.classList.toggle('complete',val.trim().length>0);
}
function wSetActionable(v){
  wActionable=v;
  document.getElementById('w-yes-btn').className='act-btn'+(v?' yes':'');
  document.getElementById('w-no-btn').className='act-btn'+(!v?' no':'');
  document.getElementById('w-yes-hint').classList.toggle('show',v===true);
  document.getElementById('w-no-hint').classList.toggle('show',v===false);
  wMarkStep(2,v!==null?'set':'');
}
function wSelectCog(el){
  el.classList.toggle('sel');
  if(el.classList.contains('sel')){
    const ta=document.getElementById('w-challenge');
    ta.value=(ta.value.trim()?ta.value.trim()+'\n\n':'')+el.textContent+'\n';
    ta.focus();
  }
}
function wSchedule(){
  const time=document.getElementById('w-time').value;
  const dur=document.getElementById('w-dur').value.trim();
  if(!time){showToast('Pick a time first ');return;}
  const list=JSON.parse(localStorage.getItem('worry_sched')||'[]');
  list.push({time,dur,date:new Date().toISOString()});
  localStorage.setItem('worry_sched',JSON.stringify(list));
  document.getElementById('w-time').value='';
  document.getElementById('w-dur').value='';
  wRenderSched();showToast('Worry time scheduled ');
  wMarkStep(4,'set');
}
function wRenderSched(){
  const list=JSON.parse(localStorage.getItem('worry_sched')||'[]');
  const el=document.getElementById('w-sched-list');if(!el)return;
  el.innerHTML=list.slice(-5).map((s,i)=>`
    <div class="sched-item">
      <span style="display:inline-flex;"><svg style="width:15px;height:15px;flex-shrink:0;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;display:inline-block;" aria-hidden="true"><use href="#ic-clock"/></svg></span>
      <span class="sched-text">Worry time</span>
      <span class="sched-time">${s.time}${s.dur?' · '+s.dur:''}</span>
      <button class="sched-del" onclick="wDeleteSched(${i})">✕</button>
    </div>`).join('');
}
function wDeleteSched(i){
  const list=JSON.parse(localStorage.getItem('worry_sched')||'[]');
  list.splice(i,1);localStorage.setItem('worry_sched',JSON.stringify(list));wRenderSched();
}
const W_REFRAMES=[
  '"{w}" — this worry is real to you, and it deserves acknowledgment.\n\nAnd yet, when you weigh it honestly: most worries never materialise in the way we fear. Your nervous system is protecting you — but it may be overestimating the threat.\n\nYou\'ve named it, questioned it, and contained it. That is all you need to do right now.',
  'Writing this down was the first act of courage.\n\n"{w}" — notice how putting it outside your head changes its texture. It\'s no longer spinning silently.\n\nYou have navigated hard things before. Whatever happens, you will find a way through — as you always have.',
  '"{w}" — your mind is trying to protect you. But anxiety often protects against possibilities, not certainties.\n\nAsk gently: what\'s the evidence this will happen as catastrophically as feared? What\'s the evidence it won\'t?\n\nYou don\'t need certainty to move forward. You never did.',
  'This worry has taken up space in your mind. You\'ve just given it somewhere specific to live — and that matters.\n\nThe thought "{w}" may return. When it does, remind yourself: I\'ve already worked through this. There\'s nothing more to do right now.\n\nLet it pass through, like weather.',
];
function wSave(){
  const worry=document.getElementById('w-worry').value.trim();
  if(!worry){showToast('Write your worry first ');return;}
  const box=document.getElementById('w-reframe');
  box.className='worry-reframe loading';
  box.innerHTML='<span class="thinking-dots"><span></span><span></span><span></span></span> Reflecting…';
  setTimeout(()=>{
    const tmpl=W_REFRAMES[Math.floor(Math.random()*W_REFRAMES.length)];
    const reframed=tmpl.replace(/{w}/g,worry.length>80?worry.slice(0,77)+'…':worry);
    box.className='worry-reframe';box.textContent=reframed;
    const arch=JSON.parse(localStorage.getItem('worry_archive')||'[]');
    arch.unshift({worry,challenge:document.getElementById('w-challenge').value.trim(),actionable:wActionable,reframed,date:new Date().toISOString(),resolved:false});
    localStorage.setItem('worry_archive',JSON.stringify(arch.slice(0,40)));
    wRenderArchive();showToast('Worry processed ');
  },1500);
}
function wClear(){
  ['w-worry','w-challenge','w-action','w-time','w-dur'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  wActionable=null;
  ['ws-1','ws-2','ws-3','ws-4'].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.remove('complete');});
  document.getElementById('w-yes-hint').classList.remove('show');
  document.getElementById('w-no-hint').classList.remove('show');
  document.getElementById('w-yes-btn').className='act-btn';
  document.getElementById('w-no-btn').className='act-btn';
  document.querySelectorAll('.cog-q').forEach(q=>q.classList.remove('sel'));
  const box=document.getElementById('w-reframe');
  box.className='worry-reframe';
  box.textContent='Your reframed thought will appear here after completing the steps above.';
}
function wRenderArchive(){
  const arch=JSON.parse(localStorage.getItem('worry_archive')||'[]');
  const el=document.getElementById('w-archive');if(!el)return;
  if(!arch.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">Saved worries will appear here.</div>';return;}
  el.innerHTML=arch.slice(0,8).map((w,i)=>{
    const d=new Date(w.date).toLocaleDateString('en-IN',{weekday:'short',month:'short',day:'numeric'});
    return`<div class="worry-archive-item">
      <div class="worry-archive-date">${d}${w.actionable===true?' · Actionable':w.actionable===false?' · Uncertain':''}</div>
      <div class="worry-archive-text">${w.worry}</div>
      <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
        <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:4px 10px;" onclick="wToggleResolved(${i})">${w.resolved?'↺ Unmark':'✓ Mark resolved'}</button>
        ${w.resolved?'<span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--green-bg);color:var(--green);">Resolved</span>':''}
      </div>
    </div>`;
  }).join('');
}
function wToggleResolved(i){
  const arch=JSON.parse(localStorage.getItem('worry_archive')||'[]');
  arch[i].resolved=!arch[i].resolved;
  localStorage.setItem('worry_archive',JSON.stringify(arch));
  wRenderArchive();
}
function wClearArchive(){
  if(!confirm('Clear all archived worries?'))return;
  localStorage.setItem('worry_archive','[]');wRenderArchive();
}
wRenderArchive();wRenderSched();

/* ══ PMR ══ */
const PMR_MUSCLES=[
  {name:'Hands & Forearms',emoji:'',tense:"Clench both fists as tight as you can and flex your forearms.",release:"Let your hands fall completely open. Feel the warmth and blood flowing back through your fingers.",ts:5,rs:15},
  {name:'Upper Arms',emoji:'',tense:"Bend your elbows and flex your biceps as hard as you can.",release:"Straighten your arms and let them fall heavy. Feel the release travel to your wrists.",ts:5,rs:15},
  {name:'Shoulders',emoji:'',tense:"Shrug both shoulders up toward your ears as high as possible.",release:"Drop them completely. Feel them melt downward away from your ears.",ts:5,rs:15},
  {name:'Face',emoji:'',tense:"Scrunch your whole face: clench jaw, close eyes tight, wrinkle nose, furrow brow.",release:"Let your whole face go slack. Feel your jaw drop slightly, your forehead smooth.",ts:5,rs:15},
  {name:'Chest',emoji:'',tense:"Take a deep breath and hold it, puffing out your chest.",release:"Slowly exhale. Feel your chest soften and open wide.",ts:6,rs:15},
  {name:'Stomach',emoji:'',tense:"Pull your stomach in tightly, pressing it toward your spine.",release:"Release completely. Let your belly be soft and relaxed — nothing to hold in.",ts:5,rs:15},
  {name:'Hips & Glutes',emoji:'',tense:"Squeeze your glutes and hips together as firmly as you can.",release:"Let everything release. Feel your lower body heavy and fully supported.",ts:5,rs:15},
  {name:'Thighs',emoji:'',tense:"Press your knees together and tighten your thigh muscles as hard as you can.",release:"Let your legs fall naturally apart. Feel the tension leaving your thighs.",ts:5,rs:15},
  {name:'Calves',emoji:'',tense:"Point your feet down and away, flexing your calf muscles.",release:"Let your feet rest naturally. Notice the relaxation spreading up your legs.",ts:5,rs:15},
  {name:'Feet & Toes',emoji:'',tense:"Curl your toes tightly downward, gripping the floor.",release:"Wiggle your toes gently, then let them rest. Feel the relaxation all the way up your body.",ts:5,rs:15},
];
let pmrCur=0,pmrPhase='idle',pmrTimerInt=null;
const PMR_CIRC=2*Math.PI*75;

function pmrBuildCards(){
  const track=document.getElementById('pmr-track');if(!track)return;
  track.innerHTML=PMR_MUSCLES.map((_,i)=>`<div class="pmr-track-pip ${i<pmrCur?'done':i===pmrCur?'active':''}"></div>`).join('');
  const wrap=document.getElementById('pmr-step-cards');if(!wrap)return;
  wrap.innerHTML=PMR_MUSCLES.map((m,i)=>`
    <div class="pmr-step-card ${i===pmrCur?'active':''}" id="pmr-card-${i}">
      <div class="pmr-step-top">
        <div class="pmr-step-index">${i+1}</div>
        <div style="display:flex;align-items:center;gap:10px;"><div class="pmr-step-name">${m.name}</div></div>
      </div>
      <div class="pmr-phase-banner idle" id="pmr-banner-${i}">
        <div class="pmr-phase-icon" id="pmr-bicon-${i}"><svg style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><use href="#ic-activity"/></svg></div>
        <div class="pmr-phase-text" id="pmr-btext-${i}">Press Begin to start this muscle group.</div>
      </div>
      <div class="pmr-instruction" id="pmr-instr-${i}">${m.tense}</div>
    </div>`).join('');
  const complete=document.getElementById('pmr-complete');
  const navRow=document.getElementById('pmr-nav-row');
  const isComplete=pmrCur>=PMR_MUSCLES.length;
  if(complete){complete.classList.toggle('show',isComplete);complete.style.display=isComplete?'block':'none';}
  if(wrap)wrap.style.display=isComplete?'none':'block';
  if(navRow)navRow.style.display=isComplete?'none':'flex';
  const pmrPrev = document.getElementById('pmr-prev-btn');
  if(pmrPrev) pmrPrev.style.display=pmrCur>0?'inline-flex':'none';
  const pmrMain = document.getElementById('pmr-main-btn');
  if(pmrMain) {
    pmrMain.textContent='▶ Begin This Muscle';
    pmrMain.disabled=false;
    pmrMain.style.opacity='1';
  }
  if(pmrCur<PMR_MUSCLES.length)
    document.getElementById('pmr-status').textContent=`Step ${pmrCur+1} of ${PMR_MUSCLES.length} — ${PMR_MUSCLES[pmrCur].name}`;
  const ring=document.getElementById('pmr-ring');
  if(ring){ring.style.strokeDashoffset=PMR_CIRC;}
  document.getElementById('pmr-timer-num').textContent='—';
  document.getElementById('pmr-timer-lbl').textContent='Ready';
}
function pmrBegin(){
  if(pmrCur>=PMR_MUSCLES.length||pmrPhase!=='idle')return;
  pmrRunPhase('tense');
}
function pmrRunPhase(phase){
  const m=PMR_MUSCLES[pmrCur];
  pmrPhase=phase;
  const dur=phase==='tense'?m.ts:m.rs;
  let sec=dur;
  const ring=document.getElementById('pmr-ring');
  const banner=document.getElementById('pmr-banner-'+pmrCur);
  const bIcon=document.getElementById('pmr-bicon-'+pmrCur);
  const bText=document.getElementById('pmr-btext-'+pmrCur);
  const instr=document.getElementById('pmr-instr-'+pmrCur);
  if(ring){ring.style.stroke=phase==='tense'?'var(--accent)':'var(--green)';ring.style.strokeDashoffset=0;}
  if(banner){banner.className='pmr-phase-banner '+phase;}
  if(bIcon)bIcon.innerHTML=phase==='tense'?'<svg style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><use href="#ic-activity"/></svg>':'<svg style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><use href="#ic-wind"/></svg>';
  if(bText)bText.textContent=phase==='tense'?`Tense for ${dur} seconds — really squeeze`:`Release — let go completely for ${dur} seconds`;
  if(instr) instr.textContent=phase==='tense'?m.tense:m.release;
  const pmrMain = document.getElementById('pmr-main-btn');
  if(pmrMain) {
    pmrMain.disabled=true;
    pmrMain.style.opacity='.4';
  }
  clearInterval(pmrTimerInt);
  const update=()=>{
    document.getElementById('pmr-timer-num').textContent=sec+'s';
    document.getElementById('pmr-timer-lbl').textContent=phase==='tense'?'Tensing…':'Releasing…';
    if(ring)ring.style.strokeDashoffset=PMR_CIRC*(sec/dur);
  };
  update();
  pmrTimerInt=setInterval(()=>{
    sec--;update();
    if(sec<=0){
      clearInterval(pmrTimerInt);
      if(phase==='tense'){pmrRunPhase('release');}
      else{
        pmrPhase='idle';pmrCur++;
        if(pmrCur<PMR_MUSCLES.length)showToast(`Moving to ${PMR_MUSCLES[pmrCur].name} `);
        else showToast('Full body relaxed  Well done!');
        pmrBuildCards();
      }
    }
  },1000);
}
function pmrNav(d){
  if(d===-1&&pmrCur>0){clearInterval(pmrTimerInt);pmrPhase='idle';pmrCur--;pmrBuildCards();}
}
function pmrRestart(){clearInterval(pmrTimerInt);pmrCur=0;pmrPhase='idle';pmrBuildCards();}

/* ══ BEHAVIORAL ACTIVATION ══ */
const BA_DEFAULTS=[
  {name:'Short walk outside',emoji:'',cat:'physical'},
  {name:'Call or text a friend',emoji:'',cat:'social'},
  {name:'Cook something I enjoy',emoji:'',cat:'pleasure'},
  {name:'Read for 15 minutes',emoji:'',cat:'pleasure'},
  {name:'Tidy one small area',emoji:'',cat:'mastery'},
  {name:'Gentle stretching',emoji:'',cat:'physical'},
  {name:'Watch a favourite show',emoji:'',cat:'rest'},
  {name:'Journal for 5 minutes',emoji:'',cat:'mastery'},
  {name:'Make something creative',emoji:'',cat:'creative'},
  {name:'Sit outside quietly',emoji:'',cat:'rest'},
  {name:'Play or listen to music',emoji:'',cat:'creative'},
  {name:'Do something kind for someone',emoji:'',cat:'social'},
];
const BA_SLOTS=['7am','9am','11am','1pm','3pm','5pm','7pm','9pm'];
const BA_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const BA_CAT_CSS={pleasure:'ba-cat-pleasure',mastery:'ba-cat-mastery',social:'ba-cat-social',physical:'ba-cat-physical',rest:'ba-cat-rest',creative:'ba-cat-creative',other:'ba-cat-other'};
const BA_CAT_EMOJI={pleasure:'',mastery:'',social:'',physical:'',rest:'',creative:'',other:''};
const BA_MOOD_EMOJIS=['1','2','3','4','5'];
let baModalSlot=null,baModalMood=3;

function baGetActivities(){let a=JSON.parse(localStorage.getItem('ba_acts')||'null');if(!a){a=BA_DEFAULTS;localStorage.setItem('ba_acts',JSON.stringify(a));}return a;}
function baGetPlanner(){return JSON.parse(localStorage.getItem('ba_plan')||'{}');}
function baSavePlanner(p){localStorage.setItem('ba_plan',JSON.stringify(p));}

function baAddActivity(){
  const name=document.getElementById('ba-new-name').value.trim();
  if(!name){showToast('Give the activity a name');return;}
  const emoji=document.getElementById('ba-new-emoji').value.trim()||'target';
  const cat=document.getElementById('ba-new-cat').value;
  const acts=baGetActivities();acts.push({name,emoji,cat});
  localStorage.setItem('ba_acts',JSON.stringify(acts));
  document.getElementById('ba-new-name').value='';
  document.getElementById('ba-new-emoji').value='';
  baRenderBank();baUpdateModalActs();showToast('Activity added ');
}
function baDeleteActivity(i){
  const acts=baGetActivities();acts.splice(i,1);
  localStorage.setItem('ba_acts',JSON.stringify(acts));
  baRenderBank();baUpdateModalActs();
}
function baRenderBank(){
  const acts=baGetActivities();const el=document.getElementById('ba-bank');if(!el)return;
  el.innerHTML=acts.map((a,i)=>`
    <div class="ba-activity-item">
      <span class="ba-activity-emoji"><svg style="width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${a.emoji}"/></svg></span>
      <span class="ba-activity-name">${a.name}</span>
      <span class="ba-activity-cat ${BA_CAT_CSS[a.cat]||''}">${BA_CAT_EMOJI[a.cat]||''} ${a.cat}</span>
      <button onclick="baDeleteActivity(${i})" style="background:none;border:none;cursor:pointer;color:var(--text-3);font-size:12px;opacity:.4;padding:0 2px;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.4">✕</button>
    </div>`).join('');
}
function baRenderPlanner(){
  const planner=baGetPlanner();const el=document.getElementById('ba-planner');if(!el)return;
  const now=new Date();
  const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const todayName=dayNames[now.getDay()];
  const weekDates=BA_DAYS.map((d,i)=>{const diff=(i+1)-(now.getDay()===0?7:now.getDay());const dt=new Date(now);dt.setDate(now.getDate()+diff);return dt;});
  const baWeekLabel = document.getElementById('ba-week-label');
  if(baWeekLabel) baWeekLabel.textContent=weekDates[0].toLocaleDateString('en-IN',{month:'short',day:'numeric'})+' – '+weekDates[6].toLocaleDateString('en-IN',{month:'short',day:'numeric'});
  const cols=`display:grid;grid-template-columns:46px repeat(${BA_DAYS.length},1fr);gap:5px;`;
  let html=`<div style="${cols}margin-bottom:4px;"><div></div>`;
  BA_DAYS.forEach((d,i)=>{const isToday=(d===todayName);html+=`<div class="ba-day-header ${isToday?'today':''}">${d}<br><span style="font-size:10px;opacity:.6;">${weekDates[i].getDate()}</span></div>`;});
  html+=`</div>`;
  BA_SLOTS.forEach(slot=>{
    html+=`<div style="${cols}">`;
    html+=`<div class="ba-time-label">${slot}</div>`;
    BA_DAYS.forEach(day=>{
      const key=`${day}_${slot}`;const item=planner[key];
      if(item){
        const pips=[1,2,3,4,5].map(v=>`<span style="display:inline-block;width:7px;height:4px;border-radius:100px;background:v<=item.mood?'var(--accent)':'var(--surface-3)';"></span>`).join('');
        html+=`<div class="ba-slot filled ${item.done?'done':''}" onclick="baSlotClick('${day}','${slot}')">
          <div class="ba-slot-name">${item.name}</div>
          <div class="ba-slot-meta">${pips}${item.done?' · ✓':''}</div>
        </div>`;
      }else{
        html+=`<div class="ba-slot" onclick="baOpenModal('${day}','${slot}')"><div class="ba-slot-plus">+</div></div>`;
      }
    });
    html+=`</div>`;
  });
  el.innerHTML=html;
  baMoodImpact();baCatBalance();
}
function baSlotClick(day,slot){
  const planner=baGetPlanner();const key=`${day}_${slot}`;const item=planner[key];if(!item)return;
  item.done=!item.done;planner[key]=item;baSavePlanner(planner);baRenderPlanner();
  showToast(item.done?`✓ ${item.name} done!`:item.name+' unmarked');
}
function baOpenModal(day,slot){
  baModalSlot={day,slot};baModalMood=3;
  document.getElementById('ba-modal-slot-lbl').textContent=`${day} · ${slot}`;
  baUpdateModalActs();
  document.querySelectorAll('.ba-mood-pip-btn').forEach(b=>b.classList.remove('sel'));
  const pip3 = document.querySelector('.ba-mood-pip-btn[data-v="3"]');
  if(pip3) pip3.classList.add('sel');
  document.getElementById('ba-modal-notes').value='';
  document.getElementById('ba-modal').classList.add('open');
}
function baUpdateModalActs(){
  const acts=baGetActivities();const sel=document.getElementById('ba-modal-act');if(!sel)return;
  sel.innerHTML=acts.map(a=>`<option data-emoji="${a.emoji}" data-cat="${a.cat}">${a.name}</option>`).join('');
}
function baSelMood(btn){document.querySelectorAll('.ba-mood-pip-btn').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');baModalMood=parseInt(btn.dataset.v);}
function baCloseModal(){document.getElementById('ba-modal').classList.remove('open');baModalSlot=null;}
function baSaveSlot(){
  if(!baModalSlot)return;
  const sel=document.getElementById('ba-modal-act');const name=sel.value;
  const opt=sel.options[sel.selectedIndex];
  const planner=baGetPlanner();
  const {day,slot}=baModalSlot;
  planner[`${day}_${slot}`]={name,emoji:'target',cat:opt?opt.dataset.cat:'rest',mood:baModalMood,notes:document.getElementById('ba-modal-notes').value.trim(),done:false,date:new Date().toISOString()};
  baSavePlanner(planner);baCloseModal();baRenderPlanner();
  showToast(`"${name}" scheduled for ${day} at ${slot}`);
}
function baClearPlanner(){if(!confirm('Clear the entire week\'s plan?'))return;localStorage.setItem('ba_plan','{}');baRenderPlanner();}
function baMoodImpact(){
  const planner=baGetPlanner();const done=Object.values(planner).filter(v=>v&&v.done);
  const el=document.getElementById('ba-mood-impact');if(!el)return;
  if(!done.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">Mark activities as done to track mood impact.</div>';return;}
  const catCols={pleasure:'var(--accent)',mastery:'#4A7BA8',social:'var(--green)',physical:'#B8860B',rest:'#7B6DAA',creative:'#0A0A0A'};
  el.innerHTML=done.slice(0,7).map(item=>`
    <div class="ba-mood-bar-row">
      <div class="ba-mood-bar-label">${item.name}</div>
      <div class="ba-mood-bar-track"><div class="ba-mood-bar-fill" style="width:${item.mood/5*100}%;background:${catCols[item.cat]||'var(--accent)'}"></div></div>
      <div class="ba-mood-bar-emoji">${BA_MOOD_EMOJIS[item.mood-1]||''}</div>
    </div>`).join('');
}
function baCatBalance(){
  const planner=baGetPlanner();const all=Object.values(planner).filter(Boolean);
  const el=document.getElementById('ba-cat-chips');if(!el)return;
  if(!all.length){el.innerHTML='<div style="font-size:12px;color:var(--text-3);">Schedule activities to see balance.</div>';return;}
  const counts={};all.forEach(item=>{counts[item.cat]=(counts[item.cat]||0)+1;});
  el.innerHTML=Object.entries(counts).map(([cat,n])=>`<span class="chip ${BA_CAT_CSS[cat]||''}" style="cursor:default;">${BA_CAT_EMOJI[cat]||''} ${cat} <strong>${n}</strong></span>`).join('');
}

/* init */
baRenderBank();baUpdateModalActs();
const baModalOverlay = document.getElementById('ba-modal');
if(baModalOverlay) baModalOverlay.addEventListener('click',function(e){if(e.target===this)baCloseModal();});
const pmrRing = document.getElementById('pmr-ring');
if(pmrRing) {
  pmrRing.style.strokeDasharray=PMR_CIRC;
  pmrRing.style.strokeDashoffset=PMR_CIRC;
}

/* ═══ BRAIN DUMP ═══ */
let dumpItems=[], dumpCurrentFilter='all';
const DUMP_KW={
  task:['need to','should','must','have to','todo','to do','don\'t forget','remember to','call','email','buy','fix','send','pay','book','finish','complete','submit','reply','schedule','clean','pick up','order','print','check','follow up','prepare','review','update','write up','fill in','apply','attend','meet','return','cancel','renew','sign','upload','download','research','find','get','make appointment','need','have to','want to','plan to','going to','going to'],
  worry:['worried','anxious','scared','afraid','what if','might','could go wrong','nervous','fear','stress','panic','dread','uncertain','hope','please','hopefully','concerned','uneasy','unsure','not sure','don\'t know','terrible','awful','bad','wrong','failing','fail','not enough','hate','can\'t','won\'t work','problem','trouble','issue','difficult','hard','struggle','hurt','pain','ache','sick','ill','tired of','fed up','can\'t stop thinking','keeps coming back','worrying','overthinking'],
  idea:['idea','could','maybe','what about','imagine','should try','would be cool','could build','start','create','make','design','write','what if i','wondering','think about','consider','explore','experiment','try out','would love to','vision','concept','brainstorm','inspiration','sparked','thought of','dream','plan','project','side project','app','business','story','blog','book','song','art','build','launch','pitch','prototype'],
  feeling:['feel','feeling','emotion','sad','happy','angry','frustrated','tired','exhausted','confused','overwhelmed','lonely','proud','ashamed','excited','grateful','numb','low','down','flat','empty','hopeless','hopeful','content','peaceful','restless','irritable','bored','anxious','nervous','calm','energised','motivated','demotivated','inspired','deflated','joyful','melancholy','grief','grieving','missing','nostalgic','heartbroken','heart','love','hate','mood','emotional','crying','cried','laughed','laughing','smile','smiling','hurt','hurting','pain','suffering','struggling','lost']
};
function dumpProcess(){
  const raw=document.getElementById('dump-raw').value.trim();
  if(!raw){showToast('Write something first ');return;}
  const lines=raw.split(/\n/).map(l=>l.trim()).filter(l=>l.length>2);
  dumpItems=lines.map(line=>{
    const ll=line.toLowerCase();
    let cat='other';
    for(const[c,kws]of Object.entries(DUMP_KW)){
      if(kws.some(kw=>ll.includes(kw))){cat=c;break;}
    }
    return{text:line,cat};
  });
  dumpRender();
  showToast(`Sorted ${dumpItems.length} item${dumpItems.length!==1?'s':''} `);
}
function dumpRender(){
  const el=document.getElementById('dump-sorted-list');
  const empty=document.getElementById('dump-empty-state');
  if(!el)return;
  const filtered=dumpCurrentFilter==='all'?dumpItems:dumpItems.filter(d=>d.cat===dumpCurrentFilter);
  if(!filtered.length){
    el.innerHTML='';
    if(empty)empty.style.display='block';
    return;
  }
  if(empty)empty.style.display='none';
  const catIcons={task:'',worry:'',idea:'',feeling:'',other:''};
  el.innerHTML=filtered.map((d,i)=>`
    <div class="dump-item">
      <span class="dump-cat-badge dump-cat-${d.cat}">${catIcons[d.cat]||''} ${d.cat}</span>
      <span class="dump-item-text">${d.text}</span>
    </div>`).join('');
}
function dumpFilter(el){
  dumpCurrentFilter=el.dataset.f;
  document.querySelectorAll('.dump-filter-row .chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  dumpRender();
}
function dumpClear(){
  const dumpRaw = document.getElementById('dump-raw');
  if(dumpRaw) dumpRaw.value='';
  dumpItems=[];
  dumpCurrentFilter='all';
  document.querySelectorAll('.dump-filter-row .chip').forEach(c=>c.classList.remove('active'));
  const allFilter = document.querySelector('.dump-filter-row .chip[data-f="all"]');
  if(allFilter) allFilter.classList.add('active');
  dumpRender();
}

/* ══ PRIORITY MATRIX ══ */
function mxGet(){return JSON.parse(localStorage.getItem('matrix')||JSON.stringify({do:[],schedule:[],delegate:[],eliminate:[]}));}
function mxSave(m){localStorage.setItem('matrix',JSON.stringify(m));}
function mxRender(){
  const m=mxGet();
  ['do','schedule','delegate','eliminate'].forEach(q=>{
    const el=document.getElementById('mq-'+q);
    if(!el)return;
    el.innerHTML=(m[q]||[]).map((item,i)=>`
      <div class="mq-item">
        <span class="mq-item-text">${item}</span>
        <button class="mq-item-del" onclick="mxDelete('${q}',${i})">✕</button>
      </div>`).join('');
  });
}
function mxAdd(){
  const v=document.getElementById('mx-inp').value.trim();
  if(!v)return;
  const q=document.getElementById('mx-quad').value;
  const m=mxGet();
  if(!m[q])m[q]=[];
  m[q].push(v);
  mxSave(m);
  document.getElementById('mx-inp').value='';
  mxRender();
}
function mxDelete(q,i){
  const m=mxGet();
  m[q].splice(i,1);
  mxSave(m);
  mxRender();
}
function mxClear(){
  if(!confirm('Clear all tasks from the matrix?'))return;
  mxSave({do:[],schedule:[],delegate:[],eliminate:[]});
  mxRender();
}
mxRender();

/* ══ DISTRACTION LOG ══ */
let distSelCatVal='other', distSelSevVal='med';
function distSelCat(btn){
  document.querySelectorAll('.dist-cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  distSelCatVal=btn.dataset.cat;
}
function distSelSev(btn){
  document.querySelectorAll('.dist-sev-btn').forEach(b=>b.className='dist-sev-btn');
  btn.classList.add('sel-'+btn.dataset.s);
  distSelSevVal=btn.dataset.s;
}
const DIST_ICONS={phone:'ic-phone',social:'ic-message',thought:'ic-brain',noise:'ic-volume',hunger:'ic-coffee',fatigue:'ic-moon',email:'ic-feather',person:'ic-person',other:'ic-tool'};
function distLog(){
  const what=document.getElementById('dist-what').value.trim();
  if(!what){showToast('What distracted you?');return;}
  const hist=JSON.parse(localStorage.getItem('distractions')||'[]');
  hist.unshift({what,cat:distSelCatVal,task:document.getElementById('dist-task').value.trim(),severity:distSelSevVal,note:document.getElementById('dist-note').value.trim(),date:new Date().toISOString()});
  localStorage.setItem('distractions',JSON.stringify(hist.slice(0,150)));
  ['dist-what','dist-task','dist-note'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  document.querySelectorAll('.dist-cat-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.dist-sev-btn').forEach(b=>b.className='dist-sev-btn');
  distSelCatVal='other'; distSelSevVal='med';
  distRenderHist();
  showToast('Distraction logged ');
}
function distRenderHist(){
  const hist=JSON.parse(localStorage.getItem('distractions')||'[]');
  const el=document.getElementById('dist-history');
  if(!el)return;
  if(!hist.length){el.innerHTML='<div style="color:var(--text-3);font-size:13px;">No distractions logged yet.</div>';return;}
  const sevMap={low:'dist-sev-low',med:'dist-sev-med',high:'dist-sev-high'};
  const sevLabel={low:'Low',med:'Medium',high:'High'};
  el.innerHTML=hist.slice(0,20).map(d=>{
    const dt=new Date(d.date);
    const ts=dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})+' · '+dt.toLocaleDateString('en-IN',{month:'short',day:'numeric'});
    return`<div class="dist-item">
      <div class="dist-item-icon"><svg style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#${DIST_ICONS[d.cat]||'ic-tool'}"/></svg></div>
      <div style="flex:1;">
        <div class="dist-item-what">${d.what}</div>
        <div class="dist-item-meta">${ts}${d.task?' · working on: '+d.task:''}</div>
        ${d.note?`<div style="font-size:11.5px;color:var(--text-3);margin-top:2px;font-style:italic;">${d.note}</div>`:''}
      </div>
      <span class="dist-sev-pill ${sevMap[d.severity]||'dist-sev-med'}">${sevLabel[d.severity]||'Med'}</span>
    </div>`;
  }).join('');
  distAnalyse(hist);
}
function distAnalyse(hist){
  const el=document.getElementById('dist-pattern-text');
  if(!el||hist.length<5)return;
  const cats={}, sevCounts={low:0,med:0,high:0};
  hist.forEach(d=>{
    cats[d.cat]=(cats[d.cat]||0)+1;
    sevCounts[d.severity]=(sevCounts[d.severity]||0)+1;
  });
  const top=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const highPct=Math.round(sevCounts.high/hist.length*100);
  el.textContent=`Top distractions: ${top.map(([k,v])=>`${k} (${v}×)`).join(', ')}. ${highPct>20?`${highPct}% rated High-severity — consider reviewing your environment.`:'Most are low-to-medium impact — good sign.'}`;
}

/* ══ BODY DOUBLING ══ */
let bdRunning=false,bdInt=null,bdMsgInt=null,bdSec=0,bdTotal=25*60,bdMsgIdx=0;
const BD_MSGS=[
  "You're doing great. Keep going — I'm right here.",
  "One thing at a time. You've got this.",
  "It's okay if it's not perfect. Just keep moving.",
  "Every minute you focus is a win. Stay with it.",
  "You started — that's the hardest part. Just continue.",
  "I see you working. This matters.",
  "Feeling restless? Take a breath and return.",
  "You're not alone in this. Let's finish together.",
  "Small progress is still progress.",
  "Your future self will thank you for this moment.",
  "Proud of you for showing up today.",
  "Stay with it. You're closer than you think.",
];
function bdSetDur(s){bdTotal=s;if(!bdRunning){bdSec=0;bdUpdateDisplay();}}
function bdUpdateDisplay(){
  const m=Math.floor(bdSec/60),s=bdSec%60;
  const bdTimer = document.getElementById('bd-timer');
  if(bdTimer) bdTimer.textContent=`${m}:${String(s).padStart(2,'0')}`;
}
function bdToggle(){
  const bdBtn = document.getElementById('bd-btn');
  const bdStatus = document.getElementById('bd-status');
  if(bdRunning){
    clearInterval(bdInt);clearInterval(bdMsgInt);bdRunning=false;
    if(bdBtn) bdBtn.textContent='▶ Resume';
    if(bdStatus) bdStatus.textContent='Paused.';
    return;
  }
  const task=document.getElementById('bd-task-inp').value.trim();
  if(!task){showToast('What will you work on?');return;}
  const bdTaskDisplay = document.getElementById('bd-task-display');
  if(bdTaskDisplay) {
    bdTaskDisplay.textContent='Working on: '+task;
    bdTaskDisplay.style.display='block';
  }
  const taskInpWrap = document.getElementById('bd-task-inp').closest('div');
  if(taskInpWrap) taskInpWrap.style.display='none';
  bdRunning=true;
  if(bdBtn) bdBtn.textContent='⏸ Pause';
  if(bdStatus) bdStatus.textContent='In session — I\'m here with you.';
  bdShowMsg();
  bdMsgInt=setInterval(bdShowMsg,18000);
  bdInt=setInterval(()=>{
    bdSec++;bdUpdateDisplay();
    if(bdSec>=bdTotal){
      clearInterval(bdInt);clearInterval(bdMsgInt);
      bdRunning=false;
      if(bdBtn) bdBtn.textContent='▶ Begin Session';
      if(bdStatus) bdStatus.textContent='Session complete!';
      const msgEl=document.getElementById('bd-message');
      if(msgEl) {
        msgEl.style.opacity=0;
        setTimeout(()=>{msgEl.textContent='Amazing work. You stayed with it. Acknowledge what you just accomplished — that took real effort.';msgEl.style.opacity=1;},400);
      }
      const n=parseInt(localStorage.getItem('focus_sessions')||'0')+1;
      localStorage.setItem('focus_sessions',n);
      updateStats();
    }
  },1000);
}
function bdShowMsg(){
  const el=document.getElementById('bd-message');if(!el)return;
  el.style.opacity=0;
  setTimeout(()=>{el.textContent=BD_MSGS[bdMsgIdx%BD_MSGS.length];el.style.opacity=1;bdMsgIdx++;},400);
}
function bdReset(){
  clearInterval(bdInt);clearInterval(bdMsgInt);
  bdRunning=false;bdSec=0;bdMsgIdx=0;
  const bdBtn = document.getElementById('bd-btn');
  if(bdBtn) bdBtn.textContent='▶ Begin Session';
  const bdStatus = document.getElementById('bd-status');
  if(bdStatus) bdStatus.textContent='Your companion is ready when you are.';
  const bdMessage = document.getElementById('bd-message');
  if(bdMessage) {
    bdMessage.textContent='Pick a task above and begin your session. I\'ll be right here with you.';
    bdMessage.style.opacity=1;
  }
  const bdTaskDisplay = document.getElementById('bd-task-display');
  if(bdTaskDisplay) bdTaskDisplay.style.display='none';
  const taskRow=document.getElementById('bd-task-row');
  if(taskRow)taskRow.style.display='flex';
  const bdTaskInp = document.getElementById('bd-task-inp');
  if(bdTaskInp) bdTaskInp.value='';
  bdUpdateDisplay();
}
function bdStart(){if(document.getElementById('bd-task-inp').value.trim())bdToggle();}
bdUpdateDisplay();

/* ══ GUIDED PROMPTS ══ */
const PROMPTS=[
  {cat:'anxiety',badge:'Anxiety',col:'background:var(--danger-bg);color:var(--danger);',
    text:'What is my anxiety trying to protect me from right now? Is that protection actually helping me?'},
  {cat:'anxiety',badge:'Anxiety',col:'background:var(--danger-bg);color:var(--danger);',
    text:'What is one thing — however small — that is within my control right now?'},
  {cat:'anxiety',badge:'Anxiety',col:'background:var(--danger-bg);color:var(--danger);',
    text:'If a dear friend were feeling exactly what I\'m feeling, what would I say to them?'},
  {cat:'anxiety',badge:'Anxiety',col:'background:var(--danger-bg);color:var(--danger);',
    text:'What\'s the difference between what I fear will happen and what is most likely to happen?'},
  {cat:'anxiety',badge:'Anxiety',col:'background:var(--danger-bg);color:var(--danger);',
    text:'Where do I feel this anxiety in my body right now? What does it need?'},
  {cat:'depression',badge:'Depression',col:'background:#EDF2F8;color:#4A7BA8;',
    text:'What is one tiny thing that used to bring me joy? Can I bring even 5 minutes of it into today?'},
  {cat:'depression',badge:'Depression',col:'background:#EDF2F8;color:#4A7BA8;',
    text:'What\'s the difference between how I see myself right now and how someone who loves me sees me?'},
  {cat:'depression',badge:'Depression',col:'background:#EDF2F8;color:#4A7BA8;',
    text:'What would I need to believe about myself to feel even 10% better today?'},
  {cat:'depression',badge:'Depression',col:'background:#EDF2F8;color:#4A7BA8;',
    text:'Who are the people who genuinely care about me? How does it feel to sit with that for a moment?'},
  {cat:'depression',badge:'Depression',col:'background:#EDF2F8;color:#4A7BA8;',
    text:'What have I been avoiding that, if I did it, would give me a small sense of accomplishment?'},
  {cat:'adhd',badge:'ADHD',col:'background:#F2EFF8;color:#7B6DAA;',
    text:'What is the single most important thing I need to do today? Just one.'},
  {cat:'adhd',badge:'ADHD',col:'background:#F2EFF8;color:#7B6DAA;',
    text:'When do I feel most like myself — most alive and engaged? What am I doing in those moments?'},
  {cat:'adhd',badge:'ADHD',col:'background:#F2EFF8;color:#7B6DAA;',
    text:'What has gone well this week, even imperfectly? What am I not giving myself credit for?'},
  {cat:'adhd',badge:'ADHD',col:'background:#F2EFF8;color:#7B6DAA;',
    text:'What environment helps me focus best? What would it take to create that right now?'},
  {cat:'growth',badge:'Growth',col:'background:var(--green-bg);color:var(--green);',
    text:'What have I learned about myself recently that surprised me?'},
  {cat:'growth',badge:'Growth',col:'background:var(--green-bg);color:var(--green);',
    text:'What belief about myself am I ready to let go of?'},
  {cat:'growth',badge:'Growth',col:'background:var(--green-bg);color:var(--green);',
    text:'In what ways have I grown in the past year that I haven\'t given myself credit for?'},
  {cat:'growth',badge:'Growth',col:'background:var(--green-bg);color:var(--green);',
    text:'What would a life fully aligned with my values look like one year from now?'},
  {cat:'values',badge:'Values',col:'background:#FEF9F0;color:#B8860B;',
    text:'Am I living in alignment with my values today? Where is the gap — and is it okay?'},
  {cat:'values',badge:'Values',col:'background:#FEF9F0;color:#B8860B;',
    text:'What does rest mean to me, and am I actually getting enough of it?'},
  {cat:'values',badge:'Values',col:'background:#FEF9F0;color:#B8860B;',
    text:'What relationships in my life reflect who I want to be — and which ones don\'t?'},
  {cat:'general',badge:'Reflection',col:'background:var(--surface-2);color:var(--text-2);',
    text:'If this moment were a chapter in a book about my life, what would its title be?'},
  {cat:'general',badge:'Reflection',col:'background:var(--surface-2);color:var(--text-2);',
    text:'What does my body need right now that my mind keeps ignoring?'},
  {cat:'general',badge:'Reflection',col:'background:var(--surface-2);color:var(--text-2);',
    text:'What am I holding onto that I could put down — at least for today?'},
  {cat:'general',badge:'Reflection',col:'background:var(--surface-2);color:var(--text-2);',
    text:'What would make today feel complete, even if everything doesn\'t go perfectly?'},
];
let promptFilter='all', promptIdx=0, promptFiltered=[...PROMPTS];

function promptInitCats(){
  const el=document.getElementById('prompt-cat-filter');if(!el)return;
  const cats=[{k:'all',label:'All'},{k:'anxiety',label:'Anxiety'},{k:'depression',label:'Depression'},{k:'adhd',label:'ADHD'},{k:'growth',label:'Growth'},{k:'values',label:'Values'},{k:'general',label:'Reflection'}];
  el.innerHTML=cats.map(c=>`<span class="chip ${c.k===promptFilter?'active':''}" onclick="promptSetCat('${c.k}')">${c.label}</span>`).join('');
}
function promptSetCat(cat){
  promptFilter=cat;promptIdx=0;
  promptFiltered=cat==='all'?[...PROMPTS]:PROMPTS.filter(p=>p.cat===cat);
  promptInitCats();promptShowCurrent();
}
function promptShowCurrent(){
  if(!promptFiltered.length)return;
  const p=promptFiltered[promptIdx];
  const badge=document.getElementById('prompt-badge');
  const text=document.getElementById('prompt-text');
  if(badge){badge.textContent=p.badge;badge.style.cssText=p.col;}
  if(text){text.style.opacity=0;setTimeout(()=>{text.textContent=p.text;text.style.opacity=1;},200);}
}
function promptNext(){promptIdx=(promptIdx+1)%promptFiltered.length;promptShowCurrent();}
function promptPrev(){promptIdx=(promptIdx-1+promptFiltered.length)%promptFiltered.length;promptShowCurrent();}
function promptSave(){
  const resp=document.getElementById('prompt-resp').value.trim();
  if(!resp){showToast('Write something first ');return;}
  const p=promptFiltered[promptIdx];
  const saved=JSON.parse(localStorage.getItem('prompt_responses')||'[]');
  saved.unshift({prompt:p.text,badge:p.badge,col:p.col,response:resp,date:new Date().toISOString()});
  localStorage.setItem('prompt_responses',JSON.stringify(saved.slice(0,60)));
  document.getElementById('prompt-resp').value='';
  promptRenderSaved();promptNext();showToast('Response saved ');
}
function promptRenderSaved(){
  const saved=JSON.parse(localStorage.getItem('prompt_responses')||'[]');
  const el=document.getElementById('prompt-saved-list');if(!el)return;
  if(!saved.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">Saved responses will appear here.</div>';return;}
  el.innerHTML=saved.map(s=>{
    const d=new Date(s.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    return`<div class="prompt-saved-item">
      <div class="prompt-saved-q">${s.prompt}</div>
      <div class="prompt-saved-resp">${s.response}</div>
      <div class="prompt-saved-date">${d}</div>
    </div>`;
  }).join('');
}
function promptClearSaved(){
  if(!confirm('Clear all saved responses?'))return;
  localStorage.setItem('prompt_responses','[]');promptRenderSaved();
}

/* ══ TRIGGER TRACKER ══ */
let trigSevVal='mod';
function trigSelSev(btn){
  document.querySelectorAll('.trig-sev-btn').forEach(b=>b.className='trig-sev-btn');
  btn.classList.add('sel-'+btn.dataset.s);trigSevVal=btn.dataset.s;
}
function trigSave(){
  const trigger=document.getElementById('trig-trigger').value.trim();
  if(!trigger){showToast('What triggered you?');return;}
  const hist=JSON.parse(localStorage.getItem('triggers')||'[]');
  hist.unshift({
    trigger,
    context:document.getElementById('trig-context').value.trim(),
    response:document.getElementById('trig-response').value.trim(),
    severity:trigSevVal,
    coping:document.getElementById('trig-coping').value.trim(),
    date:new Date().toISOString()
  });
  localStorage.setItem('triggers',JSON.stringify(hist.slice(0,100)));
  ['trig-trigger','trig-context','trig-response','trig-coping'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  document.querySelectorAll('.trig-sev-btn').forEach(b=>b.className='trig-sev-btn');
  trigSevVal='mod';
  trigRenderHist();showToast('Trigger logged ');
}
function trigRenderHist(){
  const hist=JSON.parse(localStorage.getItem('triggers')||'[]');
  const el=document.getElementById('trig-history');if(!el)return;
  if(!hist.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">No triggers logged yet.</div>';return;}
  const sevMap={mild:{cls:'tsev-mild',lbl:'Mild'},mod:{cls:'tsev-mod',lbl:'Moderate'},intense:{cls:'tsev-intense',lbl:'Intense'}};
  el.innerHTML=hist.map(t=>{
    const s=sevMap[t.severity]||sevMap.mod;
    const d=new Date(t.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
    return`<div class="trig-item">
      <div class="trig-item-top">
        <div class="trig-item-trigger">${t.trigger}</div>
        <span class="trig-sev-badge ${s.cls}">${s.lbl}</span>
      </div>
      <div class="trig-item-detail">
        ${t.context?`<em>${t.context}</em> · `:''}<span>${d}</span>
        ${t.response?`<br>${t.response}`:''}
        ${t.coping?`<br><strong>Helped:</strong> ${t.coping}`:''}
      </div>
    </div>`;
  }).join('');
  trigAnalyse(hist);
}
function trigAnalyse(hist){
  const el=document.getElementById('trig-pattern-text');if(!el||hist.length<5)return;
  const words={},sevCounts={mild:0,mod:0,intense:0};
  hist.forEach(t=>{
    sevCounts[t.severity]=(sevCounts[t.severity]||0)+1;
    t.trigger.toLowerCase().split(/\s+/).forEach(w=>{if(w.length>4)words[w]=(words[w]||0)+1;});
  });
  const top=Object.entries(words).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([w])=>w);
  const intense=sevCounts.intense,total=hist.length;
  el.textContent=`${total} triggers logged. ${intense} rated intense (${Math.round(intense/total*100)}%). Recurring themes: ${top.join(', ')}. Consider sharing these patterns with a therapist.`;
}

/* ══ ENERGY & MOOD ══ */
function emUpdate(){
  document.getElementById('em-energy-val').textContent=document.getElementById('em-energy').value;
  document.getElementById('em-mood-val').textContent=document.getElementById('em-mood').value;
}
function emSave(){
  const energy=parseInt(document.getElementById('em-energy').value);
  const mood=parseInt(document.getElementById('em-mood').value);
  const factors=[...document.querySelectorAll('#em-factor-chips .chip.active')].map(c=>c.textContent.trim());
  const note=document.getElementById('em-note').value.trim();
  const log=JSON.parse(localStorage.getItem('em_log')||'[]');
  log.unshift({energy,mood,factors,note,date:new Date().toISOString()});
  localStorage.setItem('em_log',JSON.stringify(log.slice(0,200)));
  document.getElementById('em-note').value='';
  document.querySelectorAll('#em-factor-chips .chip').forEach(c=>c.classList.remove('active'));
  emRenderHistory();emDrawTodayChart();showToast('Energy & mood logged ');
}
function emRenderHistory(){
  const log=JSON.parse(localStorage.getItem('em_log')||'[]');
  const el=document.getElementById('em-history');if(!el)return;
  if(!log.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">No entries yet.</div>';return;}
  el.innerHTML=log.slice(0,30).map(e=>{
    const d=new Date(e.date);
    const ds=d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})+' · '+d.toLocaleDateString('en-IN',{month:'short',day:'numeric'});
    return`<div class="em-entry">
      <div class="em-entry-date">${ds}</div>
      <div class="em-entry-bars">
        <div class="em-bar-wrap">
          <div class="em-bar-track"><div class="em-bar-fill" style="width:${e.energy/10*100}%;background:var(--accent);"></div></div>
          <div class="em-bar-lbl">Energy ${e.energy}</div>
        </div>
        <div class="em-bar-wrap">
          <div class="em-bar-track"><div class="em-bar-fill" style="width:${e.mood/10*100}%;background:#4A7BA8;"></div></div>
          <div class="em-bar-lbl">Mood ${e.mood}</div>
        </div>
      </div>
      ${e.factors&&e.factors.length?`<div class="em-entry-note">${e.factors.slice(0,2).join(', ')}</div>`:''}
    </div>`;
  }).join('');
  emShowInsight(log);
}
function emShowInsight(log){
  const box=document.getElementById('em-insight');if(!box)return;
  if(log.length<3){box.style.display='none';return;}
  const recent=log.slice(0,7);
  const avgE=recent.reduce((a,e)=>a+e.energy,0)/recent.length;
  const avgM=recent.reduce((a,e)=>a+e.mood,0)/recent.length;
  const gap=Math.abs(avgE-avgM);
  let insight='';
  if(avgE<4&&avgM>5)insight='Your mood is higher than your energy lately — rest is doing something right, even if it doesn\'t feel productive.';
  else if(avgM<4&&avgE>5)insight='You have energy but mood is low. This is common with depression. Consider channelling energy into one small activating task.';
  else if(avgE<4&&avgM<4)insight='Both energy and mood are low right now. Be gentle with yourself — basic self-care first: sleep, water, movement.';
  else if(avgE>7&&avgM>7)insight='Both energy and mood are strong. Capture this window — it\'s a good time for important tasks or meaningful connections.';
  else insight=`Avg energy: ${avgE.toFixed(1)}/10 · Avg mood: ${avgM.toFixed(1)}/10 over your last ${recent.length} entries.`;
  box.textContent=insight;box.style.display='block';
}
function emDrawTodayChart(){
  const canvas=document.getElementById('em-today-chart');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.parentElement.offsetWidth-44;canvas.width=W;canvas.height=140;
  const today=new Date().toDateString();
  const log=JSON.parse(localStorage.getItem('em_log')||'[]');
  const todayData=log.filter(e=>new Date(e.date).toDateString()===today).reverse();
  ctx.clearRect(0,0,W,140);
  if(!todayData.length){
    ctx.font='13px DM Sans';ctx.fillStyle='#5E5E5E';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('Log entries to see today\'s pattern',W/2,70);return;
  }
  const pad={t:14,b:24,l:26,r:12};const pw=W-pad.l-pad.r,ph=140-pad.t-pad.b;
  const xs=todayData.map((_,i)=>pad.l+(todayData.length>1?i/(todayData.length-1):0.5)*pw);
  [['energy','#0A0A0A'],['mood','#4A7BA8']].forEach(([key,color])=>{
    ctx.beginPath();let first=true;
    todayData.forEach((d,i)=>{
      const y=pad.t+ph-(d[key]-1)/9*ph;
      if(first){ctx.moveTo(xs[i],y);first=false;}else ctx.lineTo(xs[i],y);
    });
    ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
    todayData.forEach((d,i)=>{
      const y=pad.t+ph-(d[key]-1)/9*ph;
      ctx.beginPath();ctx.arc(xs[i],y,4,0,2*Math.PI);
      ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
    });
  });
  ctx.font='10px DM Sans';ctx.fillStyle='#0A0A0A';ctx.textAlign='left';ctx.fillText('Energy',pad.l,138);
  ctx.fillStyle='#234F7A';ctx.textAlign='right';ctx.fillText('Mood',W-pad.r,138);
}

/* ══ AFFIRMATIONS ══ */
const AFFIRMS_DATA=[
  {text:"I am worthy of love, kindness, and belonging — exactly as I am.",cat:"Self Worth"},
  {text:"My value is not determined by my productivity or what I produce.",cat:"Self Worth"},
  {text:"I deserve rest without guilt. Rest is not laziness.",cat:"Self Worth"},
  {text:"I am allowed to take up space. My needs matter.",cat:"Self Worth"},
  {text:"I am enough, right now, in this moment.",cat:"Self Worth"},
  {text:"I have survived every difficult day so far — my track record is 100%.",cat:"Resilience"},
  {text:"Healing is not linear. Today's struggle is not a step backward.",cat:"Resilience"},
  {text:"I am not my anxiety. I am the one who notices it.",cat:"Resilience"},
  {text:"This feeling is temporary. I have moved through hard things before.",cat:"Resilience"},
  {text:"I don't have to be perfect to be worthy of love and care.",cat:"Resilience"},
  {text:"Right now, in this breath, I am safe.",cat:"Calm"},
  {text:"I release what I cannot control. My peace matters more.",cat:"Calm"},
  {text:"My body is not my enemy — it is doing its best to protect me.",cat:"Calm"},
  {text:"I choose to respond rather than react. I have the capacity for that.",cat:"Calm"},
  {text:"I can be gentle with myself and still move forward.",cat:"Calm"},
  {text:"My brain is different, not broken. Different is not less.",cat:"ADHD"},
  {text:"I can do hard things, even when I do them imperfectly.",cat:"ADHD"},
  {text:"Starting is the hardest part. I only need to begin.",cat:"ADHD"},
  {text:"My creativity, curiosity, and passion are gifts — not liabilities.",cat:"ADHD"},
  {text:"I am not lazy. I am working with a brain that needs different support.",cat:"ADHD"},
  {text:"Brighter days are ahead, even when I can't see them from here.",cat:"Hope"},
  {text:"Every small step forward is still forward.",cat:"Hope"},
  {text:"Something good is possible today. I stay open to it.",cat:"Hope"},
  {text:"I am becoming. Growth doesn't always look like progress.",cat:"Hope"},
  {text:"I have more strength than I know, revealed when I need it most.",cat:"Hope"},
];
const AFFIRM_CATS=['All','Self Worth','Resilience','Calm','ADHD','Hope'];
const AFFIRM_CAT_COLS={'Self Worth':'background:var(--acc-bg, var(--accent-bg));color:var(--accent);','Resilience':'background:#EDF2F8;color:#4A7BA8;','Calm':'background:var(--green-bg);color:var(--green);','ADHD':'background:#F2EFF8;color:#7B6DAA;','Hope':'background:#FEF9F0;color:#B8860B;','All':'background:var(--surface-2);color:var(--text-2);'};
let affirmCat='All',affirmIdx=0,affirmFiltered=[...AFFIRMS_DATA];

function affirmInitCats(){
  const el=document.getElementById('affirm-cat-filter');if(!el)return;
  el.innerHTML=AFFIRM_CATS.map(c=>`<span class="chip ${c===affirmCat?'active':''}" onclick="affirmSetCat('${c}')">${c}</span>`).join('');
}
function affirmSetCat(cat){
  affirmCat=cat;affirmIdx=0;
  affirmFiltered=cat==='All'?[...AFFIRMS_DATA]:AFFIRMS_DATA.filter(a=>a.cat===cat);
  affirmInitCats();affirmShow();
}
function affirmShow(){
  if(!affirmFiltered.length)return;
  const a=affirmFiltered[affirmIdx];
  const textEl=document.getElementById('affirm-text');
  const labelEl=document.getElementById('affirm-cat-label');
  if(textEl){textEl.style.opacity=0;setTimeout(()=>{textEl.textContent=a.text;textEl.style.opacity=1;},200);}
  if(labelEl)labelEl.textContent=a.cat;
}
function affirmNext(){affirmIdx=(affirmIdx+1)%affirmFiltered.length;affirmShow();}
function affirmPrev(){affirmIdx=(affirmIdx-1+affirmFiltered.length)%affirmFiltered.length;affirmShow();}
function affirmSaveCurrent(){
  const a=affirmFiltered[affirmIdx];
  const saved=JSON.parse(localStorage.getItem('saved_affirmations')||'[]');
  if(saved.find(s=>s.text===a.text)){showToast('Already saved ');return;}
  saved.unshift({text:a.text,cat:a.cat,date:new Date().toISOString()});
  localStorage.setItem('saved_affirmations',JSON.stringify(saved.slice(0,40)));
  affirmRenderSaved();showToast('Saved ');
}
function affirmRenderSaved(){
  const saved=JSON.parse(localStorage.getItem('saved_affirmations')||'[]');
  const el=document.getElementById('affirm-saved-list');if(!el)return;
  if(!saved.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">Tap Save on any affirmation that resonates with you.</div>';return;}
  el.innerHTML=saved.map((a,i)=>`
    <div class="affirm-saved-item">
      <div class="affirm-saved-text">${a.text}</div>
      <div>
        <div class="affirm-saved-date">${new Date(a.date).toLocaleDateString('en-IN',{month:'short',day:'numeric'})}</div>
        <button onclick="affirmDeleteSaved(${i})" style="margin-top:4px;background:none;border:none;cursor:pointer;color:var(--text-3);font-size:12px;opacity:.5;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.5">✕</button>
      </div>
    </div>`).join('');
}
function affirmDeleteSaved(i){
  const saved=JSON.parse(localStorage.getItem('saved_affirmations')||'[]');
  saved.splice(i,1);localStorage.setItem('saved_affirmations',JSON.stringify(saved));affirmRenderSaved();
}
function affirmClearSaved(){
  if(!confirm('Clear all saved affirmations?'))return;
  localStorage.setItem('saved_affirmations','[]');affirmRenderSaved();
}

/* ══ VALUES EXPLORER ══ */
const VALUES_LIST=[
  {name:'Connection',icon:'handshake'},{name:'Growth',icon:'leaf'},{name:'Creativity',icon:'paint'},
  {name:'Kindness',icon:'heart'},{name:'Courage',icon:'shield'},{name:'Family',icon:'home2'},
  {name:'Health',icon:'heart'},{name:'Honesty',icon:'eye2'},{name:'Purpose',icon:'compass'},
  {name:'Freedom',icon:'feather'},{name:'Learning',icon:'book'},{name:'Achievement',icon:'trophy'},
  {name:'Spirituality',icon:'sparkle'},{name:'Justice',icon:'trending'},{name:'Simplicity',icon:'leaf'},
  {name:'Adventure',icon:'mappin'},{name:'Security',icon:'shield'},{name:'Humour',icon:'smile'},
  {name:'Loyalty',icon:'hand'},{name:'Peace',icon:'info'}
];
let selectedValues=new Set(JSON.parse(localStorage.getItem('selected_values')||'[]'));

function valuesRenderGrid(){
  const el=document.getElementById('values-grid');if(!el)return;
  el.innerHTML=VALUES_LIST.map(v=>`
    <div class="value-card ${selectedValues.has(v.name)?'selected':''}" onclick="valuesToggle('${v.name}')">
      <div class="value-card-icon"><svg style="width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${v.icon}"/></svg></div>
      <div class="value-card-name">${v.name}</div>
    </div>`).join('');
  valuesRenderTop();
}
function valuesToggle(name){
  if(selectedValues.has(name))selectedValues.delete(name);
  else if(selectedValues.size<10)selectedValues.add(name);
  else{showToast('Max 10 values — remove one first');return;}
  valuesRenderGrid();
}
function valuesSave(){
  localStorage.setItem('selected_values',JSON.stringify([...selectedValues]));
  valuesRenderTop();showToast('Values saved ');
}
function valuesRenderTop(){
  const el=document.getElementById('values-top-list');
  const empty=document.getElementById('values-empty-state');
  if(!el)return;
  const top=[...selectedValues].slice(0,5);
  if(!top.length){el.innerHTML='';if(empty)empty.style.display='block';return;}
  if(empty)empty.style.display='none';
  el.innerHTML=top.map((name,i)=>{
    const v=VALUES_LIST.find(x=>x.name===name)||{icon:'heart'};
    return`<div class="values-top-item">
      <div class="values-top-rank">${i+1}</div>
      <div class="values-top-icon"><svg style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${v.icon}"/></svg></div>
      <div class="values-top-name">${name}</div>
    </div>`;
  }).join('');
  valuesRenderReflections();
}
function valuesSaveRefl(){
  const text=document.getElementById('values-refl').value.trim();
  if(!text){showToast('Write your reflection first');return;}
  const refls=JSON.parse(localStorage.getItem('values_reflections')||'[]');
  refls.unshift({text,date:new Date().toISOString()});
  localStorage.setItem('values_reflections',JSON.stringify(refls.slice(0,30)));
  document.getElementById('values-refl').value='';
  valuesRenderReflections();showToast('Reflection saved ');
}
function valuesRenderReflections(){
  const refls=JSON.parse(localStorage.getItem('values_reflections')||'[]');
  const el=document.getElementById('values-refl-list');if(!el)return;
  if(!refls.length){el.innerHTML='';return;}
  el.innerHTML=refls.slice(0,5).map(r=>`
    <div class="values-refl-item">
      <div class="values-refl-text">${r.text}</div>
      <div class="values-refl-date">${new Date(r.date).toLocaleDateString('en-IN',{month:'short',day:'numeric',year:'numeric'})}</div>
    </div>`).join('');
}

/* ══ THERAPY NOTES ══ */
function therapySave(){
  const insights=document.getElementById('therapy-insights').value.trim();
  if(!insights){showToast('Add at least your key insights');return;}
  const tags=[...document.querySelectorAll('.mood-tag.active')].map(t=>t.textContent);
  const notes=JSON.parse(localStorage.getItem('therapy_notes')||'[]');
  notes.unshift({
    date:document.getElementById('therapy-date').value||new Date().toISOString().split('T')[0],
    therapist:document.getElementById('therapy-therapist').value.trim(),
    tags,insights,
    homework:document.getElementById('therapy-homework').value.trim(),
    questions:document.getElementById('therapy-questions').value.trim(),
    created:new Date().toISOString()
  });
  localStorage.setItem('therapy_notes',JSON.stringify(notes.slice(0,60)));
  ['therapy-therapist','therapy-insights','therapy-homework','therapy-questions'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  document.querySelectorAll('.mood-tag.active').forEach(t=>t.classList.remove('active'));
  therapyRenderHistory();showToast('Session note saved ');
}
function therapyRenderHistory(){
  const notes=JSON.parse(localStorage.getItem('therapy_notes')||'[]');
  const el=document.getElementById('therapy-history');if(!el)return;
  if(!notes.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);">No session notes yet.</div>';return;}
  el.innerHTML=notes.map(n=>{
    const d=new Date(n.date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    return`<div class="therapy-session-item">
      <div class="therapy-session-header">
        <div class="therapy-session-date">${d}${n.therapist?' · '+n.therapist:''}</div>
        ${n.tags&&n.tags.length?`<div class="therapy-session-tags">${n.tags.slice(0,3).map(t=>`<span style="font-size:10px;padding:2px 7px;background:var(--accent-bg);border-radius:100px;color:var(--accent);">${t}</span>`).join('')}</div>`:''}
      </div>
      <div class="therapy-session-preview">${n.insights}</div>
      ${n.homework?`<div class="therapy-homework-badge">Action: ${n.homework}</div>`:''}
    </div>`;
  }).join('');
}
function therapyClear(){
  if(!confirm('Clear all therapy notes?'))return;
  localStorage.setItem('therapy_notes','[]');therapyRenderHistory();
}

/* ══ COPING TOOLKIT ══ */
const COPE_DEFAULTS=[
  {icon:'wind',name:'Box Breathing',desc:'Inhale 4s, hold 4s, exhale 4s, hold 4s. Resets the nervous system in 2 minutes.',cat:'anxiety',uses:0},
  {icon:'leaf',name:'5-4-3-2-1 Grounding',desc:'Name 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste. Breaks an anxiety spiral.',cat:'anxiety',uses:0},
  {icon:'ice',name:'Cold Water',desc:'Splash cold water on your face or hold ice. Activates the dive reflex, slowing heart rate.',cat:'anxiety',uses:0},
  {icon:'walk',name:'Walk Outside',desc:'Even 10 minutes of walking shifts mood through movement and natural light.',cat:'depression',uses:0},
  {icon:'phone',name:'Reach Out',desc:'Text or call one person — not to vent, just to connect. Isolation deepens depression.',cat:'depression',uses:0},
  {icon:'leaf',name:'One Small Win',desc:'Do one tiny task — make your bed, wash one dish. Momentum builds from action, not feeling.',cat:'depression',uses:0},
  {icon:'brain',name:'Brain Dump',desc:'Write everything in your head. Clears working memory and reduces mental chaos.',cat:'adhd',uses:0},
  {icon:'clock',name:'2-Minute Rule',desc:'If it takes under 2 minutes, do it right now. Breaks the procrastination freeze.',cat:'adhd',uses:0},
  {icon:'music',name:'Regulating Playlist',desc:'Music matched to your mood — then gradually shift to something calmer or more energising.',cat:'adhd',uses:0},
  {icon:'pencil',name:'Write It Out',desc:'Write exactly what you\'d say — then delete or destroy it without sending. Releases without consequences.',cat:'anger',uses:0},
  {icon:'walk',name:'Physical Release',desc:'Run, do jumping jacks, punch a pillow. Anger is energy — discharge it physically.',cat:'anger',uses:0},
  {icon:'phone-off',name:'Phone Out of Room',desc:'Physical separation from your device significantly improves sleep onset and quality.',cat:'sleep',uses:0},
  {icon:'moon',name:'4-7-8 Breathing',desc:'Inhale 4s, hold 7s, exhale 8s. Activates parasympathetic response. Do 4 cycles.',cat:'sleep',uses:0},
  {icon:'heart',name:'Name 3 Good Things',desc:'Name 3 things that went okay today, however small. Counters the negativity bias.',cat:'general',uses:0},
  {icon:'paint',name:'Create Something',desc:'Make anything — a doodle, a playlist, a meal. Creative expression is a natural mood regulator.',cat:'general',uses:0},
];
let copingFilter='all';
function copeGetItems(){
  const stored=JSON.parse(localStorage.getItem('coping_toolkit')||'null');
  if(!stored){localStorage.setItem('coping_toolkit',JSON.stringify(COPE_DEFAULTS));return COPE_DEFAULTS;}
  return stored;
}
function copeSave(items){localStorage.setItem('coping_toolkit',JSON.stringify(items));}
const COPE_CAT_OPTS=['all','anxiety','depression','adhd','anger','sleep','general'];
const COPE_CAT_LABELS={all:'All',anxiety:'Anxiety',depression:'Depression',adhd:'ADHD',anger:'Anger',sleep:'Sleep',general:'General'};
function copeInitFilters(){
  const el=document.getElementById('coping-filter-row');if(!el)return;
  el.innerHTML=COPE_CAT_OPTS.map(c=>`<span class="chip ${c===copingFilter?'active':''}" onclick="copeSetFilter('${c}')">${COPE_CAT_LABELS[c]}</span>`).join('');
}
function copeSetFilter(f){copingFilter=f;copeInitFilters();copeRender();}
function copeRender(){
  const items=copeGetItems();
  const filtered=copingFilter==='all'?items:items.filter(i=>i.cat===copingFilter);
  const el=document.getElementById('coping-items-list');if(!el)return;
  if(!filtered.length){el.innerHTML='<div style="font-size:13px;color:var(--text-3);padding:8px 0;">No items in this category yet.</div>';return;}
  const catCls={anxiety:'coping-cat-anxiety',depression:'coping-cat-depression',adhd:'coping-cat-adhd',anger:'coping-cat-anger',sleep:'coping-cat-sleep',general:'coping-cat-general'};
  el.innerHTML=filtered.map((item)=>{
    const realIdx=items.indexOf(item);
    return`<div class="coping-item">
      <div class="coping-item-icon"><svg style="width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;" aria-hidden="true"><use href="#ic-${item.icon}"/></svg></div>
      <div class="coping-item-body">
        <div class="coping-item-header">
          <div class="coping-item-name">${item.name}</div>
          <span class="coping-item-cat ${catCls[item.cat]||''}">${item.cat}</span>
        </div>
        <div class="coping-item-desc">${item.desc}</div>
        ${item.uses>0?`<div class="coping-item-uses">Used ${item.uses}× total</div>`:''}
      </div>
      <div class="coping-item-actions">
        <button class="coping-use-btn" onclick="copeUse(${realIdx})">✓ Use</button>
        <button onclick="copeDelete(${realIdx})" style="background:none;border:none;cursor:pointer;color:var(--text-3);font-size:13px;padding:4px;opacity:.4;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.4">✕</button>
      </div>
    </div>`;
  }).join('');
}
function copeUse(i){
  const items=copeGetItems();items[i].uses=(items[i].uses||0)+1;copeSave(items);
  const total=parseInt(localStorage.getItem('coping_uses')||'0')+1;
  localStorage.setItem('coping_uses',total);
  copeRender();updateStats();showToast(`Used: ${items[i].name} `);
}
function copeDelete(i){
  const items=copeGetItems();items.splice(i,1);copeSave(items);copeRender();
}
function copeAdd(){
  const name=document.getElementById('cope-name').value.trim();
  if(!name){showToast('Give it a name');return;}
  const items=copeGetItems();
  items.push({
    icon:document.getElementById('cope-icon').value.trim()||'heart',
    name,desc:document.getElementById('cope-desc').value.trim(),
    cat:document.getElementById('cope-cat').value,uses:0
  });
  copeSave(items);
  ['cope-name','cope-icon','cope-desc'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  copeRender();showToast('Added to toolkit ');
}

/* ── ORIGINAL INIT ── */
renderGratHist();renderSleepHist();renderSelfCare();renderTraps();
// Patch nav() to trigger new pages
const _navOrig=nav;
window.nav=function(id){
  _navOrig(id);
  // Anxiety
  if(id==='breathing'){if(!bRunning)resetBreath();}
  if(id==='grounding'){resetGrounding();}
  if(id==='bodyscan'){renderBodyArea();}
  if(id==='worry'){wRenderArchive();wRenderSched();}
  if(id==='pmr'){pmrBuildCards();}
  // Depression
  if(id==='mood'){renderMoodHist();}
  if(id==='gratitude'){renderGratHist();}
  if(id==='reframing'){renderTraps();}
  if(id==='activation'){baRenderBank();baRenderPlanner();baUpdateModalActs();}
  if(id==='values'){valuesRenderGrid();}
  // ADHD
  if(id==='focus'){renderTasks();updateTDisplay();}
  if(id==='meditation'){if(!mRunning)resetMed();}
  if(id==='habits'){renderHabits();}
  if(id==='braindump'){dumpRender();}
  if(id==='matrix'){mxRender();}
  if(id==='distractions'){distRenderHist();}
  if(id==='bodydoubling'){if(!bdRunning){bdReset();}}
  // Self-care
  if(id==='sleep'){renderSleepHist();}
  if(id==='selfcare'){renderSelfCare();}
  if(id==='emotions'){drawWheel();}
  if(id==='energy'){emRenderHistory();emDrawTodayChart();}
  if(id==='affirmations'){affirmInitCats();affirmShow();affirmRenderSaved();}
  // Journaling
  if(id==='prompts'){promptInitCats();promptShowCurrent();promptRenderSaved();}
  if(id==='triggers'){trigRenderHist();}
  if(id==='therapy'){therapyRenderHistory();}
  if(id==='coping'){copeInitFilters();copeRender();}
  // Insights
  if(id==='insights'){drawCharts();}
  // Understanding
  if(id==='addiction'){wikiInit();}
};

/* ══ ADDICTION WIKI ══ */
function wikiToggle(id){
  const sec=document.getElementById(id);
  if(!sec)return;
  const isOpen=sec.classList.contains('open');
  // Close all
  document.querySelectorAll('.wiki-section.open').forEach(s=>s.classList.remove('open'));
  // Open clicked if it was closed
  if(!isOpen)sec.classList.add('open');
  if(!isOpen)sec.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function wikiOpen(id){
  // Open specific section (from TOC)
  document.querySelectorAll('.wiki-section.open').forEach(s=>s.classList.remove('open'));
  const sec=document.getElementById(id);
  if(sec){sec.classList.add('open');setTimeout(()=>sec.scrollIntoView({behavior:'smooth',block:'start'}),80);}
}
function wikiInit(){
  // Open the first section by default if none open
  const open=document.querySelector('#addiction .wiki-section.open');
  if(!open){
    const first=document.querySelector('#addiction .wiki-section');
    if(first)first.classList.add('open');
  }
}

/* ── Urge timer ── */
let urgeRunning=false,urgeInt=null,urgeSec=300,urgeTotal=300;
const URGE_CIRC=2*Math.PI*55; // r=55
const URGE_MSGS=[
  'Notice where you feel the craving in your body. Stay with it.',
  'The craving is a wave. It will peak. Watch it.',
  'You are the observer — not the craving. It cannot force you.',
  'Your brain expected something. That expectation will fade.',
  'This is what riding it out feels like. You\'re doing it.',
  'The intensity is already changing. Stay curious.',
  'Research shows this craving will peak within 5 minutes. You\'re in it.',
  'Notice: is it getting stronger or has it started to ease?',
  'You are not in danger. Discomfort is not danger.',
  'Every second you wait is a vote for the person you\'re becoming.',
  'The craving is already starting to lose power.',
  'Almost there. Watch it fall.',
  'You outlasted the craving. That\'s exactly what recovery is made of.',
];
let urgeMsgIdx=0,urgeMsgTimer=null;

function urgeUpdateDisplay(){
  const m=Math.floor(urgeSec/60),s=urgeSec%60;
  const el=document.getElementById('urge-time');
  if(el)el.textContent=`${m}:${String(s).padStart(2,'0')}`;
  const fill=document.getElementById('urge-fill');
  if(fill){
    const elapsed=urgeTotal-urgeSec;
    const offset=URGE_CIRC-(elapsed/urgeTotal)*URGE_CIRC;
    fill.style.strokeDashoffset=Math.max(0,offset);
  }
  const lbl=document.getElementById('urge-label');
  if(lbl)lbl.textContent=urgeSec>0?'Riding the wave':'Complete';
}
function urgeShowMsg(){
  const el=document.getElementById('urge-message');
  if(!el)return;
  el.style.opacity=0;
  setTimeout(()=>{
    el.textContent=URGE_MSGS[urgeMsgIdx%URGE_MSGS.length];
    el.style.opacity=1;
    urgeMsgIdx++;
  },300);
}
function urgeToggle(){
  const btn=document.getElementById('urge-btn');
  if(urgeRunning){
    clearInterval(urgeInt);clearTimeout(urgeMsgTimer);
    urgeRunning=false;
    if(btn)btn.textContent='▶ Resume';
    const lbl=document.getElementById('urge-label');if(lbl)lbl.textContent='Paused';
    return;
  }
  if(urgeSec<=0){urgeReset();return;}
  urgeRunning=true;
  if(btn)btn.textContent='⏸ Pause';
  const lbl=document.getElementById('urge-label');if(lbl)lbl.textContent='Riding the wave';
  urgeShowMsg();
  urgeMsgTimer=setInterval(urgeShowMsg,18000);
  urgeInt=setInterval(()=>{
    urgeSec--;
    urgeUpdateDisplay();
    if(urgeSec<=0){
      clearInterval(urgeInt);clearInterval(urgeMsgTimer);
      urgeRunning=false;
      if(btn)btn.textContent='✓ Done';
      const el=document.getElementById('urge-message');
      if(el){el.style.opacity=0;setTimeout(()=>{el.textContent='You outlasted the craving. That\'s exactly what recovery is made of.';el.style.opacity=1;},300);}
      const lbl=document.getElementById('urge-label');if(lbl)lbl.textContent='Wave passed';
      // Fill completely
      const fill=document.getElementById('urge-fill');
      if(fill)fill.style.strokeDashoffset=0;
    }
  },1000);
}
function urgeReset(){
  clearInterval(urgeInt);clearInterval(urgeMsgTimer);
  urgeRunning=false;urgeSec=300;urgeMsgIdx=0;
  const btn=document.getElementById('urge-btn');if(btn)btn.textContent='▶ Start';
  const lbl=document.getElementById('urge-label');if(lbl)lbl.textContent='Ready';
  const msg=document.getElementById('urge-message');
  if(msg){msg.style.opacity=1;msg.textContent='Press Start and observe the craving without acting. Just watch it.';}
  urgeUpdateDisplay();
}
// Initialise arc
(function(){
  const fill=document.getElementById('urge-fill');
  if(fill){fill.style.strokeDasharray=URGE_CIRC;fill.style.strokeDashoffset=URGE_CIRC;}
})();
