const $=id=>document.getElementById(id);

/* Pastellpalette: c = Fläche, k = Tinte (Kontrast ≥ 6:1 auf c) */
const PALETTE=[
  {n:'Butter',  c:'#f8e6a8',k:'#6b4f00'},{n:'Lavendel',c:'#e2dbf7',k:'#4a3a86'},
  {n:'Minze',   c:'#cdebd8',k:'#245c3b'},{n:'Koralle', c:'#fbd5cc',k:'#8a2f1f'},
  {n:'Himmel',  c:'#cfe2f6',k:'#1f4c7a'},{n:'Rosé',    c:'#f6d3e1',k:'#862d52'},
  {n:'Lagune',  c:'#c9ebe9',k:'#185c5a'},{n:'Nebel',   c:'#dfe2e8',k:'#3a4252'},
  {n:'Pfirsich',c:'#fbdcc2',k:'#86400f'},{n:'Salbei',  c:'#dfe8cc',k:'#465a22'}];
const TONES=['#7c6fd0','#5f9e7a','#d98a5f','#5b8fc7','#cf7393'],TONEN=['Lavendel','Salbei','Pfirsich','Himmel','Rosé'];
/* Fach-Symbole im selben Linienstil wie die übrigen Icons; sie übernehmen die Tintenfarbe des Moduls */
const SYM={
  code:['Programmieren','<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>'],
  sigma:['Mathematik','<path d="M17 5H7l6 7-6 7h10"/>'],
  chart:['Wirtschaft','<path d="M4 20h16"/><path d="M7 16v-4M12 16V7M17 16v-7"/>'],
  network:['Wirtschaftsinformatik','<circle cx="12" cy="5.5" r="2.5"/><circle cx="5.5" cy="18" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/><path d="M10.8 7.7 6.7 15.8M13.2 7.7l4.1 8.1M8 18h8"/>'],
  chip:['Informatik','<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>'],
  spark:['KI & Karriere','<path d="M11 4c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z"/><path d="M19 3v3.5M17.25 4.75h3.5"/>'],
  euro:['Finanzen','<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.6a4.4 4.4 0 1 0 0 6.8M7 10.8h6M7 13.4h6"/>'],
  db:['Datenbanken','<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'],
  scale:['Recht','<path d="M12 4v16M8 20h8M5 7h14"/><path d="m5 7-2.6 6a2.8 2.8 0 0 0 5.2 0zM19 7l-2.6 6a2.8 2.8 0 0 0 5.2 0z"/>'],
  globe:['Sprachen','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>'],
  calc:['Rechnen','<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15.5h.01M12 15.5h.01M15.5 15v2.5"/>'],
  flask:['Labor','<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7.5 15h9"/>'],
  book:['Lernen','<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 21H20"/>'],
  users:['Gruppe','<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6 6 0 0 1 3 5.5"/>'],
  cap:['Studium','<path d="m2.5 9 9.5-5 9.5 5-9.5 5z"/><path d="M6.5 11v5c3 2.5 8 2.5 11 0v-5M21.5 9v5"/>'],
  star:['Wichtig','<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>']};
/* Passendes Standardsymbol je Fach */
function autoSym(t){t=String(t).toLowerCase();
  if(/\bki\b|karriere|künstlich/.test(t))return'spark';
  if(/programm|code|software|algorithm/.test(t))return'code';
  if(/mathe|algebra|analysis|statistik|logik/.test(t))return'sigma';
  if(/wirtschaftsinformatik/.test(t))return'network';
  if(/datenbank/.test(t))return'db';
  if(/informatik|rechner|betriebssystem|netz/.test(t))return'chip';
  if(/finanz|rechnungswesen|buchf|kosten/.test(t))return'euro';
  if(/wirtschaft|bwl|vwl|ökonom|management|marketing/.test(t))return'chart';
  if(/recht/.test(t))return'scale';
  if(/englisch|sprache|kommunikation/.test(t))return'globe';
  if(/physik|chemie|labor/.test(t))return'flask';
  return'book'}
const DS=['So','Mo','Di','Mi','Do','Fr','Sa'],DL=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const MO=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const TYPES={SU:'Seminaristischer Unterricht','Ü':'Übung',V:'Vorlesung',P:'Praktikum',T:'Tutorium'};
const svg=(p,s=20,w=1.7)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC={plus:svg('<path d="M12 5v14M5 12h14"/>'),pen:svg('<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',16),
moon:svg('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'),sun:svg('<circle cx="12" cy="12" r="4"/><path d="M12 3v1.5M12 19.5V21M4.6 4.6l1.1 1.1M18.3 18.3l1.1 1.1M3 12h1.5M19.5 12H21M4.6 19.4l1.1-1.1M18.3 5.7l1.1-1.1"/>'),
ref:svg('<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4.5h-4.5"/>'),
cal:svg('<rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
note:svg('<path d="M6 3.5h8l4.5 4.5v12.5H6z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4"/>'),
grid:svg('<rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/>'),
prev:svg('<path d="m14.5 18-6-6 6-6"/>',18,2),next:svg('<path d="m9.5 18 6-6-6-6"/>',18,2),chev:svg('<path d="m9.5 18 6-6-6-6"/>',16,1.8),
alert:svg('<path d="M12 8v5M12 16.5v.01"/><circle cx="12" cy="12" r="9"/>'),link:svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',16),
leaf:svg('<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',28)};
const store={get(k,d){try{const v=localStorage.getItem('stundenplan.'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('stundenplan.'+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem('stundenplan.'+k)}catch(e){}}};

/* Eingabeprüfung: Daten aus Netz und Speicher werden nur in erwarteter Form übernommen */
const D_RE=/^\d{4}-\d{2}-\d{2}$/,T_RE=/^\d{2}:\d{2}$/;
const str=(v,n=200)=>typeof v==='string'&&v.trim()?v.slice(0,n):null;
const idx=v=>Number.isInteger(v)&&v>=0&&v<100?v:null;
const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
function cleanEvent(e){if(!isObj(e)||!D_RE.test(e.date)||!T_RE.test(e.start)||!T_RE.test(e.end)||!str(e.title))return null;
  return{date:e.date,start:e.start,end:e.end,type:str(e.type,10)||'',title:str(e.title),group:str(e.group),lecturer:str(e.lecturer),room:str(e.room,60),note:str(e.note,300),changed:e.changed===true}}
function cleanCustom(c){if(!isObj(c)||!D_RE.test(c.date)||!T_RE.test(c.start)||!T_RE.test(c.end)||!str(c.title))return null;
  return{id:str(c.id,40)||String(Math.random()),title:str(c.title,80),date:c.date,start:c.start,end:c.end,room:str(c.room,40),color:idx(c.color)??0,until:D_RE.test(c.until)?c.until:null}}
function cleanMap(o,fn){const out={};if(isObj(o))for(const k of Object.keys(o).slice(0,500)){const v=fn(o[k]);if(v!=null)out[k]=v}return out}
function cleanData(d){if(!isObj(d)||!Array.isArray(d.events))return null;
  return{generated:str(d.generated,40)||'',events:d.events.map(cleanEvent).filter(Boolean).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))}}
let events=[],custom=(c=>Array.isArray(c)?c.map(cleanCustom).filter(Boolean):[])(store.get('custom',[])),
  notes=cleanMap(store.get('notes',{}),v=>str(v,4000)),
  mods=cleanMap(store.get('mods',{}),v=>isObj(v)?{c:idx(v.c),i:typeof v.i==='string'?v.i.slice(0,40):''}:null),titleColor={},sel=new Date(),view=store.get('view','day'),tab='plan',lastDate='',noteKey=null,selC=0,selI='',started=false,offline=false,genAt='',openBan=false,shownWeek='';
const PX=1.05;
const pad=n=>String(n).padStart(2,'0'),iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,day=s=>new Date(s+'T12:00:00');
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x},fmt=d=>`${pad(d.getDate())}.${pad(d.getMonth()+1)}.`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const monday=d=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const toMin=s=>{const[h,m]=s.split(':');return +h*60+ +m},nowMin=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()};
const kw=d=>{const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);return Math.ceil(((t-new Date(Date.UTC(t.getUTCFullYear(),0,1)))/864e5+1)/7)};
const skipSun=(d,n)=>{while(d.getDay()===0)d=addDays(d,n||1);return d};
const stamp=d=>d.toLocaleString('de-DE',{dateStyle:'medium',timeStyle:'short'});
const dur=m=>m>=60?Math.floor(m/60)+' Std'+(m%60?' '+m%60+' Min':''):m+' Min';
const plural=(n,a,b)=>n+' '+(n===1?a:b);

/* Theme & Akzent */
const root=document.documentElement;
const dark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
const themeIcon=()=>$('themeBtn').innerHTML=dark()?IC.sun:IC.moon;
$('themeBtn').onclick=()=>{const n=dark()?'light':'dark';root.dataset.theme=n;store.set('theme',n);themeIcon()};
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',themeIcon);
$('addBtn').innerHTML=IC.plus;$('refreshBtn').innerHTML=IC.ref;$('prevW').innerHTML=IC.prev;$('nextW').innerHTML=IC.next;themeIcon();
$('tPlan').innerHTML=IC.cal+'<span>Plan</span>';$('tNotes').innerHTML=IC.note+'<span>Notizen</span>';$('tMods').innerHTML=IC.grid+'<span>Module</span>';
/* Kompakter Kopf: Beobachter statt Scroll-Event – kein Layout-Wechsel, nur Klasse für Opacity/Transform */
new IntersectionObserver(([en])=>document.body.classList.toggle('s',!en.isIntersecting&&en.boundingClientRect.top<80),
  {rootMargin:'-60px 0px 0px 0px',threshold:0}).observe($('ttl'));

function placeThumb(){const b=document.querySelector('.seg button.on'),t=$('segThumb');if(!b||!b.offsetWidth){t.style.opacity=0;return}
  const first=!t.dataset.on;if(first)t.style.transition='none';t.style.opacity=1;t.style.width=b.offsetWidth+'px';t.style.transform=`translateX(${b.offsetLeft}px)`;if(first){void t.offsetWidth;t.style.transition='';t.dataset.on=1}}
let rsT;addEventListener('resize',()=>{placeThumb();clearTimeout(rsT);rsT=setTimeout(()=>{if(started&&tab==='plan'&&view==='grid')render(0,0,1)},150)});

/* Farben & Namen */
function buildColors(){titleColor={};[...new Set(events.map(e=>e.title))].sort((a,b)=>a.localeCompare(b,'de')).forEach((t,i)=>titleColor[t]=i%PALETTE.length)}
const baseIdx=t=>titleColor[t]??((custom.find(c=>c.title===t)||{color:0}).color%PALETTE.length);
const idxOf=e=>{const m=mods[e.title];return m&&m.c!=null?m.c%PALETTE.length:e.custom?e.color%PALETTE.length:titleColor[e.title]??0};
const pal=e=>PALETTE[idxOf(e)];
const cv=e=>{const p=pal(e);return `--c:${p.c};--k:${p.k}`};
const dotOf=e=>{const p=pal(e);return `color-mix(in srgb,${p.c} 45%,${p.k})`};
/* Symbol eines Moduls: eigenes (mods.i) oder automatisch passend zum Fach */
const symKey=t=>{const i=(mods[t]||{}).i;return i?i:'svg:'+autoSym(t)};
const symFor=(key,s=17)=>key.startsWith('svg:')&&SYM[key.slice(4)]?svg(SYM[key.slice(4)][1],s,1.8):esc(key);
const symOf=(e,s)=>symFor(symKey(e.title),s);
const label=e=>e.title;
const short=e=>e.title.split(/\s+/).filter(w=>w.length>3).map(w=>w[0].toUpperCase()).join('').slice(0,3)||e.title.slice(0,2);
function eventsOn(d0){const d=iso(d0);
  const own=custom.filter(c=>c.date===d||(c.until&&c.date<d&&c.until>=d&&day(c.date).getDay()===d0.getDay()))
    .map(c=>({...c,date:d,type:'',group:null,lecturer:null,note:null,changed:false,custom:true}));
  return [...events.filter(e=>e.date===d),...own].sort((a,b)=>a.start.localeCompare(b.start))}

/* Semester */
function semester(){if(!events.length)return null;const ms=[];let m=monday(day(events[0].date));const last=day(events[events.length-1].date);
  while(m<=last){ms.push(m);m=addDays(m,7)}const i=ms.findIndex(x=>iso(x)===iso(monday(new Date())));
  return{n:ms.length,i:i>=0?i:(new Date()<ms[0]?-1:ms.length),start:ms[0],end:last}}

/* Änderungen seit dem letzten Besuch */
const ekey=e=>[e.date,e.start,e.type,e.title,e.group||''].join('|'),edesc=e=>`${e.title} · ${fmt(day(e.date))} ${e.start}`;
function snapshot(){const t=iso(new Date()),s={};events.filter(e=>e.date>=t).forEach(e=>s[ekey(e)]={r:e.room||'',d:e.date,s:edesc(e)});store.set('seen',s)}
function diff(){const seen=store.get('seen',null);if(!seen)return[];const t=iso(new Date()),cur={},out=[];
  events.filter(e=>e.date>=t).forEach(e=>cur[ekey(e)]=e);
  for(const k in cur){const e=cur[k];if(!(k in seen))out.push('Neu: '+edesc(e)+(e.room?' ('+e.room+')':''));else if(seen[k].r!==(e.room||''))out.push(`Raum: ${edesc(e)} · ${seen[k].r||'–'} → ${e.room||'–'}`)}
  for(const k in seen)if(seen[k].d>=t&&!(k in cur))out.push('Entfällt: '+seen[k].s);return out}
function renderBanner(){const d=tab==='plan'?diff():[];
  $('banner').innerHTML=d.length?`<div class="note-bar" role="status"><span class="ico">${IC.alert}</span><div><b>${plural(d.length,'Änderung','Änderungen')} seit deinem letzten Besuch</b>${openBan?'<ul>'+d.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''}<button class="lnk" data-b="tog">${openBan?'Ausblenden':'Anzeigen'}</button><button class="lnk" data-b="ok">Gelesen</button></div></div>`:''}
$('banner').onclick=e=>{const b=e.target.closest('[data-b]');if(!b)return;if(b.dataset.b==='ok'){snapshot();openBan=false}else openBan=!openBan;renderBanner()};

/* ── Darstellung ── */
function meta(e){return[e.group,e.lecturer,e.room].filter(Boolean).map(esc).join(' · ')}
function card(e){const n=notes[e.title],m=meta(e);
  return `<div class="cd tint ${e.changed?'ch':''}" style="${cv(e)}"><span class="sym" aria-hidden="true">${symOf(e)}</span><div class="bd">
    <div class="ty soft">${e.custom?'Eigener Termin':esc(TYPES[e.type]||e.type)}</div><div class="ti">${esc(label(e))}</div>${m?`<div class="mt soft">${m}</div>`:''}
    ${e.changed?`<span class="tag">${IC.alert.replace('20" height="20','13" height="13')}${esc(e.note||'Geändert')}</span>`:''}${n?`<div class="memo">${esc(n)}</div>`:''}</div>
    <button class="ed ${n?'has':''}" data-a="mod" data-t="${esc(e.title)}" aria-label="${esc(e.title)} bearbeiten">${IC.pen}</button></div>`}
function dayList(d,l){const today=iso(d)===iso(new Date()),nm=nowMin();let h='<ol class="tl">',pe=null;
  l.forEach((e,i)=>{const s=toMin(e.start),t=toMin(e.end);
    if(pe!==null&&s-pe>=15)h+=`<li class="brk">Pause · ${dur(s-pe)}</li>`;pe=Math.max(pe??0,t);
    const st=today?(t<=nm?'past':s<=nm?'run':''):iso(d)<iso(new Date())?'past':'';
    h+=`<li class="ev ${st}" style="--i:${i};${cv(e)}"><time>${esc(e.start)}<span>${esc(e.end)}</span></time>${card(e)}</li>`});
  return h+'</ol>'}
function lanes(list){const out=[];let cl=[],end=0;const flush=()=>{const n=Math.max(...cl.map(x=>x.l))+1;cl.forEach(x=>x.n=n);out.push(...cl);cl=[]};
  for(const e of list){const s=toMin(e.start);if(cl.length&&s>=end)flush();const used=cl.filter(x=>toMin(x.e.end)>s).map(x=>x.l);let l=0;while(used.includes(l))l++;cl.push({e,l});end=Math.max(end,toMin(e.end))}
  if(cl.length)flush();return out}
function range(days){let lo=480,hi=1020;days.forEach(d=>eventsOn(d).forEach(e=>{lo=Math.min(lo,toMin(e.start));hi=Math.max(hi,toMin(e.end))}));return[Math.floor(lo/60)*60,Math.ceil(hi/60)*60]}
const hours=(a,b)=>{let h=`<div class="hrs" style="height:${(b-a)*PX}px">`;for(let m=a;m<b;m+=60)h+=`<span style="top:${(m-a)*PX}px">${pad(m/60)}</span>`;return h+'</div>'};
function col(d,a,b,wide){const list=eventsOn(d);let h=`<div class="col" style="height:${(b-a)*PX}px">`;
  for(let m=a;m<b;m+=60)h+=`<i class="hl" style="top:${(m-a)*PX}px"></i>`;
  lanes(list).forEach(({e,l,n},i)=>{const s=toMin(e.start),t=toMin(e.end);
    h+=`<button class="blk tint ${e.changed?'ch':''}" data-a="mod" data-t="${esc(e.title)}" title="${esc(e.start+'–'+e.end+' '+e.title+(e.room?' · '+e.room:''))}" style="${cv(e)};--i:${i};top:${(s-a)*PX}px;height:${(t-s)*PX-3}px;left:calc(${l/n*100}% + 1px);width:calc(${100/n}% - 2px)">
    <b><i class="gi" aria-hidden="true">${symOf(e,wide?13:12)}</i>${wide?esc(e.start+' '+label(e)):esc(short(e))}</b><span class="soft">${esc(e.room||'')}</span></button>`});
  if(iso(d)===iso(new Date())){const n=nowMin();if(n>=a&&n<=b)h+=`<u class="now" style="top:${(n-a)*PX}px"></u>`}
  return h+'</div>'}
function monthLabel(w){const e=addDays(w,5),a=w.getMonth(),b=e.getMonth();
  return a===b?`${MO[a]} ${w.getFullYear()}`:`${MO[a].slice(0,3)}${w.getFullYear()!==e.getFullYear()?' '+w.getFullYear():''} – ${MO[b].slice(0,3)} ${e.getFullYear()}`}
function renderStrip(){const w=monday(sel),td=iso(new Date()),s=semester();
  $('strip').innerHTML=[0,1,2,3,4,5].map(i=>{const d=addDays(w,i),cols=[...new Set(eventsOn(d).map(dotOf))].slice(0,4);
    return `<button class="chip ${iso(d)===iso(sel)&&view==='day'?'sel':''} ${iso(d)===td?'today':''}" data-d="${iso(d)}" aria-label="${DL[d.getDay()]}, ${fmt(d)}${cols.length?'':' – frei'}"><small>${DS[d.getDay()]}</small><b>${d.getDate()}</b><span class="dots">${cols.map(c=>`<s style="--d:${c}"></s>`).join('')}</span></button>`}).join('');
  $('ttl').textContent=$('mini').textContent=monthLabel(w);
  $('eye').textContent=`KW ${kw(sel)}${s&&s.i>=0&&s.i<s.n&&iso(monday(sel))===iso(monday(new Date()))?' · Woche '+(s.i+1)+' von '+s.n:''}`;
  const t=todayTarget(),dim=view==='day'?iso(sel)===iso(t):iso(monday(sel))===iso(monday(t));$('todayBtn').classList.toggle('dim',dim);$('todayBtn').setAttribute('aria-disabled',dim)}
function nextEv(){const now=new Date(),hm=pad(now.getHours())+':'+pad(now.getMinutes());
  for(let i=0;i<30;i++){const d=addDays(now,i);for(const e of eventsOn(d)){if(i===0&&e.end<=hm)continue;return{e,d,i,run:i===0&&e.start<=hm,hm}}}return null}
function renderHero(){const h=$('hero');if(tab!=='plan'){h.innerHTML='';return}const x=nextEv();if(!x){h.innerHTML='';return}
  const{e,d,i,run,hm}=x,now=toMin(hm),room=e.room?' · '+esc(e.room):'';let l,p,big,prog='';
  if(run){const left=toMin(e.end)-now,pr=Math.min(1,Math.max(0,(now-toMin(e.start))/(toMin(e.end)-toMin(e.start))));
    l='<i class="live"></i>Läuft gerade';p=`${esc(e.start)} – ${esc(e.end)}${room}`;
    big=`<b>${left>=100?Math.round(left/60)+' h':left}</b><span class="soft">${left>=100?'übrig':'Min übrig'}</span>`;
    prog=`<div class="prog" aria-hidden="true"><u style="width:${(pr*100).toFixed(1)}%"></u></div>`}
  else{const m=toMin(e.start)-now;l='Als Nächstes';
    p=(i===0?'in '+dur(m):`${DL[d.getDay()]}, ${fmt(d)}`)+room;
    big=`<b>${esc(e.start)}</b><span class="soft">${i===0?'Heute':i===1?'Morgen':DS[d.getDay()]}</span>`}
  h.innerHTML=`<div class="hero tint" role="button" tabindex="0" style="${cv(e)}" data-d="${iso(d)}"><div class="hx"><small>${l}</small><h2>${esc(label(e))}</h2><p class="soft">${p}</p></div><div class="big">${big}</div>${prog}</div>`}
const emptyHTML=(t,s)=>`<div class="empty"><div class="ill">${IC.leaf}</div><b>${t}</b><p>${s}</p></div>`;
function renderPlan(){const w=monday(sel);let h='';
  if(view==='day'){const l=eventsOn(sel);
    h=`<div class="dayhead"><h3>${DL[sel.getDay()]}, ${sel.getDate()}. ${MO[sel.getMonth()]}</h3>`;
    if(l.length){const tot=l.reduce((s,e)=>s+toMin(e.end)-toMin(e.start),0);h+=`<span class="num">${l[0].start} – ${l[l.length-1].end} · ${dur(tot)}</span></div>`+dayList(sel,l)}
    else h+='</div>'+emptyHTML('Ein freier Tag','Keine Termine – genieß die Ruhe.')}
  else if(view==='grid'){const ds=[0,1,2,3,4,5].map(i=>addDays(w,i)),[a,b]=range(ds);
    const wide=innerWidth>=620;h=`<div class="gr ${wide?'wide':''}"><div class="gh">${ds.map(d=>`<div class="${iso(d)===iso(new Date())?'today':''}">${DS[d.getDay()]}<b>${d.getDate()}</b></div>`).join('')}</div><div class="gb">${hours(a,b)}<div class="cols">${ds.map(d=>col(d,a,b,wide)).join('')}</div></div></div>`}
  else{for(let i=0;i<6;i++){const d=addDays(w,i),l=eventsOn(d);if(!l.length)continue;
      h+=`<div class="wd ${iso(d)===iso(new Date())?'today':''}"><h3>${DL[d.getDay()]}</h3><span>${fmt(d)}</span></div><div class="wk">`+
      l.map(e=>`<button class="wr" data-a="mod" data-t="${esc(e.title)}" style="${cv(e)}"><time>${esc(e.start)}<span>${esc(e.end)}</span></time><span class="sym tint" aria-hidden="true">${symOf(e,16)}</span><div class="g"><div class="ti">${esc(label(e))}</div><div class="mt">${[e.type&&!e.custom?esc(e.type):'',meta(e)].filter(Boolean).join(' · ')}</div>${e.changed?`<span class="tag">${esc(e.note||'Geändert')}</span>`:''}</div></button>`).join('')+'</div>'}
    if(!h)h=emptyHTML('Eine freie Woche','In dieser Woche stehen keine Termine an.')}
  return h}
function modules(){const m={};events.forEach(e=>{(m[e.title]??={t:e.title,e,n:0,own:false}).n++});
  custom.forEach(c=>{(m[c.title]??={t:c.title,e:{...c,custom:true},n:0,own:true}).n++});return Object.values(m).sort((a,b)=>a.t.localeCompare(b.t,'de'))}
const bub=m=>`<span class="bub tint" style="${cv(m.e)}" aria-hidden="true">${symOf(m.e,18)}</span>`;
function renderNotes(){const ks=Object.keys(notes);if(!ks.length)return emptyHTML('Noch keine Notizen','Tippe bei einem Termin auf den Stift, um etwas festzuhalten.');
  const c={};modules().forEach(m=>c[m.t]=m);
  return '<div class="notes">'+ks.sort((a,b)=>a.localeCompare(b,'de')).map((k,i)=>{const e=c[k]?c[k].e:{title:k};return `<button class="nc tint" data-a="mod" data-t="${esc(k)}" style="${c[k]?cv(e):'--c:'+PALETTE[7].c+';--k:'+PALETTE[7].k};--i:${i}"><div class="ti">${esc(c[k]?label(e):k)}</div><p class="soft">${esc(notes[k])}</p></button>`}).join('')+'</div>'}
function renderMods(){const s=semester();let h='';
  if(s){const t=s.i<0?`Beginnt am ${fmt(s.start)}${s.start.getFullYear()}`:s.i>=s.n?'Vorlesungszeit beendet':`Woche ${s.i+1} von ${s.n}`;
    h+=`<div class="card"><h4>Semester</h4><div class="lg">${t}</div>${s.i>=0&&s.i<s.n?`<p>${s.n-s.i-1===0?'Letzte Woche':'Noch '+plural(s.n-s.i-1,'Woche','Wochen')} · bis ${fmt(s.end)}${s.end.getFullYear()}</p>`:''}
    <div class="weeks" aria-hidden="true">${Array.from({length:s.n},(_,k)=>`<i class="${k<s.i?'d':k===s.i?'c':''}"></i>`).join('')}</div></div>`}
  const ms=modules();
  h+=`<div class="sec">${plural(ms.length,'Modul','Module')}</div>`+(ms.length?'<div class="list">'+ms.map(m=>`<button class="li" data-a="mod" data-t="${esc(m.t)}">${bub(m)}<div class="g"><div class="ti">${esc(m.t)}${m.own?'<span class="pill">EIGEN</span>':''}</div><div class="mt">${plural(m.n,'Termin','Termine')}${notes[m.t]?' · Notiz':''}</div></div><span class="chev">${IC.chev}</span></button>`).join('')+'</div>':emptyHTML('Keine Module','Es wurden noch keine Daten geladen.'));
  const tone=+(store.get('tone',0)||0);
  h+=`<div class="sec">Darstellung</div><div class="card"><h4>Akzentfarbe</h4><div class="tones">${TONES.map((c,i)=>`<button class="tone ${i===tone?'sel':''}" data-pick-tone="${i}" style="--t:${c}" aria-label="Akzent ${TONEN[i]}" aria-pressed="${i===tone}"></button>`).join('')}</div></div>`;
  const ics=new URL('stundenplan.ics',location.href);
  if(ics.protocol.startsWith('http'))h+=`<div class="card"><div class="row"><div><h4>Kalender</h4><p style="margin:0">Termine automatisch im Kalender</p></div><a class="lnkbtn" href="webcal://${esc(ics.host+ics.pathname)}">${IC.link}Abonnieren</a></div></div>`;
  return h}
function anim(el,cls){el.classList.remove('r','l','f');if(cls){void el.offsetWidth;el.classList.add(cls)}}
function render(dir,fade,quiet){const c=$('content');document.body.classList.toggle('q',!!quiet);
  $('plantools').style.display=tab==='plan'?'':'none';document.body.classList.toggle('np',tab!=='plan');
  document.querySelectorAll('.seg button').forEach(b=>{b.classList.toggle('on',b.dataset.v===view);b.setAttribute('aria-pressed',b.dataset.v===view)});
  document.querySelectorAll('.tabs button').forEach(b=>{b.classList.toggle('on',b.dataset.t===tab);b.setAttribute('aria-current',b.dataset.t===tab?'page':'false')});
  if(tab==='plan'){renderStrip();c.innerHTML=renderPlan();
    const wk=iso(monday(sel));if(shownWeek&&wk!==shownWeek)anim($('strip'),wk>shownWeek?'r':'l');shownWeek=wk}
  else{$('ttl').textContent=$('mini').textContent=tab==='notes'?'Notizen':'Module';$('eye').textContent=tab==='notes'?plural(Object.keys(notes).length,'Eintrag','Einträge'):'Übersicht';c.innerHTML=tab==='notes'?renderNotes():renderMods()}
  renderBanner();renderHero();anim(c,dir?(dir>0?'r':'l'):fade?'f':'');placeThumb()}
function shift(n){sel=view==='day'?skipSun(addDays(sel,n),n):addDays(sel,7*n);render(n)}
function shiftWeek(n){sel=addDays(sel,7*n);render(n)}
function todayTarget(){const t=iso(new Date()),cur=monday(new Date());let d=new Date();
  if(events.length&&!events.some(e=>e.date>=iso(cur)&&e.date<=iso(addDays(cur,5)))){const nx=events.find(e=>e.date>=t);d=nx?day(nx.date):day(events[events.length-1].date)}
  return skipSun(d)}
function jumpToday(){const t=todayTarget(),a=iso(view==='day'?sel:monday(sel)),b=iso(view==='day'?t:monday(t));sel=t;render(a===b?0:b>a?1:-1)}

/* ── Eingaben ── */
const setView=v=>{view=v;store.set('view',view);render(0,1)};
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>setView(b.dataset.v));
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{if(tab===b.dataset.t){scrollTo({top:0,behavior:'smooth'});return}tab=b.dataset.t;render(0,1);scrollTo(0,0)});
$('strip').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;const d=day(b.dataset.d),dir=view==='day'?Math.sign(d-sel):0;sel=d;view='day';store.set('view',view);render(dir,!dir)};
$('hero').onclick=e=>{const h=e.target.closest('.hero');if(!h)return;sel=day(h.dataset.d);view='day';render(0,1)};
$('hero').onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('hero')){e.preventDefault();e.target.click()}};
$('prevW').onclick=()=>shiftWeek(-1);$('nextW').onclick=()=>shiftWeek(1);$('todayBtn').onclick=jumpToday;

/* Tastatur: ← → Tag/Woche, ⇧ ← → Woche, T heute, 1/2/3 Ansicht */
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.target.closest&&e.target.closest('input,textarea,select'))return;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){if(tab!=='plan')return;e.preventDefault();const n=e.key==='ArrowRight'?1:-1;e.shiftKey?shiftWeek(n):shift(n)}
  else if(e.key==='t'||e.key==='T'){if(tab!=='plan'){tab='plan';scrollTo(0,0)}jumpToday()}
  else if(tab==='plan'&&['1','2','3'].includes(e.key))setView(['day','week','grid'][+e.key-1])});

/* Trackpad: horizontal wischen */
let wx=0,wLock=0,wReset;
addEventListener('wheel',e=>{if(tab!=='plan'||document.querySelector('dialog[open]'))return;
  if(Math.abs(e.deltaX)<=Math.abs(e.deltaY)*1.2)return;
  e.preventDefault();const t=Date.now();
  if(t<wLock){wLock=t+260;return}
  wx+=e.deltaX;clearTimeout(wReset);wReset=setTimeout(()=>wx=0,200);
  if(Math.abs(wx)>60){shift(wx>0?1:-1);wx=0;wLock=t+260}},{passive:false});

/* Touch: wischen */
let tx=0,ty=0,tr=false;
document.addEventListener('touchstart',e=>{if(document.querySelector('dialog[open]')||tab!=='plan')return;tx=e.changedTouches[0].clientX;ty=e.changedTouches[0].clientY;tr=true},{passive:true});
document.addEventListener('touchend',e=>{if(!tr)return;tr=false;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)shift(dx<0?1:-1)},{passive:true});

/* Dialog: Modul bearbeiten */
const swHTML=(cur,attr)=>PALETTE.map((p,i)=>`<button type="button" class="sw ${i===cur?'sel':''}" style="--c:${p.c}" data-${attr}="${i}" aria-label="${p.n}" aria-pressed="${i===cur}"></button>`).join('');
/* Symbole werden auf der gerade gewählten Farbe gezeigt, damit man sieht, wie sie zusammenpassen */
const clip=v=>[...String(v).trim()].slice(0,3).join('');
const drawM=()=>{const p=PALETTE[selC],st=`--c:${p.c};--k:${p.k}`,auto='svg:'+autoSym(noteKey);
  $('mSw').innerHTML=swHTML(selC,'c');
  $('mPrev').setAttribute('style',st);$('mPrevSym').innerHTML=symFor(selI||auto,22);
  $('mSym').innerHTML=`<button type="button" class="syb auto ${selI===''?'sel':''}" data-s="" aria-pressed="${selI===''}" title="Passend zum Fach">AUTO</button>`+
    Object.entries(SYM).map(([k,[n]])=>`<button type="button" class="syb tint ${selI==='svg:'+k?'sel':''}" style="${st}" data-s="svg:${k}" aria-label="${n}" title="${n}" aria-pressed="${selI==='svg:'+k}">${symFor('svg:'+k,19)}</button>`).join('');
  $('mOwn').value=selI&&!selI.startsWith('svg:')?selI:''};
$('mSw').onclick=e=>{const b=e.target.closest('[data-c]');if(b){selC=+b.dataset.c;drawM()}};
$('mSym').onclick=e=>{const b=e.target.closest('[data-s]');if(b){selI=b.dataset.s;drawM()}};
$('mOwn').oninput=()=>{const v=clip($('mOwn').value);selI=v;const p=$('mOwn').value;drawM();$('mOwn').value=p};
const closeDlg=d=>{if(!d.open||d.classList.contains('out'))return;d.classList.add('out');setTimeout(()=>{d.classList.remove('out');d.close()},matchMedia('(prefers-reduced-motion:reduce)').matches?0:230)};
document.body.addEventListener('click',e=>{
  const a=e.target.closest('button[data-pick-tone]');if(a){const v=+a.dataset.pickTone;if(v){root.dataset.tone=v;store.set('tone',v)}else{delete root.dataset.tone;store.del('tone')}render();return}
  const b=e.target.closest('[data-a="mod"]');if(!b)return;noteKey=b.dataset.t;const m=mods[noteKey]||{};
  const n=events.filter(x=>x.title===noteKey).length,own=custom.some(c=>c.title===noteKey);
  selC=m.c!=null?m.c%PALETTE.length:baseIdx(noteKey);selI=typeof m.i==='string'?m.i:'';$('mTitle').textContent=noteKey;
  $('mHint').textContent=own?'Eigener Termin · nur auf diesem Gerät':plural(n,'Termin','Termine')+' im Semester';
  $('mNote').value=notes[noteKey]||'';$('mDel').style.display=own?'':'none';drawM();$('modDlg').showModal()});
$('mSave').onclick=()=>{mods[noteKey]={c:selC,i:selI.startsWith('svg:')?selI:clip(selI)};store.set('mods',mods);const v=$('mNote').value.trim();v?notes[noteKey]=v:delete notes[noteKey];store.set('notes',notes);closeDlg($('modDlg'));render()};
$('mDel').onclick=()=>{if(confirm('Alle eigenen Termine „'+noteKey+'“ löschen?')){custom=custom.filter(c=>c.title!==noteKey);store.set('custom',custom);closeDlg($('modDlg'));render()}};
$('mCancel').onclick=()=>closeDlg($('modDlg'));

/* Dialog: eigener Termin */
let addC=0;
const drawSw=()=>$('sws').innerHTML=swHTML(addC,'i');
$('sws').onclick=e=>{const b=e.target.closest('[data-i]');if(b){addC=+b.dataset.i;drawSw()}};
$('fRepeat').onchange=()=>$('untilWrap').hidden=!$('fRepeat').checked;
$('addBtn').onclick=()=>{['fName','fRoom','fStart','fEnd'].forEach(i=>$(i).value='');$('fDate').value=iso(sel);$('fRepeat').checked=false;$('untilWrap').hidden=true;$('fUntil').value=lastDate;$('addErr').textContent='';
  addC=Object.keys(titleColor).length%PALETTE.length;drawSw();$('addDlg').showModal()};
$('addCancel').onclick=()=>closeDlg($('addDlg'));
$('addSave').onclick=()=>{const name=$('fName').value.trim(),date=$('fDate').value,s=$('fStart').value,en=$('fEnd').value,rep=$('fRepeat').checked,u=$('fUntil').value;let err='';
  if(!name)err='Bitte gib einen Namen ein.';else if(!date)err='Bitte wähle ein Datum.';else if(!s||!en||en<=s)err='Die Endzeit muss nach der Startzeit liegen.';else if(rep&&(!u||u<date))err='Das Enddatum muss nach dem Startdatum liegen.';
  if(err){$('addErr').textContent=err;return}
  custom.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:name,date,start:s,end:en,room:$('fRoom').value.trim()||null,color:addC,until:rep?u:null});
  store.set('custom',custom);sel=skipSun(day(date));tab='plan';view='day';closeDlg($('addDlg'));render(0,1)};
['modDlg','addDlg'].forEach(id=>{const d=$(id);d.addEventListener('click',e=>{if(e.target===d)closeDlg(d)});d.addEventListener('cancel',e=>{e.preventDefault();closeDlg(d)})});

/* ── Laden (mit Offline-Speicher) ── */
let loading=false,loadedAt=0;
function footer(){$('stand').innerHTML=(offline?'Offline · ':'')+`Datenstand ${(genAt&&!isNaN(new Date(genAt))?stamp(new Date(genAt)):'–')}`+(offline||!loadedAt?'':`<br>Geprüft ${stamp(new Date(loadedAt))}`)}
function apply(raw){const d=cleanData(raw);if(!d)throw new Error('Ungültige Daten');events=d.events;genAt=d.generated;lastDate=events.reduce((m,e)=>e.date>m?e.date:m,'');buildColors();
  if(!store.get('seen',null))snapshot();footer();
  if(!started){started=true;sel=todayTarget();render(0,1)}else render(0,0,1)}
async function loadData(manual){if(loading)return;loading=true;$('refreshBtn').classList.add('spin');
  try{const r=await fetch('stundenplan.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();
    apply(d);store.set('cache',d);offline=false;loadedAt=Date.now();footer()}
  catch(e){offline=true;if(!started)$('content').innerHTML=emptyHTML('Keine Verbindung','Und noch keine gespeicherten Daten auf diesem Gerät.');
    else{footer();if(manual)alert('Du bist offline. Angezeigt werden die zuletzt gespeicherten Daten.')}}
  finally{loading=false;$('refreshBtn').classList.remove('spin')}}
$('refreshBtn').onclick=()=>loadData(true);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Date.now()-loadedAt>30000)loadData(false)});
addEventListener('pageshow',e=>{if(e.persisted)loadData(false)});
addEventListener('online',()=>loadData(false));
setInterval(()=>{if(!document.hidden&&started){if(tab==='plan')render(0,0,1)}},60000);
document.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.v===view));placeThumb();
const cached=store.get('cache',null);if(cached)try{apply(cached)}catch(e){store.del('cache')}
loadData(false);
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
