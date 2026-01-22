// import React from "react";

// function About() {
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
   
//       <h2 className="text-4xl font-bold text-center text-sky-700 mb-8">
//         About Us
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       
//         <div>
//           <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
//           <p className="text-gray-700 mb-4 leading-relaxed">
//             Welcome to <span className="font-bold text-sky-600">FiTz.</span>, 
//             your go-to destination for the latest fashion trends. We believe that 
//             fashion is not just about clothing — it's about confidence, self-expression, 
//             and style.
//           </p>
//           <p className="text-gray-700 mb-4 leading-relaxed">
//             Our mission is to bring you high-quality dresses at affordable prices, 
//             while keeping comfort and style in mind. Whether it’s casual wear, 
//             party outfits, or elegant evening dresses, we have something for everyone.
//           </p>
//           <p className="text-gray-700 leading-relaxed">
//             With a passion for fashion and customer satisfaction, 
//             we are here to make your shopping experience simple, 
//             enjoyable, and inspiring.
//           </p>
//         </div>

       
//         <div className="flex justify-center">
//           <img
//             src="https://cdn.pixabay.com/photo/2022/02/12/21/37/woman-7009979_1280.jpg"
//             alt="Fashion Store"
//             className="rounded-lg shadow-lg object-cover w-full h-80"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;





import React from "react";
import { FaAward, FaUsers, FaLeaf, FaGlobe } from "react-icons/fa";
import { createContext, useEffect, useState } from "react";

function About() {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="bg-white min-h-screen">
      {/* --- Hero Section --- */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.4em]">
              Established 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic">
              The <span className="text-sky-600">FiTz.</span> Story
            </h1>
            <p className="max-w-xl text-slate-400 text-sm font-medium leading-relaxed">
              Redefining the modern wardrobe through precision tailoring, sustainable sourcing, and a commitment to timeless aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image Side with Decorative Element */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky-50 rounded-full z-0"></div>
            <div className="relative z-10 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://cdn.pixabay.com/photo/2022/02/12/21/37/woman-7009979_1280.jpg"
                alt="FiTz. Fashion Philosophy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 hidden md:block">
              <p className="text-3xl font-black text-sky-600">100%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Quality</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                Our Vision for <span className="text-sky-600 italic">Self-Expression</span>
              </h2>
              <div className="w-20 h-1 bg-sky-600 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                "We believe that fashion is not just about clothing — it's about the silent confidence you carry into every room."
              </p>
              <p className="text-slate-500 text-sm leading-loose">
                At <span className="font-black text-slate-900">FiTz.</span>, our mission is to bring you high-quality silhouettes at affordable prices, without compromising on the ethics of comfort and style. Whether it’s high-performance casual wear or elegant evening attire, every stitch is designed with your journey in mind.
              </p>
            </div>

            {/* Icon Grid for Trust */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><FaLeaf size={20}/></div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs uppercase">Eco-Conscious</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Sustainable fabric choices.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 text-rose-500 rounded-xl"><FaAward size={20}/></div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs uppercase">Curated Style</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Hand-picked seasonal trends.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Stats / Bar Section --- */}
      <section className="bg-slate-900 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-black text-white italic tracking-tighter">50K+</p>
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Global Clients</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-white italic tracking-tighter">12</p>
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Award Nominations</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-white italic tracking-tighter">100%</p>
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Secure Payments</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-white italic tracking-tighter">24/7</p>
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Client Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
