// MyOS Timestamp Converter
const root = document.getElementById('TimestampApp');
if (root) {
  const $=id=>document.getElementById(id);
  function utc(){ return $('ts-utcchk').checked; }
  function fmt(d){ return utc()? d.toUTCString() : d.toString(); }
  function tick(){ $('ts-now').textContent=Math.floor(Date.now()/1000); }
  $('ts-copy').onclick=function(){ const t=String(Math.floor(Date.now()/1000)); navigator.clipboard&&navigator.clipboard.writeText(t).catch(()=>{}); this.textContent='copied'; setTimeout(()=>this.textContent='copy',900); };
  $('ts-epoch').addEventListener('input',()=>{ const raw=$('ts-epoch').value.trim(); if(!raw){ $('ts-fromepoch').textContent=''; return; }
    let n=Number(raw); if(isNaN(n)){ $('ts-fromepoch').textContent='Not a number.'; return; }
    const ms = Math.abs(n)>=1e12 ? n : n*1000; $('ts-unit').textContent = Math.abs(n)>=1e12?'milliseconds':'seconds';
    const d=new Date(ms); if(isNaN(d)){ $('ts-fromepoch').textContent='Out of range.'; return; } $('ts-fromepoch').textContent='→ '+fmt(d); });
  $('ts-date').addEventListener('input',()=>{ const v=$('ts-date').value; if(!v){ $('ts-fromdate').textContent=''; return; }
    const d=new Date(v); $('ts-fromdate').textContent='→ '+Math.floor(d.getTime()/1000)+' s  ·  '+d.getTime()+' ms'; });
  $('ts-utcchk').addEventListener('change',()=>{ $('ts-epoch').dispatchEvent(new Event('input')); });
  tick(); setInterval(tick,1000);
}
