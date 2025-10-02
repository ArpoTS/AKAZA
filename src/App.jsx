import React, { useMemo, useState } from "react";
const defaultConfig = { storeName:"Arpo Apparel", tagline:"Fresh fits. Friendly prices.", currency:"฿",
  theme:{ bg:"bg-white", text:"text-gray-900", card:"bg-white", surface:"bg-gray-50", primary:"bg-gray-900", primaryText:"text-white", ring:"ring-gray-200"},
  categories:["All","T-Shirts","Hoodies","Pants","Accessories"],
  products:[
    {id:"tee-1",name:"Classic Tee",description:"100% cotton, relaxed fit.",category:"T-Shirts",price:299,rating:4.6,colors:["Black","White","Sand"],sizes:["S","M","L","XL"],image:"https://images.unsplash.com/photo-1520975964733-7482a06d8093?q=80&w=1600&auto=format&fit=crop"},
    {id:"hood-1",name:"Everyday Hoodie",description:"Mid-weight fleece, kangaroo pocket.",category:"Hoodies",price:799,rating:4.8,colors:["Charcoal","Oat","Forest"],sizes:["S","M","L","XL"],image:"https://images.unsplash.com/photo-1544441892-6d8de03db0f1?q=80&w=1600&auto=format&fit=crop"},
    {id:"pant-1",name:"Tapered Chinos",description:"Stretch twill, tapered leg.",category:"Pants",price:999,rating:4.5,colors:["Khaki","Navy","Black"],sizes:["28","30","32","34","36"],image:"https://images.unsplash.com/photo-1617125721313-17311b7b5d88?q=80&w=1600&auto=format&fit=crop"},
    {id:"cap-1",name:"Dad Cap",description:"Adjustable strap, low profile.",category:"Accessories",price:249,rating:4.4,colors:["Olive","Black","Stone"],sizes:["OS"],image:"https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop"},
  ]};
export default function ClothingStore(){ const [config,setConfig]=useState(defaultConfig); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All"); const [cart,setCart]=useState([]); const [editMode,setEditMode]=useState(false); const [colorFilter,setColorFilter]=useState("All"); const [sortKey,setSortKey]=useState("featured");
  const filtered = useMemo(()=>{ let items=[...config.products]; if(category!=="All") items=items.filter(p=>p.category===category); if(colorFilter!=="All") items=items.filter(p=>p.colors?.includes(colorFilter)); if(query.trim()){ const q=query.toLowerCase(); items=items.filter(p=>p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)); } switch(sortKey){case "price-asc": items.sort((a,b)=>a.price-b.price); break; case "price-desc": items.sort((a,b)=>b.price-a.price); break; case "rating": items.sort((a,b)=>b.rating-a.rating); break; default: break;} return items; },[config.products,category,colorFilter,query,sortKey]);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  function addToCart(p,v={}){ const key=`${p.id}-${v.color||""}-${v.size||""}`; setCart(prev=>{ const idx=prev.findIndex(i=>i.key===key); if(idx>=0){const c=[...prev]; c[idx]={...c[idx],qty:c[idx].qty+1}; return c;} return [...prev,{key,id:p.id,name:p.name,price:p.price,qty:1,color:v.color||null,size:v.size||null,image:p.image}]});}
  function updateQty(key,qty){ setCart(prev=>prev.map(i=>i.key===key?{...i,qty:Math.max(1,qty)}:i).filter(i=>i.qty>0));}
  function removeItem(key){ setCart(prev=>prev.filter(i=>i.key!==key));}
  function handleConfigSave(text){ try{ const next=JSON.parse(text); if(!next.products||!Array.isArray(next.products)) throw new Error("'products' must be an array"); setConfig(next); alert("Updated! Your store refreshed."); }catch(e){ alert("JSON error: "+e.message);}}
  const theme=config.theme;
  return (<div className={`min-h-screen ${theme.bg} ${theme.text}`}>
    <header className="sticky top-0 z-40 border-b border-gray-200/60 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-3">
        <div className="flex-1"><h1 className="text-2xl font-bold tracking-tight">{config.storeName}</h1><p className="text-sm text-gray-500">{config.tagline}</p></div>
        <div className="hidden md:flex items-center gap-2">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="w-64 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"/>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">{config.categories.map(c=><option key={c}>{c}</option>)}</select>
          <select value={colorFilter} onChange={e=>setColorFilter(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">{["All",...new Set(config.products.flatMap(p=>p.colors||[]))].map(c=><option key={c}>{c}</option>)}</select>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option></select>
        </div>
        <details className="relative">
          <summary className="list-none select-none cursor-pointer rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50 flex items-center gap-2"><span>🛒</span><span className="text-sm">Cart ({cart.reduce((s,i)=>s+i.qty,0)})</span></summary>
          <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-200 shadow-xl p-3 bg-white text-gray-900">
            {cart.length===0? <p className="text-sm text-gray-500">Your cart is empty.</p> : <div className="space-y-3">
              {cart.map(item=><div key={item.key} className="flex gap-3"><img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg"/><div className="flex-1"><div className="text-sm font-medium">{item.name}</div><div className="text-xs text-gray-500">{item.color?`Color: ${item.color}`:null} {item.size?`· Size: ${item.size}`:null}</div><div className="flex items-center gap-2 mt-1"><input type="number" min={1} value={item.qty} onChange={e=>updateQty(item.key,parseInt(e.target.value||"1"))} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-sm"/><button onClick={()=>removeItem(item.key)} className="text-xs text-red-600 hover:underline">Remove</button></div></div><div className="text-sm font-semibold whitespace-nowrap">{config.currency}{(item.price*item.qty).toLocaleString()}</div></div>)}
              <div className="border-t pt-2 flex justify-between text-sm font-semibold"><span>Total</span><span>{config.currency}{total.toLocaleString()}</span></div>
              <button className="w-full rounded-xl py-2 text-sm font-semibold bg-gray-900 text-white hover:opacity-90">Checkout</button>
            </div>}
          </div>
        </details>
        <button onClick={()=>setEditMode(v=>!v)} className="ml-2 rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm" title="Edit store data (JSON)">{editMode?"Close Editor":"Edit Mode"}</button>
      </div>
    </header>
    {editMode && <section className="mx-auto max-w-7xl p-4"><div className="grid md:grid-cols-2 gap-4">
      <textarea id="configEditor" defaultValue={JSON.stringify(config,null,2)} className="h-96 w-full rounded-2xl border border-gray-300 p-3 font-mono text-xs"/>
      <div className="space-y-3"><h2 className="text-lg font-semibold">How to edit</h2><ol className="text-sm text-gray-600 list-disc pl-5 space-y-1"><li>Change <code>storeName</code>, <code>tagline</code>, <code>currency</code>, colors in <code>theme</code>.</li><li>Add/remove items in <code>products</code>. Each needs <code>id</code>, <code>name</code>, <code>category</code>, <code>price</code>, <code>image</code>.</li><li>Click <b>Save & Refresh</b> to apply.</li></ol><button onClick={()=>{const el=document.getElementById("configEditor"); handleConfigSave(el.value);}} className="rounded-xl px-4 py-2 bg-gray-900 text-white text-sm">Save & Refresh</button><p className="text-xs text-gray-500">Tip: Use Unsplash links for images.</p></div>
    </div></section>}
    <div className="md:hidden px-4 py-3 flex gap-2 sticky top-[66px] z-30 bg-white/90 border-b">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"/>
      <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm">{config.categories.map(c=><option key={c}>{c}</option>)}</select>
    </div>
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold">Products</h2><div className="hidden md:flex items-center gap-2 text-sm"><span className="text-gray-500">Sort:</span><select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option></select></div></div>
      {filtered.length===0? <div className="text-gray-500 text-sm">No products match your filters.</div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{filtered.map(p=><ProductCard key={p.id} product={p} currency={config.currency} onAdd={addToCart}/>)}</div>}
    </main>
    <footer className="border-t border-gray-200/80"><div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3"><p>© {new Date().getFullYear()} {config.storeName}. Built with ❤️ by you.</p><div className="flex items-center gap-3"><a className="hover:underline" href="#">Refund policy</a><a className="hover:underline" href="#">Shipping</a><a className="hover:underline" href="#">Contact</a></div></div></footer>
  </div>);}
function ProductCard({product,currency,onAdd}){ const [selColor,setSelColor]=useState(product.colors?.[0]??null); const [selSize,setSelSize]=useState(product.sizes?.[0]??null);
  return (<div className="group rounded-2xl border border-gray-200 overflow-hidden bg-white flex flex-col">
    <div className="relative aspect-[4/5] overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"/><div className="absolute left-2 top-2 text-xs rounded-full bg-white/90 px-2 py-1 border border-gray-200">⭐ {product.rating}</div></div>
    <div className="p-3 flex-1 flex flex-col"><div className="text-xs text-gray-500">{product.category}</div><h3 className="font-medium">{product.name}</h3><p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
      <div className="space-y-2 mb-3">
        {product.colors?.length>0 && <div className="flex flex-wrap items-center gap-2"><span className="text-xs text-gray-500">Color:</span>{product.colors.map(c=><button key={c} onClick={()=>setSelColor(c)} className={`text-xs rounded-full border px-3 py-1 ${selColor===c?"bg-gray-900 text-white border-gray-900":"border-gray-300"}`}>{c}</button>)}</div>}
        {product.sizes?.length>0 && <div className="flex flex-wrap items-center gap-2"><span className="text-xs text-gray-500">Size:</span>{product.sizes.map(s=><button key={s} onClick={()=>setSelSize(s)} className={`text-xs rounded-full border px-3 py-1 ${selSize===s?"bg-gray-900 text-white border-gray-900":"border-gray-300"}`}>{s}</button>)}</div>}
      </div>
      <div className="mt-auto flex items-center justify-between"><div className="font-semibold">{currency}{product.price.toLocaleString()}</div><button onClick={()=>onAdd(product,{color:selColor,size:selSize})} className="rounded-xl px-3 py-2 text-sm font-medium bg-gray-900 text-white hover:opacity-90">Add to cart</button></div>
    </div></div>);}
