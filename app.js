const products=[
 {id:1,name:'Menzio Classic Boxer',price:1800,desc:'بوكسر كلاسيكي للراحة اليومية',symbol:'M'},
 {id:2,name:'Menzio Essential Brief',price:1600,desc:'تصميم بسيط وخفيف للاستخدام اليومي',symbol:'E'},
 {id:3,name:'Menzio Premium Boxer',price:2400,desc:'خيار مميز بإحساس أكثر فخامة',symbol:'P'}
];
let cart=[];
const money=n=>new Intl.NumberFormat('fr-DZ').format(n)+' دج';
function renderProducts(){document.getElementById('productGrid').innerHTML=products.map(p=>`<article class="product"><div class="product-image">${p.symbol}</div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-row"><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">أضف للسلة</button></div></div></article>`).join('')}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...products.find(x=>x.id===id),qty:1});renderCart();openCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);renderCart()}
function renderCart(){const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);document.getElementById('cartCount').textContent=count;document.getElementById('cartTotal').textContent=money(total);const box=document.getElementById('cartItems');box.innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><h4>${x.name}</h4><small>${x.qty} × ${money(x.price)}</small></div><button class="remove" onclick="removeFromCart(${x.id})">حذف</button></div>`).join(''):'<p class="empty">السلة فارغة حاليًا.</p>'}
function openCart(){document.getElementById('cartPanel').classList.add('open');document.getElementById('cartPanel').setAttribute('aria-hidden','false');document.getElementById('overlay').classList.add('show')}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('cartPanel').setAttribute('aria-hidden','true');document.getElementById('overlay').classList.remove('show')}
document.getElementById('cartButton').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('overlay').onclick=closeCart;document.getElementById('checkoutButton').onclick=()=>alert(cart.length?'سيتم ربط نموذج الطلب والدفع والتوصيل في الخطوة التالية.':'أضف منتجًا إلى السلة أولًا.');
renderProducts();renderCart();
