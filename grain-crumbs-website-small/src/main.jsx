import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { Phone, Mail, ShoppingBag, Leaf, Wheat, Heart, ShieldCheck, Minus, Plus, Trash2, Menu as MenuIcon, X } from "lucide-react";
import './styles.css';
import logo from './assets/logo.webp';
import orderPoster from './assets/order-poster.webp';
import brownieMenu from './assets/brownie-menu.webp';

const phone = '918208257574';
const products = [
  {id:1, name:'Mixed Berry Jam Brownie', price:109, img:brownieMenu, desc:'Millet brownie with berry jam topping.'},
  {id:2, name:'Coconut Bounty Brownie', price:119, img:brownieMenu, desc:'Rich chocolate brownie with coconut.'},
  {id:3, name:'Chocolate Walnut Brownie', price:129, img:brownieMenu, desc:'Couverture chocolate and crunchy walnut.'},
  {id:4, name:'Cappuccino Walnut Brownie', price:129, img:brownieMenu, desc:'Coffee-kissed brownie with walnut.'},
  {id:5, name:'Cream Cheese Filling Brownie', price:149, img:brownieMenu, desc:'Fudgy brownie with creamy filling.'},
  {id:6, name:'Hazelnut Spread Filling Brownie', price:159, img:brownieMenu, desc:'Premium hazelnut-filled brownie.'},
];

function App(){
 const [cart,setCart]=useState({}); const [open,setOpen]=useState(false);
 const cartItems = useMemo(()=>Object.entries(cart).map(([id,qty])=>({...products.find(p=>p.id===+id), qty})),[cart]);
 const total = cartItems.reduce((s,i)=>s+i.price*i.qty,0);
 const add=(id)=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
 const dec=(id)=>setCart(c=>{const n={...c}; if((n[id]||0)<=1) delete n[id]; else n[id]--; return n});
 const order=()=>{ const text = cartItems.length ? `Hi Grain Crumbs, I want to order:%0A${cartItems.map(i=>`${i.qty} x ${i.name} - ₹${i.price*i.qty}`).join('%0A')}%0ATotal: ₹${total}` : 'Hi Grain Crumbs, I want to place an order.'; window.open(`https://wa.me/${phone}?text=${text}`,'_blank')}
 return <>
  <nav><img src={logo}/><div className="links"><a href="#menu">Menu</a><a href="#why">Why Us</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div><button onClick={()=>setOpen(true)}><ShoppingBag/> Cart {cartItems.length}</button><button className="hamb"><MenuIcon/></button></nav>
  <section className="hero">
   <div className="heroText"><motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="eyebrow">Millet-based • Jaggery sweetened • Freshly baked</motion.p><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1}}>Handcrafted brownies, sponge cakes & cupcakes baked with real ingredients.</motion.h1><p>Grain Crumbs brings beautiful bakery treats with millet flour, no maida, no refined sugar and no preservatives — perfect for mindful gifting, celebrations and everyday cravings.</p><div className="cta"><a href="#menu">View Menu</a><button onClick={order}>Order on WhatsApp</button></div></div>
   <div className="mixWrap"><motion.div className="bowl" initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}}><div className="cream"></div><motion.div className="whisk" animate={{rotate:[-25,25,-25],x:[-8,8,-8]}} transition={{repeat:Infinity,duration:1.6}}>⌇</motion.div></motion.div><motion.img src={logo} className="heroLogo" animate={{y:[0,-12,0]}} transition={{repeat:Infinity,duration:4}}/></div>
  </section>
  <section className="badges" id="why">{[['Millet Flour Only',Wheat],['Jaggery Sweetened',Heart],['Low GI Spike',ShieldCheck],['Vegan & Veg Options',Leaf],['No Maida',Wheat],['No Refined Sugar',ShieldCheck],['No Preservatives',Leaf]].map(([t,Icon])=><motion.div whileHover={{y:-8}} className="badge" key={t}><Icon/><span>{t}</span></motion.div>)}</section>
  <section className="menuSec" id="menu"><p className="eyebrow">Millet-Based Brownies</p><h2>Brownie Menu</h2><div className="grid">{products.map(p=><motion.div className="card" whileHover={{y:-8}} key={p.id}><div className="prodImg" style={{backgroundImage:`url(${p.img})`}}></div><h3>{p.name}</h3><p>{p.desc}</p><div className="price">₹{p.price}</div><button onClick={()=>add(p.id)}>Add to Cart</button></motion.div>)}</div></section>
  <section className="split" id="gallery"><img src={orderPoster}/><div><p className="eyebrow">Signature Brand Promise</p><h2>Made with real ingredients. Baked with love.</h2><p>Use this website to show the menu, build trust, highlight healthy bakery features, collect orders and redirect customers directly to WhatsApp for final confirmation.</p><button onClick={order}>Start Order</button></div></section>
 <section className="contact" id="contact">
  <img src={logo} />
  <h2>Order Fresh Bakes Today</h2>
  <p>Brownies • Sponge Cakes • Cupcakes</p>

  <div className="contactGrid">
    <a href="tel:+918208257574">
      <Phone /> +91 8208257574
    </a>

    <a href="mailto:thegraincrumbs@gmail.com">
      <Mail /> thegraincrumbs@gmail.com
    </a>

    <a href="https://instagram.com/graincrumbs" target="_blank">
      <span>📸</span> @graincrumbs
    </a>

    <a href="#">
      <span>f</span> Grain Crumbs
    </a>
  </div>
</section>
  {open&&<div className="drawer"><div className="cart"><button className="close" onClick={()=>setOpen(false)}><X/></button><h2>Your Order</h2>{cartItems.length===0?<p>Your cart is empty.</p>:cartItems.map(i=><div className="cartItem" key={i.id}><b>{i.name}</b><span>₹{i.price*i.qty}</span><div><button onClick={()=>dec(i.id)}><Minus/></button>{i.qty}<button onClick={()=>add(i.id)}><Plus/></button><button onClick={()=>dec(i.id)}><Trash2/></button></div></div>)}<h3>Total: ₹{total}</h3><button className="checkout" onClick={order}>Checkout on WhatsApp</button></div></div>}
  <footer>© Grain Crumbs. Premium millet bakery website concept.</footer>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
