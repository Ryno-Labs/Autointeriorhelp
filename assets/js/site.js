
const SITE_INDEX = [
  {t:'How to Fix a Sagging Headliner',u:'headliner-guide.html',d:'Causes, tools and repair options for a sagging headliner.'},
  {t:'Torn Leather & Seat Damage',u:'problems.html#leather',d:'Repair, replacement and product options for damaged seats.'},
  {t:'Stains and Spills',u:'cleaning.html#stains',d:'Safe cleaning methods for cloth, carpet, vinyl and leather.'},
  {t:'Cracked Dashboard',u:'problems.html#dash',d:'Ways to repair and prevent dashboard cracking.'},
  {t:'Interior Cleaning & Protection',u:'cleaning.html',d:'Cleaners, brushes, protectants, mats and odor control.'},
  {t:'Product Reviews',u:'reviews.html',d:'Curated auto interior products and buying guidance.'},
  {t:'Approved Videos',u:'videos.html',d:'Hand-picked video tutorials and demonstrations.'},
  {t:'Community Forum',u:'forum.html',d:'Ask questions and share real-world fixes.'},
  {t:'Deals & Top Picks',u:'deals.html',d:'Popular products and value-focused picks.'},
  {t:'Auto Interior Guides',u:'guides.html',d:'Browse practical guides by topic.'}
];
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
$('.menu-btn')?.addEventListener('click',()=>$('.nav')?.classList.toggle('open'));
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const group=btn.closest('[data-filter-group]');group?.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const v=btn.dataset.filter;$$('[data-category]').forEach(card=>card.style.display=(v==='all'||card.dataset.category===v)?'':'none')}));
$$('[data-toast]').forEach(el=>el.addEventListener('click',e=>{if(el.dataset.toast){showToast(el.dataset.toast)}}));
function showToast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$$('.header-search input').forEach(inp=>{const box=inp.parentElement,results=box.querySelector('.search-results');inp.addEventListener('input',()=>{const q=inp.value.trim().toLowerCase();if(!q){results.innerHTML='';results.classList.remove('show');return}const hits=SITE_INDEX.filter(x=>(x.t+' '+x.d).toLowerCase().includes(q)).slice(0,6);results.innerHTML=hits.length?hits.map(x=>`<a class="search-result" href="${x.u}"><strong>${x.t}</strong><small>${x.d}</small></a>`).join(''):`<div class="search-result"><strong>No exact match</strong><small>Try headliner, leather, stains, cleaning or products.</small></div>`;results.classList.add('show')})});
$$('[data-affiliate]').forEach(a=>{a.addEventListener('click',()=>{try{localStorage.setItem('aih_last_affiliate_click',JSON.stringify({product:a.dataset.affiliate,time:new Date().toISOString()}))}catch(e){}})});
$$('.newsletter-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const email=f.querySelector('input[type=email]').value.trim();if(email){try{localStorage.setItem('aih_demo_email',email)}catch(e){}showToast('Demo signup saved on this device.');f.reset()}}));
const forumForm=$('#forumForm'); if(forumForm){renderLocalThreads();forumForm.addEventListener('submit',e=>{e.preventDefault();const title=$('#forumTitle').value.trim(),body=$('#forumBody').value.trim();if(!title||!body)return;let rows=JSON.parse(localStorage.getItem('aih_threads')||'[]');rows.unshift({title,body,date:new Date().toLocaleDateString()});localStorage.setItem('aih_threads',JSON.stringify(rows.slice(0,10)));forumForm.reset();renderLocalThreads();showToast('Demo discussion added on this device.')})}
function renderLocalThreads(){const holder=$('#localThreads');if(!holder)return;const rows=JSON.parse(localStorage.getItem('aih_threads')||'[]');holder.innerHTML=rows.map((r,i)=>`<div class="forum-row"><div class="avatar">Y</div><div><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.body)}</p></div><div class="forum-stats">Demo post<br>${r.date}</div></div>`).join('')}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
