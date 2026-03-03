window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('preloader').classList.add('gone');const fl=document.getElementById('floatLogo');if(fl)fl.classList.add('on');},2700);});

const cur=document.getElementById('cur'),cring=document.getElementById('cring');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
  cring.style.left=e.clientX+'px';cring.style.top=e.clientY+'px';
});

const slides=document.querySelectorAll('.slide');
let curIdx=0;

function reAnimate(els,cls,baseDelay,stagger){
  els.forEach((el,i)=>{
    el.classList.remove(cls);
    void el.offsetWidth;
    setTimeout(()=>el.classList.add(cls),baseDelay+(i*stagger));
  });
}

function updateNav(i){
  const sdots=document.querySelectorAll('.sdot');
  const lightBgs=['s1','s2','s4','s9','s14'];
  const isLight=lightBgs.includes(slides[i]?.id);
  sdots.forEach((d,j)=>{
    d.classList.toggle('on',j===i);
    isLight?d.classList.add('dk'):d.classList.remove('dk');
  });
  const fl=document.getElementById('floatLogoImg');
  if(fl)fl.src=isLight?'harmonised_dark.png':'harmonised_light.png';
}

function goTo(i){
  if(i<0||i>=slides.length)return;
  curIdx=i;
  slides[i].scrollIntoView({behavior:'smooth',block:'start'});
  updateNav(i);
}

const isMobile=()=>window.innerWidth<=768;
if(!isMobile()){
  let wheelTimer;
  window.addEventListener('wheel',e=>{
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer=setTimeout(()=>{
      if(e.deltaY>30&&curIdx<slides.length-1)goTo(curIdx+1);
      else if(e.deltaY<-30&&curIdx>0)goTo(curIdx-1);
    },30);
  },{passive:false});
}

const slideObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const idx=Array.from(slides).indexOf(e.target);
    curIdx=idx; updateNav(idx);
    if(e.target.classList.contains('s-close'))e.target.classList.add('inv');
    e.target.querySelectorAll('.rv').forEach((el,i)=>{
      el.classList.remove('on');void el.offsetWidth;
      setTimeout(()=>el.classList.add('on'),60+i*40);
    });
    if(e.target.id==='s2'){const ci=document.getElementById('conIcon');if(ci){ci.classList.remove('on');void ci.offsetWidth;setTimeout(()=>{ci.classList.add('on');setTimeout(()=>dimBigIcon(0),900);},80);}}
    if(e.target.id==='s3'){const ii=document.getElementById('infoIcon');if(ii){ii.classList.remove('on');void ii.offsetWidth;setTimeout(()=>ii.classList.add('on'),80);}}
    if(e.target.id==='s12')reAnimate(document.querySelectorAll('.photo-cell'),'on',0,120);
    if(e.target.id==='s8'){reAnimate(document.querySelectorAll('.icon-cell'),'on',0,150);reAnimate(document.querySelectorAll('.sz'),'on',400,90);}
    if(e.target.id==='s6')reAnimate(document.querySelectorAll('.do-cell'),'on',200,0);
    if(e.target.id==='s7')reAnimate(document.querySelectorAll('.dont-cell'),'on',200,0);
    if(e.target.id==='s10')reAnimate(e.target.querySelectorAll('.tcell'),'on',100,120);
    if(e.target.id==='s0'){const ic=document.getElementById('covIcon');if(ic){ic.classList.remove('on');void ic.offsetWidth;setTimeout(()=>ic.classList.add('on'),400);}}
  });
},{threshold:0.15,rootMargin:'0px 0px -10% 0px'});
slides.forEach(s=>slideObs.observe(s));

const rvObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('on');
    else e.target.classList.remove('on');
  });
},{threshold:0.08});

if(!isMobile()){
  document.querySelectorAll('.rv,.rvl,.rvr,.csw,.icell,.tcell').forEach(el=>rvObs.observe(el));
}

document.querySelectorAll('.con-right h2 em').forEach(em=>{
  const o=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});},{threshold:0.3});
  o.observe(em);
});

function switchPart(idx){
  document.querySelectorAll('.ptab').forEach((t,i)=>t.classList.toggle('on',i===idx));
  document.querySelectorAll('.cpbtn').forEach((b,i)=>b.classList.toggle('sel',i===idx));
  document.querySelectorAll('.pdesc').forEach(d=>{d.classList.remove('on');d.style.opacity='0';d.style.transform='translateY(8px)';});
  const tgt=document.getElementById('pd'+idx);
  if(tgt){tgt.classList.add('on');requestAnimationFrame(()=>{tgt.style.opacity='1';tgt.style.transform='none';});}
  
  dimBigIcon(idx);
}

function dimBigIcon(activeIdx){
  const icon=document.getElementById('conIcon');
  if(!icon)return;
  icon.querySelectorAll('polygon').forEach((p,i)=>{
    
    p.style.transition='opacity 0.35s ease, fill 0.35s ease';
    const active=(activeIdx===0&&i===0)||(activeIdx===1&&i===1)||(activeIdx===2&&i===2);
    p.style.opacity=active?'1':'0.14';
    p.style.fill=active?'#F3D62A':'#b8b6c8';
  });
}

let rafId;
document.addEventListener('mousemove',e=>{
  if(curIdx!==0)return;
  cancelAnimationFrame(rafId);
  rafId=requestAnimationFrame(()=>{
    const dx=(e.clientX/window.innerWidth-0.5)*20;
    const dy=(e.clientY/window.innerHeight-0.5)*14;
    const ic=document.getElementById('covIcon');
    const gh=document.querySelector('.cov-ghost');
    if(ic)ic.style.transform=`translateY(calc(-50% + ${dy*.45}px)) translateX(${dx*.15}px)`;
    if(gh)gh.style.transform=`translateY(calc(-50% + ${dy*.28}px)) translateX(${dx*-.08}px)`;
  });
});

let mkCur=0;
const MK_TOTAL=5;
const MK_TITLES=['Brand Application','Field Equipment','Site Environment','Branded Merch','Digital Presence'];

function updateMk(){
  
  document.querySelectorAll('.mk-layer').forEach((l,i)=>l.classList.toggle('on',i===mkCur));
  document.querySelectorAll('.mk-nav-item').forEach((n,i)=>n.classList.toggle('on',i===mkCur));
  
  document.querySelectorAll('.mk-ts').forEach((t,i)=>t.classList.toggle('on',i===mkCur));
  
  const ctr=document.getElementById('mkCtr');
  const ttl=document.getElementById('mkTitle');
  if(ctr)ctr.textContent=String(mkCur+1).padStart(2,'0')+' / '+String(MK_TOTAL).padStart(2,'0');
  if(ttl)ttl.textContent=MK_TITLES[mkCur];
  
  const prog=document.getElementById('mkProg');
  if(prog)prog.style.width=((mkCur+1)/MK_TOTAL*100)+'%';
}

function nextMk(){mkCur=(mkCur+1)%MK_TOTAL;updateMk();}
function prevMk(){mkCur=(mkCur-1+MK_TOTAL)%MK_TOTAL;updateMk();}
function goMk(i){mkCur=i;updateMk();}

function loadMk(input,idx){
  if(!input.files.length)return;
  const r=new FileReader();
  r.onload=ev=>{
    const layer=document.querySelector('#ml'+idx+' img');
    const thumb=document.querySelector('#mt'+idx+' img');
    if(layer){layer.src=ev.target.result;}
    if(thumb){thumb.src=ev.target.result;}
  };
  r.readAsDataURL(input.files[0]);
}

document.addEventListener('keydown',e=>{
  if(curIdx!==13)return;
  if(e.key==='ArrowRight'||e.key==='ArrowDown')nextMk();
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')prevMk();
});

const mkStage=document.querySelector('.mk-stage');
if(mkStage){
  mkStage.addEventListener('dragover',e=>{e.preventDefault();mkStage.style.outline='1px solid rgba(243,214,42,0.3)';});
  mkStage.addEventListener('dragleave',()=>mkStage.style.outline='');
  mkStage.addEventListener('drop',e=>{
    e.preventDefault();mkStage.style.outline='';
    const f=e.dataTransfer.files[0];
    if(!f?.type.startsWith('image/'))return;
    const inp=document.getElementById('fi'+mkCur);
    const dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;
    loadMk(inp,mkCur);
  });
}
