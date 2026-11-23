const products = [
  {id:1,name:'Special Kacheriyu',description:'Premium traditional kacheriyu topped with rich dry fruits.',price:600,tag:'Special',emoji:'🥜',color:'#efe0c7',image:'assets/special-kacheriyu.jpg'},
  {id:2,name:'Kacheriyu',description:'Classic Gujarati kacheriyu, a taste of tradition.',price:340,tag:'Traditional',emoji:'🌰',color:'#ead8bd',image:'assets/kacheriyu.jpg'},
  {id:3,name:'Mava Chikki',description:'A sweet, rich chikki for your little cravings.',price:140,tag:'Customer favourite',emoji:'🍯',color:'#f1dfc0',image:'assets/mava-chikki.jpg'},
  {id:4,name:'Sing Chikki',description:'Crunchy peanut chikki with a lovely caramel sweetness.',price:140,tag:'Crunchy delight',emoji:'🥜',color:'#ead2a7',image:'assets/sing-chikki.jpg'},
  {id:5,name:'Tal Chikki',description:'Nutty sesame seeds and sweetness in every crisp bite.',price:140,tag:'Classic',emoji:'🌾',color:'#e9d9c0',image:'assets/tal-chikki.jpg'},
  {id:6,name:'Tal nu Tel',description:'Traditional sesame oil with a rich, authentic flavour.',price:580,tag:'Traditional oil',emoji:'🫙',color:'#e5d9b9',image:'assets/tal-nu-tel.jpg'}
];

const WHATSAPP_NUMBER = '919924516688';

const cart = {};

const productGrid = document.getElementById('productGrid');

const money = n => '₹' + n.toLocaleString('en-IN');

productGrid.innerHTML = products.map(p=>`<article class="product-card"><div class="product-visual" style="background:${p.color}"><span class="product-tag">${p.tag}</span>${p.image?`<img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy">`:`<span class="product-art">${p.emoji}</span>`}</div><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${p.price===null?'Price on request':money(p.price)+' <small style="font-size:10px;font-weight:400;color:#918575">/ pack</small>'}</span><button class="add-button" onclick="addToCart(${p.id})">${p.price===null?'Ask price':'Add +'}</button></div></div></article>`).join('');

function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();openCart();}

function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}

function renderCart(){const rows=Object.entries(cart);document.getElementById('cartCount').textContent=rows.reduce((a,[,q])=>a+q,0);const box=document.getElementById('cartItems');if(!rows.length){box.innerHTML='<div class="empty-cart">Your bag is waiting for a treat ✦</div>';document.getElementById('cartTotal').textContent=money(0);return;}box.innerHTML=rows.map(([id,q])=>{const p=products.find(x=>x.id==id);return `<div class="cart-row"><div><h4>${p.name}</h4><small>${p.price===null?'Price on request':money(p.price)+' each · '+money(p.price*q)}</small></div><div class="quantity"><button onclick="changeQty(${id},-1)">−</button><span>${q}</span><button onclick="changeQty(${id},1)">+</button></div></div>`}).join('');const total=rows.reduce((sum,[id,q])=>{const p=products.find(x=>x.id==id);return sum+(p.price===null?0:p.price*q)},0);const hasUnpriced=rows.some(([id])=>products.find(p=>p.id==id).price===null);document.getElementById('cartTotal').textContent=money(total)+(hasUnpriced?' + price on request':'');}

function openCart(){document.body.classList.add('cart-open')}function closeCart(){document.body.classList.remove('cart-open')}

document.getElementById('cartToggle').addEventListener('click',openCart);document.getElementById('cartClose').addEventListener('click',closeCart);document.getElementById('cartOverlay').addEventListener('click',closeCart);document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('nav-open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('nav-open')));

document.getElementById('checkout').addEventListener('click',()=>{const rows=Object.entries(cart);if(!rows.length){alert('Your bag is empty. Add a treat first!');return;}const lines=rows.map(([id,q])=>{const p=products.find(x=>x.id==id);return `${p.name} x ${q} = ${p.price===null?'Price on request':money(p.price*q)}`});const total=rows.reduce((sum,[id,q])=>{const p=products.find(x=>x.id==id);return sum+(p.price===null?0:p.price*q)},0);const hasUnpriced=rows.some(([id])=>products.find(p=>p.id==id).price===null);const msg=`Hello MSD Store! I'd like to order:\n${lines.join('\n')}\nTotal: ${money(total)}${hasUnpriced?' + price on request':''}\nPlease confirm availability and delivery details.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');});

document.getElementById('year').textContent=new Date().getFullYear();renderCart();
