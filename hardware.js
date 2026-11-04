'use strict';
// A static, source-linked research directory. No keys, accounts or remote writes.
window.HardwareApp = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = value => { try {const u = new URL(value);return u.protocol==='https:' ? esc(u.href) : '#';}catch{return '#';} };
  const main = document.querySelector('main');
  const saleLabels={retail:'个人零售',preorder:'消费预订', 'consumer-fitting':'个人验配渠道',rental:'硬件租赁 / 订阅',reservation:'付费预约 · 非正式订单'};
  const statusLabels = {on_sale:'在售',preorder:'预售 / 延期交付',needs_check:'待复核',discontinued:'停售',reservation:'付费预约 · 非正式订单'};
  const chinaLabels = {official:'有官方购买渠道',import:'跨境 / 进口',unclear:'国内情况待确认',unavailable:'国内购买或服务受限'};
  const aiLabels = {generative:'生成式 AI',perception:'识别 / 决策 AI',hybrid:'混合 AI'};
  const nicheLabels = {crowded:'竞争密集',emerging:'新兴竞争',specialist:'细分专业'};
  const imageLabels = {product:'产品图',reference:'参考图','official-structure':'官方结构图','ai-exploded':'AI 爆炸示意'};
  const mediaSrc = path => /^assets\/hardware\/[a-z0-9-]+\/[a-zA-Z0-9._-]+\.(png|jpe?g|webp|avif|gif)$/i.test(path || '') ? esc(path) : '';
  const dimensions = [['demand','需求与市场','需求假设'],['userProfile','用户画像','目标用户推断'],['competition','竞争与替代','竞争判断'],['supplyChain','供应链','披露与推断'],['technology','技术路径','技术拆解'],['aesthetics','产品审美','设计观察'],['risks','关键风险','待验证事项'],['opportunity','市场空间','差异化判断']];
  let data, loading, fullCatalogLoading, renderVersion = 0;
  const detailCache=new Map();
  const PAGE_SIZE=24;
  const state = {category:'all',status:'available',china:'all',niche:'all',ai:'all',search:'',sort:'category',page:1};
  const compared = new Set();
  const categoryName = id => data.categories.find(c=>c.id===id)?.name || id;
  const productImage = p => p.images?.find(im=>im.kind==='product');
  function thumbnail(p, className='hw-product-thumbnail') {
    const im=productImage(p);return im?`<img class="${className}" src="${mediaSrc(im.path)}" alt="${esc(im.alt)}" loading="lazy" decoding="async" width="120" height="120">`:'';
  }
  function mediaCaption(im) {
    if(im.kind==='ai-exploded') return `<span class="hw-media-label hw-media-ai">AI 生成 · 非实物拆机</span><p>${esc(im.caption)}。内部布局及元件形状属于概念推断，不用于确认 BOM、精确尺寸或维修步骤。</p><a href="${esc(im.promptPath)}" target="_blank" rel="noopener noreferrer">查看生成提示词 ↗</a><a href="${mediaSrc(im.path)}" target="_blank" rel="noopener noreferrer">打开原图 ↗</a>`;
    return `<span class="hw-media-label">${imageLabels[im.kind]}</span><p>${esc(im.caption)}</p><a href="${url(im.sourceUrl)}" target="_blank" rel="noopener noreferrer">图片来源 · ${esc(im.credit)} ↗</a><a href="${mediaSrc(im.path)}" target="_blank" rel="noopener noreferrer">打开原图 ↗</a>`;
  }
  function imageGallery(p) {
    if(!p.images?.length)return '';
    const first=Math.max(0,p.images.findIndex(im=>im.kind==='product')),im=p.images[first];
    return `<section class="hw-gallery" id="hw-visuals" aria-label="${esc(p.name)} 产品图库"><div class="hw-gallery-main"><button class="hw-gallery-zoom" data-hw-open-image="${p.id}" data-image-index="${first}" aria-label="放大当前图片"><img id="hw-gallery-image" src="${mediaSrc(im.path)}" alt="${esc(im.alt)}" decoding="async"><span>点击放大 ↗</span></button><div class="hw-gallery-caption" id="hw-gallery-caption">${mediaCaption(im)}</div></div><div class="hw-gallery-selector"><div class="hw-gallery-heading"><span>VISUAL DOSSIER</span><h2>产品视觉档案</h2><p>${p.images.length} 张图片 · 来源与推断分开看</p></div><div class="hw-gallery-thumbs" aria-label="选择图片">${p.images.map((img,i)=>`<button type="button" class="hw-gallery-thumb" data-hw-select-image="${p.id}" data-image-index="${i}" aria-pressed="${i===first}"><img src="${mediaSrc(img.path)}" alt="" loading="lazy" decoding="async"><span><b>${imageLabels[img.kind]}</b><small>${img.kind==='ai-exploded'?'AI 生成辅助理解':esc(img.credit)}</small></span></button>`).join('')}</div><p class="hw-gallery-note">产品图保留原始外观。AI 图仅用于解释可能的功能与结构关系。</p>${p.mediaNotes?.length?`<details class="hw-media-notes"><summary>图片核查说明</summary>${p.mediaNotes.map(n=>`<p>${esc(n)}</p>`).join('')}</details>`:''}</div></section>`;
  }
  let imageDialog=null, lightboxProduct=null, lightboxIndex=0;
  function ensureImageDialog(){
    if(imageDialog)return imageDialog;
    imageDialog=document.createElement('dialog');imageDialog.className='hw-lightbox';imageDialog.id='hw-image-dialog';imageDialog.setAttribute('aria-labelledby','hw-lightbox-title');
    imageDialog.innerHTML='<div class="hw-lightbox-bar"><h2 id="hw-lightbox-title"></h2><button type="button" data-lightbox="close" aria-label="关闭图片">关闭 ×</button></div><div class="hw-lightbox-image-wrap"><img id="hw-lightbox-image" alt=""></div><div id="hw-lightbox-caption" class="hw-lightbox-caption"></div><div class="hw-lightbox-nav"><button type="button" data-lightbox="previous" aria-label="上一张图片">← 上一张</button><span id="hw-lightbox-count" aria-live="polite"></span><button type="button" data-lightbox="next" aria-label="下一张图片">下一张 →</button></div>';
    document.body.append(imageDialog);
    imageDialog.addEventListener('click',ev=>{const action=ev.target.closest('[data-lightbox]')?.dataset.lightbox;if(action==='close')imageDialog.close();if(action==='previous')updateLightbox(-1);if(action==='next')updateLightbox(1);if(ev.target===imageDialog)imageDialog.close();});
    imageDialog.addEventListener('keydown',ev=>{if(ev.key==='ArrowLeft'){ev.preventDefault();updateLightbox(-1);}if(ev.key==='ArrowRight'){ev.preventDefault();updateLightbox(1);}});
    window.addEventListener('hashchange',()=>{if(imageDialog.open)imageDialog.close();});return imageDialog;
  }
  function updateLightbox(delta=0){
    if(!lightboxProduct)return;const images=lightboxProduct.images;lightboxIndex=(lightboxIndex+delta+images.length)%images.length;const im=images[lightboxIndex];
    const img=imageDialog.querySelector('#hw-lightbox-image');img.src=im.path;img.alt=im.alt;
    imageDialog.querySelector('#hw-lightbox-title').textContent=`${lightboxProduct.name} · ${imageLabels[im.kind]}`;
    imageDialog.querySelector('#hw-lightbox-caption').innerHTML=mediaCaption(im);
    imageDialog.querySelector('#hw-lightbox-count').textContent=`${lightboxIndex+1} / ${images.length}`;
  }
  function openImage(id,index){
    const p=data.products.find(p=>p.id===id);if(!p?.images?.[index])return;
    lightboxProduct=p;lightboxIndex=index;ensureImageDialog();updateLightbox();imageDialog.showModal();imageDialog.querySelector('[data-lightbox="close"]').focus();
  }
  function selectImage(id,index){
    const p=data.products.find(p=>p.id===id), im=p?.images?.[index];if(!im)return;
    const target=document.getElementById('hw-gallery-image');if(!target)return;
    target.src=im.path;target.alt=im.alt;document.getElementById('hw-gallery-caption').innerHTML=mediaCaption(im);
    document.querySelector('.hw-gallery-zoom').dataset.imageIndex=index;
    document.querySelectorAll('[data-hw-select-image]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.imageIndex)===index)));
  }
  function explodedFigure(p){
    const i=p.images?.findIndex(im=>im.kind==='ai-exploded')??-1;
    if(i<0)return architecture(p);
    const im=p.images[i];return `<figure class="hw-exploded-figure"><button data-hw-open-image="${p.id}" data-image-index="${i}" aria-label="放大 ${esc(p.name)} 的AI爆炸示意"><img src="${mediaSrc(im.path)}" alt="${esc(im.alt)}" loading="lazy" decoding="async"><span>放大查看 ↗</span></button><figcaption>${mediaCaption(im)}</figcaption></figure><details class="hw-architecture-details"><summary>对照文字功能分层与证据</summary>${architecture(p)}</details>`;
  }
  const isAvailable = p => ['on_sale','preorder'].includes(p.status);
  async function load() {
    if(data) return data;
    if(!loading) loading=fetch('content/hardware/index.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error('目录读取失败');return r.json();}).then(d=>data=d).catch(err=>{loading=null;throw err;});
    return loading;
  }
  async function loadProduct(id){
    const index=data.products.findIndex(p=>p.id===id);if(index<0)return null;
    if(!detailCache.has(id))detailCache.set(id,fetch(`content/hardware/products/${id}.json`,{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('产品详情读取失败');return r.json();}).then(p=>{data.products[index]=p;return p;}).catch(e=>{detailCache.delete(id);throw e;}));
    return detailCache.get(id);
  }
  const pill = (text,solid=false) => `<span class="hw-pill${solid?' hw-pill-solid':''}">${esc(text)}</span>`;
  const tabs = active => `<nav class="hw-tabs" aria-label="市场研究导航"><a href="#hardware" ${active==='market'?'aria-current="page"':''}>产品目录</a><a href="#hardware/scenes" ${active==='scenes'?'aria-current="page"':''}>场景与差异</a><a href="#hardware/compare" ${active==='compare'?'aria-current="page"':''}>产品对比 <span data-compare-count>${compared.size}</span></a><a href="#supply-chain">供应链目录</a><a href="#hardware/insights" ${active==='insights'?'aria-current="page"':''}>市场观察</a><a href="#hardware/methodology" ${active==='methodology'?'aria-current="page"':''}>研究方法</a></nav>`;
  function intro(title,description,section='MARKET RESEARCH / 2026.11') {
    return `<header class="hw-intro"><a class="back-link" href="#home">← Roman 首页</a><div class="eyebrow">${section}</div><h1>${title}</h1><p>${description}</p></header>`;
  }
  function getFiltered() {
    const query=state.search.trim().toLocaleLowerCase();
    const list=data.products.filter(p=>
      (state.category==='all'||p.category===state.category)&&
      (state.status==='all'||(state.status==='available'?isAvailable(p):p.status===state.status))&&
      (state.china==='all'||p.china.availability===state.china)&&
      (state.niche==='all'||p.niche.level===state.niche)&&
      (state.ai==='all'||p.ai.type===state.ai)&&
      (!query||[p.name,p.brand,p.tagline,p.ai.description,categoryName(p.category),...p.highlights].join(' ').toLocaleLowerCase().includes(query)));
    if(state.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name,'zh-CN'));
    if(state.sort==='checked') list.sort((a,b)=>b.checkedAt.localeCompare(a.checkedAt));
    return list;
  }
  function selectFilter(key,label,options) {
    return `<label class="hw-select"><span>${label}</span><select aria-label="${label}" data-hw-filter="${key}">${options.map(([id,text])=>`<option value="${id}" ${state[key]===id?'selected':''}>${text}</option>`).join('')}</select></label>`;
  }
  function renderScenes(){
    document.title='独立场景与产品差异 · Roman';
    const groups=(data.discovery?.groups||[]).filter(g=>g.available>0);
    main.innerHTML=`<div class="page hw-page">${intro('先看问题，再看产品。','按独立需求与使用场景整理，<br>比较不同实现的差异，寻找被忽略的用户任务。')}${tabs('scenes')}<aside class="sc-boundary"><h2>${groups.length} 个可订购产品场景</h2><p>${data.products.filter(isAvailable).length} 款可订购产品，按任务分组比较实现差异。</p><p>${esc(data.discovery?.scope||'场景分组正在整理。')}</p><p>公司或产品自称创新，不等于已经验证需求。以下保留替代方案、技术与交付边界，不提供伪精确的创新分数。</p>${data.products.some(p=>p.status==='reservation')?'<a class="sc-doc-link" href="#hardware/status/reservation">查看付费预约项目（不计可订购） →</a>':''}</aside><label class="sc-scene-search" for="hw-scene-search">寻找场景、产品或具体差异<input type="search" id="hw-scene-search" placeholder="例如：纸面查词、宠物饮水、无屏语音、家庭能源"></label><div class="sc-scene-grid">${groups.map(g=>{const ps=g.productIds.map(id=>data.products.find(p=>p.id===id)).filter(isAvailable);return `<section class="sc-scene" data-scene-text="${esc([g.name,...ps.flatMap(p=>[p.name,p.deepDive.innovationProfile.difference])].join(' ').toLowerCase())}"><div class="sc-scene-heading"><span class="eyebrow">INDEPENDENT NEED</span><span>${ps.length} 种实现</span></div><h2>${esc(g.name)}</h2>${ps.slice(0,1).map(p=>`<div class="sc-scene-feature">${thumbnail(p)}<div><h3><a href="#hardware/product/${p.id}/analysis">${esc(p.name)} ↗</a></h3><p>${esc(p.deepDive.innovationProfile.difference.slice(0,180))}${p.deepDive.innovationProfile.difference.length>180?'…':''}</p><a href="#hardware/product/${p.id}/analysis">阅读完整差异与八维分析 →</a></div></div>`).join('')}${ps.length>1?`<details><summary>比较本场景的其他 ${ps.length-1} 种实现</summary>${ps.slice(1).map(p=>`<article><h3><a href="#hardware/product/${p.id}/analysis">${esc(p.name)} ↗</a></h3><p>${esc(p.deepDive.innovationProfile.difference)}</p></article>`).join('')}</details>`:''}</section>`;}).join('')}</div><p id="hw-scene-empty" hidden>没有匹配场景，试着换一个任务关键词。</p></div>`;
  }
  function renderMarket() {
    const available=data.products.filter(isAvailable).length;
    const preorder=data.products.filter(p=>p.status==='preorder').length;
    const categories=data.categories.filter(c=>data.products.some(p=>p.category===c.id));
    document.title='C端 AI 智能硬件市场目录 · Roman';
    main.innerHTML=`<div class="page hw-page">${intro('C端 AI 智能硬件市场目录','个人、家庭与创作者可购买使用的 AI 硬件。<br>从冷门消费场景出发，逐款核对产品、需求与服务。')}<div class="hw-stats"><div><strong>${data.products.length}</strong><span>已研究消费产品 / 系列</span></div><div><strong>${available}</strong><span>可订购消费产品 · 其中 ${preorder} 款预订 / 延期</span></div><div><strong>${categories.length}</strong><span>产品分类</span></div><div class="hw-stat-date"><strong>${esc(data.checkedAt.replaceAll('-','.'))}</strong><span>最新核查日期</span></div></div>${tabs('market')}<div class="hw-research-note"><span>阅读说明</span><p>只收个人、家庭与个人创作者使用的实体产品。企业专用设备、纯开发板与单纯自动化不计入消费目录；“细分专业”不等于蓝海。<a href="#hardware/methodology">查看研究边界 ↗</a></p></div><div class="hw-explore"><span>探索细分场景</span>${['accessibility','hearing','pet-care','music','sleep','sports','home-energy'].filter(id=>data.products.some(p=>p.category===id)).map(id=>`<button data-hw-category="${id}" aria-pressed="${state.category===id}">${esc(categoryName(id))} ↗</button>`).join('')}</div><div class="hw-directory"><aside class="hw-sidebar"><div class="hw-sidebar-label">产品分类</div><button class="hw-category" data-hw-category="all" aria-pressed="${state.category==='all'}"><span>全部分类</span><span>${data.products.length}</span></button>${[...new Set(data.categories.filter(c=>data.products.some(p=>p.category===c.id)).map(c=>c.group))].map(group=>`<p class="hw-group-label">${group}</p>${data.categories.filter(c=>c.group===group&&data.products.some(p=>p.category===c.id)).map(c=>`<button class="hw-category" data-hw-category="${c.id}" aria-pressed="${state.category===c.id}"><span>${c.name}</span><span>${data.products.filter(p=>p.category===c.id).length}</span></button>`).join('')}`).join('')}<a class="hw-download-link" href="https://github.com/RomanAgent/Roman/blob/main/docs/hardware-market.md" target="_blank" rel="noopener noreferrer">GitHub 阅读版 ↗</a></aside><section class="hw-results" aria-label="产品搜索与目录"><div class="hw-search-row"><label class="hw-search"><span class="sr-only">搜索产品、品牌或AI能力</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg><input type="search" id="hw-search" value="${esc(state.search)}" placeholder="搜索产品、品牌或 AI 能力" autocomplete="off"></label><button class="hw-outline" data-hw-action="export">导出筛选结果 ↓</button></div><div class="hw-filter-row">${selectFilter('status','销售状态',[['available','在售与预售'],['all','全部状态'],...Object.entries(statusLabels)])}${selectFilter('china','中国大陆',[['all','全部购买情况'],...Object.entries(chinaLabels)])}${selectFilter('niche','赛道判断',[['all','全部竞争类型'],...Object.entries(nicheLabels)])}${selectFilter('ai','AI 类型',[['all','全部 AI 类型'],...Object.entries(aiLabels)])}</div><div class="hw-list-toolbar"><p id="hw-results-count" role="status" aria-live="polite"></p><div><button class="hw-text-button" data-hw-action="reset">重置筛选</button>${selectFilter('sort','排序',[['category','按分类'],['name','按产品名'],['checked','按核查日期']])}</div></div><div id="hw-list"></div><div id="hw-pagination"></div><div class="hw-list-end">价格、库存、订阅与服务地区以商家结算页为准。核查未包含实际下单。</div></section></div><div id="hw-compare-tray"></div></div>`;
    renderList();
  }
  function renderList() {
    const filtered=getFiltered();
    const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));state.page=Math.min(state.page,pages);
    const start=(state.page-1)*PAGE_SIZE,products=filtered.slice(start,start+PAGE_SIZE);
    document.querySelector('#hw-results-count').textContent=`${state.category==='all'?'全部分类':categoryName(state.category)} · ${filtered.length} 个结果${filtered.length>PAGE_SIZE?` · 显示 ${start+1}–${start+products.length}`:''}`;
    document.querySelectorAll('[data-hw-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hwCategory===state.category)));
    document.querySelector('#hw-list').innerHTML=products.length ? `<div class="hw-table-head" aria-hidden="true"><span>产品 / AI 的实际作用</span><span>销售与参考价格</span><span>市场判断</span><span>对比</span></div>${products.map(p=>`<article class="hw-product-row"><div class="hw-product-main"><a class="hw-product-thumb-link" href="#hardware/product/${p.id}" aria-label="查看 ${esc(p.name)} 产品图">${thumbnail(p)}</a><div class="hw-product-copy"><div class="hw-product-kicker">${esc(p.brand)} <span> / </span> ${esc(categoryName(p.category))}</div><h2><a href="#hardware/product/${p.id}">${esc(p.name)} <span aria-hidden="true">↗</span></a></h2><p>${esc(p.tagline)}</p><div class="hw-row-tags">${pill(aiLabels[p.ai.type])}<span>${esc(chinaLabels[p.china.availability])}</span></div></div></div><div class="hw-product-sale">${pill(statusLabels[p.status],isAvailable(p))}<strong>${esc(p.price.text)}</strong><span>${esc(p.regions.join(' / '))}</span>${p.saleMode==='consumer-fitting'?'<small class="hw-fitting">个人验配渠道</small>':''}</div><div class="hw-product-market"><span>${esc(nicheLabels[p.niche.level])}</span><a href="#hardware/product/${p.id}">阅读 8 维分析 →</a></div><label class="hw-compare-check"><input type="checkbox" data-hw-compare="${p.id}" ${compared.has(p.id)?'checked':''}><span class="sr-only">对比 ${esc(p.name)}</span></label></article>`).join('')}` : '<div class="hw-empty"><h2>没有匹配的产品</h2><p>试着放宽销售状态、分类或关键词。</p><button class="hw-outline" data-hw-action="reset">清除筛选</button></div>';
    document.querySelector('#hw-pagination').innerHTML=pages>1?`<nav class="hw-pagination" aria-label="产品结果分页"><button data-hw-action="previous-page" ${state.page===1?'disabled':''}>← 上一页</button><label>第 <select data-hw-page="true" aria-label="选择结果页">${Array.from({length:pages},(_,i)=>`<option value="${i+1}" ${state.page===i+1?'selected':''}>${i+1}</option>`).join('')}</select> / ${pages} 页</label><button data-hw-action="next-page" ${state.page===pages?'disabled':''}>下一页 →</button></nav>`:'';
    renderTray();
  }
  function renderTray() {
    document.querySelectorAll('[data-compare-count]').forEach(el=>el.textContent=compared.size);
    const tray=document.querySelector('#hw-compare-tray');
    if(!tray)return;
    tray.innerHTML=compared.size?`<aside class="hw-compare-tray" aria-label="已选对比产品"><span><b>${compared.size} / 3</b> ${[...compared].map(id=>esc(data.products.find(p=>p.id===id)?.name)).join(' · ')}</span><div><button data-hw-action="clear-compare">清空</button><a href="#hardware/compare">查看对比 →</a></div><p id="hw-compare-notice" role="status"></p></aside>`:'';
  }
  function architecture(product) {
    const layers=product.architecture;
    return `<div class="hw-architecture"><div class="hw-layer-visual" aria-hidden="true"><svg viewBox="0 0 360 ${layers.length*65+95}">${layers.map((a,i)=>`<g transform="translate(15,${35+i*65})"><path d="M25 55 165 0 305 55 165 110Z" fill="${i%2?'#e7e7e7':'#f8f8f8'}" stroke="#777"/><path d="M25 55v9l140 55 140-55v-9M165 110v9" fill="none" stroke="#999"/><text x="165" y="61" text-anchor="middle" font-family="monospace" font-size="20" fill="#333">${String(i+1).padStart(2,'0')}</text></g>`).join('')}</svg></div><ol class="hw-layer-list">${layers.map((a,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><div><h3>${esc(a.name)} <small>${a.evidence==='official'?'官方披露':'分析推断'}</small></h3><p>${esc(a.detail)}</p></div></li>`).join('')}</ol></div>`;
  }
  function deepAnalysis(p) {
    const d=p.deepDive;
    if(!d)return `<div class="hw-analysis-grid">${dimensions.map(([key,label,type],i)=>`<section><div class="hw-dimension-label">${String(i+1).padStart(2,'0')} / ${type}</div><h3>${label}</h3><p>${esc(p.analysis[key])}</p></section>`).join('')}</div>`;
    return `<div class="hw-deep-layout"><nav class="hw-deep-nav" aria-label="八维深度分析目录">${dimensions.map(([key,label],i)=>`<a href="#hardware/product/${p.id}/dimension-${key}"><span>${String(i+1).padStart(2,'0')}</span>${label}</a>`).join('')}<a href="#hardware/product/${p.id}/supply">对应供应链公司 ↗</a></nav><div class="hw-deep-body">${dimensions.map(([key,label,type],i)=>`<section class="hw-deep-dimension" id="hw-dimension-${key}"><div class="eyebrow">${String(i+1).padStart(2,'0')} / ${type}</div><h3>${label}</h3><p class="hw-deep-summary">${esc(p.analysis[key])}</p>${d.dimensions[key].map(b=>window.SupplyChainApp.blockHTML(b,d.sources)).join('')}${key==='supplyChain'?`<a class="hw-deep-supply-link" href="#hardware/product/${p.id}/supply">查看本产品对应的供应链公司 →</a>`:''}</section>`).join('')}<section class="hw-deep-source-list"><h3>深度分析引用资料</h3><ol class="sc-source-list">${d.sources.map(s=>`<li><a href="${url(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><p>${esc(s.note)}</p></li>`).join('')}</ol></section></div></div>`;
  }
  function renderProduct(id) {
    const p=data.products.find(p=>p.id===id);
    if(!p){const archived=data.excludedProducts?.find(x=>x.id===id);main.innerHTML=archived?`<div class="page hw-empty"><h1>${esc(archived.name)} 已移入专业档案</h1><p>${esc(archived.reason)}</p><a href="https://github.com/RomanAgent/Roman/blob/main/docs/hardware/${archived.id}.md" target="_blank" rel="noopener noreferrer">查阅历史研究 ↗</a><p><a href="#hardware">返回消费目录 →</a></p></div>`:'<div class="page hw-empty"><h1>未找到这款产品</h1><a href="#hardware">返回产品目录 →</a></div>';return;}
    document.title=`${p.name} · 产品研究 · Roman`;
    main.innerHTML=`<article class="page hw-page hw-detail"><a class="back-link" href="#hardware">← 返回市场目录</a><div class="hw-detail-heading"><div><div class="eyebrow">${esc(categoryName(p.category))} / ${esc(p.brand)}</div><h1>${esc(p.name)}</h1><p>${esc(p.tagline)}</p></div><div class="hw-detail-actions"><a class="button-primary" href="${url(p.officialUrl)}" target="_blank" rel="noopener noreferrer">官方产品 / 商店 ↗</a><button class="hw-outline" data-hw-toggle-compare="${p.id}">${compared.has(p.id)?'从对比中移除':'加入产品对比'}</button></div></div><div class="hw-detail-meta">${pill(statusLabels[p.status],isAvailable(p))}${pill(aiLabels[p.ai.type])}<span>核查 ${esc(p.checkedAt)} · ${new Set([...p.sources,...(p.deepDive?.sources||[])].map(s=>s.url)).size} 条来源</span><a href="docs/hardware/${p.id}.md" target="_blank">Markdown 阅读版 ↗</a></div>${imageGallery(p)}<div class="hw-fact-grid"><section><h2>销售与交付 <small>${esc(saleLabels[p.saleMode]||'公开信息')}</small></h2><strong>${esc(p.price.text)}</strong><p>${esc(p.price.note)}</p><p>${esc(p.statusEvidence)}</p><span>${esc(p.regions.join(' / '))}</span></section><section><h2>中国大陆购买 <small>地区核查</small></h2><strong>${esc(chinaLabels[p.china.availability])}</strong><p>${esc(p.china.note)}</p></section><section><h2>AI 实际做什么 <small>厂商披露</small></h2><p>${esc(p.ai.description)}</p><p class="hw-dependency">${esc(p.ai.dependency)}</p></section></div><nav class="hw-detail-nav" aria-label="本页目录"><a href="#hardware/product/${p.id}/analysis">8 维产品分析 ↓</a><a href="#hardware/product/${p.id}/supply">对应供应链公司 ↓</a><a href="#hardware/product/${p.id}/structure">AI 爆炸与结构示意 ↓</a><a href="#hardware/product/${p.id}/sources">资料来源 ↓</a></nav><section class="hw-niche"><span class="eyebrow">IS IT A NICHE?</span><h2>${esc(nicheLabels[p.niche.level])}<small>研究判断，非市场份额统计</small></h2><p>${esc(p.niche.reason)}</p></section><section id="hw-analysis" class="hw-analysis-section"><div class="hw-section-header"><span>PRODUCT ANALYSIS / 08</span><h2>逐项拆开看。</h2><p>以下为公开资料基础上的案头分析；不代表实测、访谈或已验证的商业结果。</p></div>${deepAnalysis(p)}</section>${window.SupplyChainApp.productLinks(p)}<section id="hw-structure" class="hw-structure-section"><div class="hw-section-header"><span>FUNCTIONAL ARCHITECTURE</span><h2>从外观，看到可能的组成。</h2><p>概念功能分层示意，非真实拆机或物理爆炸图；不表示实际元件位置、层数、尺寸或 BOM。</p></div>${explodedFigure(p)}</section><section id="hw-sources" class="hw-sources"><div class="hw-section-header"><span>EVIDENCE & LIMITS</span><h2>资料来源与判断边界</h2></div><p class="hw-source-note">厂商资料用于确认产品声明与销售入口，不等于独立性能验证。具体代工厂、完整 BOM、销量与用户留存，未披露的部分不作事实断言。</p><ol>${p.sources.map(s=>`<li><a href="${url(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><span>${s.kind==='official-store'?'官方商店':s.kind==='official-spec'?'官方产品 / 技术资料':'第三方资料'}</span><p>${esc(s.note || s.supports.join(' / '))}</p></li>`).join('')}</ol></section><div class="hw-detail-end"><a href="#hardware">← 返回产品目录</a><a href="#hardware/compare">查看产品对比（<span data-compare-count>${compared.size}</span>）→</a></div></article>`;
    const anchor=location.hash.split('/')[3];
    if(anchor?.startsWith('dimension-')) document.getElementById(`hw-${anchor}`)?.scrollIntoView({behavior:'instant'});
    if(['analysis','structure','sources','visuals','supply'].includes(anchor)) document.getElementById(`hw-${anchor}`)?.scrollIntoView({behavior:'instant'});
  }
  function renderCompare() {
    const selected=data.products.filter(p=>compared.has(p.id));
    document.title='产品对比 · Roman';
    const fields=[['消费购买方式',p=>saleLabels[p.saleMode]||'以官方渠道为准'],['产品状态',p=>`${statusLabels[p.status]} · ${p.statusEvidence}`],['参考价格',p=>`${p.price.text}；${p.price.note}`],['中国大陆',p=>p.china.note],['AI 能力',p=>p.ai.description],['联网与订阅依赖',p=>p.ai.dependency],['赛道判断',p=>`${nicheLabels[p.niche.level]}：${p.niche.reason}`],...dimensions.map(([key,label])=>[label,p=>p.analysis[key]])];
    main.innerHTML=`<div class="page hw-page">${intro('把差异放在一起看。','最多选择 3 款产品。比较相近场景下的取舍，价格保留原币种，不做跨币种数值排名。')}${tabs('compare')}${selected.length?`<p class="hw-compare-hint">${selected.length===1?'当前仅选择 1 款，可返回目录继续添加。':'横向对比包含销售证据、需求、技术与设计判断。'}<a href="#hardware">添加产品 ↗</a></p><div class="hw-comparison-scroll" tabindex="0" aria-label="可横向滚动的产品对比表"><table class="hw-comparison"><caption class="sr-only">AI 智能硬件产品对比</caption><thead><tr><th scope="col">比较维度</th>${selected.map(p=>`<th scope="col">${thumbnail(p,'hw-compare-thumbnail')}<span>${esc(categoryName(p.category))}</span><a href="#hardware/product/${p.id}">${esc(p.name)} ↗</a><button class="hw-text-button" data-hw-remove="${p.id}">移除</button></th>`).join('')}</tr></thead><tbody>${fields.map(([label,get])=>`<tr><th scope="row">${label}</th>${selected.map(p=>`<td>${esc(get(p))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'<div class="hw-empty"><h2>先挑选想比较的产品</h2><p>在市场目录中勾选产品右侧的对比框，最多可以放入 3 款。</p><a class="button-primary" href="#hardware">去产品目录 →</a></div>'}</div>`;
  }
  function renderMethodology() {
    document.title='研究方法与覆盖范围 · Roman';
    main.innerHTML=`<div class="page hw-page">${intro('知道什么，也记录不知道什么。','目录用于理解产品与市场，不以漂亮的数字代替证据。')}${tabs('methodology')}<div class="hw-methodology"><section><span class="eyebrow">01 / COVERAGE</span><h2>覆盖与收录口径</h2><p>${esc(data.scope)}</p><p>纳入个人、家庭或个人创作者可购买使用且具有明确 AI 功能的实体设备。个人验配型助听或辅助设备单列渠道；企业专用设备、纯开发板、纯App和普通定时自动化不计入消费目标。</p><p>${esc(data.methodology)}</p></section><section><span class="eyebrow">02 / STATUS</span><h2>销售状态如何判断</h2><dl><dt>在售</dt><dd>核查地区有官方订购入口或明确购买渠道；不保证所有型号、颜色和地区有库存。</dd><dt>预售 / 延期交付</dt><dd>商家接受订单，但标注预购、backorder 或延后发货；不是现货，交付承诺尚未经独立验证。</dd><dt>待复核</dt><dd>只有产品介绍、库存矛盾、缺货或缺少可核查的购买入口，不计入可购产品数。</dd><dt>付费预约</dt><dd>只获得未来下单机会的可退定金，不构成正式产品订单，也不计入可订购产品数。</dd><dt>硬件租赁 / 订阅</dt><dd>实体硬件随公开计划交付，必须说明归还、持续费用与服务条件，不把订阅价当作买断价。</dd><dt>停售</dt><dd>有停止销售或相关服务退出的公开证据，保留为市场观察样本。</dd></dl></section><section><span class="eyebrow">03 / COMPETITION</span><h2>如何回答“是否冷门”</h2><p>不虚构热度或成功概率评分。竞争密集：有成熟替代品与多个明确竞争者；新兴竞争：场景或形态仍在变化；细分专业：用户和任务较窄，通常有交付或技术门槛。</p><p>这些是定性分析，不是市场份额调查。“细分专业”可能意味着小市场、高获客成本或售后压力，不能直接等同于蓝海。</p></section><section><span class="eyebrow">04 / EVIDENCE</span><h2>事实、分析与待验证</h2><p>${esc(data.analysisNote)}</p><p>供应链分析拆分公开芯片、结构件、传感器、组装校准、认证和云服务成本。不以“常见方案”推定某款设备的真实供应商，不伪造拆机或精确 BOM 成本。</p><p>每款产品提供真实产品图、参考图及单独生成的AI爆炸示意。图库标明来源，AI图仅用于解释概念结构，不是实物拆机或制造图。需求验证建议后续补充任务访谈、替代方案比较、购买转化、退货原因与使用留存；目前没有这些一手数据。</p></section><section><span class="eyebrow">05 / GAPS</span><h2>尚未穷尽的范围</h2><div class="hw-gap-list">${data.coverageBacklog.map(b=>`<div><h3>${esc(b.category)}</h3><p>${esc(b.note)}</p></div>`).join('')}</div></section><section><span class="eyebrow">06 / REUSE</span><h2>开放阅读与后续更新</h2><p><a href="#supply-chain">供应链公司目录 ↗</a> · <a href="#hardware/scenes">按独立场景比较差异 ↗</a> · <a href="docs/hardware-discovery-log.md" target="_blank">发现线索与筛选记录 ↗</a></p><p>每款产品有稳定链接、核查日期和资料来源。网页、JSON 与 GitHub Markdown 阅读版使用同一份结构化研究内容。当前没有后台自动更新库存。</p><div class="hw-method-links"><a href="content/hardware/catalog.json" download>下载完整研究 JSON ↓</a><a href="https://github.com/RomanAgent/Roman/tree/main/content/hardware" target="_blank" rel="noopener noreferrer">查看研究源文件 ↗</a></div></section></div></div>`;
  }
  function renderInsights() {
    document.title='市场横向观察 · Roman';
    const inline = text => esc(text).replace(/\[([^\]]+)\]\(hardware\/([a-z0-9-]+)\.md\)/g,'<a href="#hardware/product/$2">$1 ↗</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace('&#91;返回项目首页&#93;(../README.md)','<a href="#home">返回项目首页</a>').replace('[返回项目首页](../README.md)','<a href="#home">返回项目首页</a>');
    const content=data.insightsMarkdown.split('\n').filter(line=>line.trim()&&!line.startsWith('# ')).map(line=>{
      if(line.startsWith('## ')) return `<h2>${inline(line.slice(3))}</h2>`;
      if(line.startsWith('### ')) return `<h3>${inline(line.slice(4))}</h3>`;
      if(line.startsWith('> ')) return `<blockquote>${inline(line.slice(2))}</blockquote>`;
      return `<p>${inline(line.replace(/^- /,'• '))}</p>`;
    }).join('');
    main.innerHTML=`<div class="page hw-page">${intro('从产品目录，回到市场问题。','一组跨产品的观察，以及需要继续用真实用户验证的判断。')}${tabs('insights')}<article class="hw-insights">${content}</article></div>`;
  }
  async function exportFiltered() {
    const selected=getFiltered().map(p=>p.id),filters={...state};
    const button=document.querySelector('[data-hw-action="export"]');if(button){button.disabled=true;button.textContent='正在准备完整研究…';}
    try{
      if(!fullCatalogLoading)fullCatalogLoading=fetch('content/hardware/catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('读取失败');return r.json();}).catch(e=>{fullCatalogLoading=null;throw e;});
      const full=await fullCatalogLoading,map=new Map(full.products.map(p=>[p.id,p]));const products=selected.map(id=>map.get(id));if(products.some(p=>!p))throw Error('目录版本已更新');
      const blob=new Blob([JSON.stringify({checkedAt:full.checkedAt,scope:full.scope,filters,products},null,2)],{type:'application/json;charset=utf-8'});
      const objectURL=URL.createObjectURL(blob),link=document.createElement('a');link.href=objectURL;link.download=`roman-ai-hardware-${full.checkedAt}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(objectURL),1000);
    }catch{const result=document.querySelector('#hw-results-count');if(result)result.textContent='完整研究暂时无法导出，请稍后重试或刷新目录。';}
    finally{if(button?.isConnected){button.disabled=false;button.textContent='导出筛选结果 ↓';}}
  }
  function reset() {Object.assign(state,{category:'all',status:'available',china:'all',niche:'all',ai:'all',search:'',sort:'category',page:1});renderMarket();}
  function toggleCompare(id,wanted) {
    if(wanted&&compared.size>=3&&!compared.has(id)) return false;
    if(wanted)compared.add(id);else compared.delete(id);
    return true;
  }
  main.addEventListener('input',event=>{if(event.target.id==='hw-scene-search'){const q=event.target.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-scene-text]').forEach(el=>{el.hidden=!el.dataset.sceneText.includes(q);if(!el.hidden)count++;});document.getElementById('hw-scene-empty').hidden=count>0;}if(event.target.id==='hw-search'){state.search=event.target.value;state.page=1;renderList();}});
  main.addEventListener('change',event=>{
    const target=event.target;
    if(target.dataset.hwFilter){state[target.dataset.hwFilter]=target.value;state.page=1;renderList();}
    if(target.dataset.hwPage){state.page=Number(target.value);renderList();document.querySelector('.hw-results').scrollIntoView({behavior:'instant',block:'start'});}
    if(target.dataset.hwCompare){if(!toggleCompare(target.dataset.hwCompare,target.checked)){target.checked=false;const notice=document.querySelector('#hw-compare-notice');if(notice)notice.textContent='最多比较 3 款，请先移除一款。';}else renderTray();}
  });
  main.addEventListener('click',event=>{
    const show=event.target.closest('[data-hw-open-image]');
    if(show)openImage(show.dataset.hwOpenImage,Number(show.dataset.imageIndex));
    const choose=event.target.closest('[data-hw-select-image]');
    if(choose)selectImage(choose.dataset.hwSelectImage,Number(choose.dataset.imageIndex));
    const category=event.target.closest('[data-hw-category]');
    if(category){state.category=category.dataset.hwCategory;state.page=1;renderList();}
    const action=event.target.closest('[data-hw-action]')?.dataset.hwAction;
    if(action==='reset')reset();
    if(action==='export')exportFiltered();
    if(action==='previous-page'||action==='next-page'){state.page+=action==='next-page'?1:-1;renderList();document.querySelector('.hw-results').scrollIntoView({behavior:'instant',block:'start'});}
    if(action==='clear-compare'){compared.clear();document.querySelectorAll('[data-hw-compare]').forEach(e=>e.checked=false);renderTray();}
    const remove=event.target.closest('[data-hw-remove]');
    if(remove){compared.delete(remove.dataset.hwRemove);renderCompare();}
    const toggle=event.target.closest('[data-hw-toggle-compare]');
    if(toggle){const id=toggle.dataset.hwToggleCompare;if(toggleCompare(id,!compared.has(id))){toggle.textContent=compared.has(id)?'从对比中移除':'加入产品对比';document.querySelectorAll('[data-compare-count]').forEach(e=>e.textContent=compared.size);}else{toggle.textContent='已选满 3 款 · 请到对比页移除';}}
  });
  async function render(section,id) {
    const version=++renderVersion;
    if(!data)main.innerHTML='<div class="page hw-empty" role="status">正在载入市场研究目录…</div>';
    try {
      await load();
      if(version!==renderVersion||!location.hash.startsWith('#hardware'))return;
      if(section==='product'){await Promise.all([loadProduct(id),window.SupplyChainApp.load()]);if(version!==renderVersion||!location.hash.startsWith('#hardware'))return;renderProduct(id);}
      else if(section==='compare'){await Promise.all([...compared].map(loadProduct));if(version!==renderVersion||!location.hash.startsWith('#hardware'))return;renderCompare();}
      else if(section==='methodology')renderMethodology();
      else if(section==='insights')renderInsights();
      else if(section==='scenes')renderScenes();
      else if(section==='status'){state.status=id in statusLabels?id:'available';state.category='all';state.search='';state.page=1;renderMarket();}
      else renderMarket();
    }catch{if(version===renderVersion&&location.hash.startsWith('#hardware'))main.innerHTML='<div class="page hw-empty"><h1>目录暂时无法加载</h1><p>请稍后刷新，或前往 GitHub 阅读。</p><a href="https://github.com/RomanAgent/Roman/blob/main/docs/hardware-market.md">打开 GitHub 阅读版 ↗</a></div>';}
  }
  return {render};
})();
