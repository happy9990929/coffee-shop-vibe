
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { AIAssistant } from './components/AIAssistant';
import { MENU_ITEMS } from './constants';
import { AppView, MenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderHome = () => (
    <div className="flex flex-col">
      <section className="relative h-[80vh] flex items-center px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop" 
            alt="Coffee Hero" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 text-white">
          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            The Future of <br />
            <span className="text-green-400 italic">Premium Brews</span>
          </h2>
          <p className="max-w-lg text-lg text-white/80 mb-8 leading-relaxed">
            Experience the perfect blend of tradition and technology. Our AI Barista learns your taste to suggest your next favorite cup.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentView(AppView.Menu)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              ORDER NOW
            </button>
            <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all">
              EXPLORE REWARDS
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-2 block">Our Specials</span>
            <h3 className="text-4xl font-serif starbucks-text-green">Seasonal Highlights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MENU_ITEMS.slice(0, 3).map(item => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <button 
                    onClick={() => addToCart(item)}
                    className="absolute bottom-4 right-4 bg-white text-slate-900 w-12 h-12 rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:bg-green-600 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <h4 className="text-xl font-serif starbucks-text-green mb-1">{item.name}</h4>
                <p className="text-slate-500 text-sm mb-2">{item.description}</p>
                <span className="font-bold text-slate-900">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderMenu = () => (
    <div className="py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif starbucks-text-green mb-2">Our Menu</h2>
            <p className="text-slate-500">Curated by our experts, enhanced by AI.</p>
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'starbucks-green text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-col h-full">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-600">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg starbucks-text-green font-bold">{item.name}</h3>
                  <span className="text-slate-400 text-xs font-medium">{item.calories} cal</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-slate-900">${item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 group/btn active:scale-95"
                  >
                    ADD
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="py-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif starbucks-text-green mb-8">Review Your Order</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <div className="text-slate-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-600 mb-4">Your cart is currently empty</h3>
            <button 
              onClick={() => setCurrentView(AppView.Menu)}
              className="starbucks-green text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              BROWSE MENU
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-6 p-4 border-b border-gray-100 group">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-serif text-lg starbucks-text-green font-bold">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-600 hover:text-green-600 font-bold px-1">−</button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-600 hover:text-green-600 font-bold px-1">+</button>
                      </div>
                      <span className="font-bold text-slate-900">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-3xl p-8 sticky top-32">
                <h3 className="text-xl font-serif starbucks-text-green mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (5%)</span>
                    <span>${(cartTotal * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-slate-900">
                    <span>Total</span>
                    <span>${(cartTotal * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Order placed! Thanks for visiting Aroma AI Café.")}
                  className="w-full bg-green-600 text-white py-4 rounded-full font-bold shadow-xl hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  PLACE ORDER
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout activeView={currentView} onViewChange={setCurrentView} cartCount={cartCount}>
      {currentView === AppView.Home && renderHome()}
      {currentView === AppView.Menu && renderMenu()}
      {currentView === AppView.Checkout && renderCheckout()}
      <AIAssistant />
    </Layout>
  );
};

export default App;
