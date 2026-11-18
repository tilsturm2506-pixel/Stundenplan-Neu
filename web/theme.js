// Läuft vor dem ersten Zeichnen, damit Theme/Akzent nicht flackern
try{const t=JSON.parse(localStorage.getItem('stundenplan.theme'));if(t)document.documentElement.dataset.theme=t;const a=JSON.parse(localStorage.getItem('stundenplan.tone'));if(a!=null)document.documentElement.dataset.tone=a}catch(e){}
