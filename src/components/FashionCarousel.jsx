// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";
// function FashionCarousel() {
//   const Navigate=useNavigate()
//   const slides = [
//     {
//       image:
//         "https://cdn.pixabay.com/photo/2016/07/22/10/07/best-friends-1534506_1280.jpg",
//       title: "New Arrivals",
//       subtitle: "Trendy fashion outfits just for you",
//     },
//     {
//       image:
//         "https://cdn.pixabay.com/photo/2019/03/05/05/45/man-4035612_1280.jpg",
//       title: "Flat 50% Off",
//       subtitle: "Grab the best deals before they’re gone",
//     },
//     {
//       image:
//         "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
//       title: "Everyday Glamour",
//       subtitle: "From casual to classy — we’ve got it all.",
//     },
//     {
//       image:
//         "https://www.hollywoodreporter.com/wp-content/uploads/2025/08/American-Eagle.jpg?crop=0px%2C30px%2C1918px%2C1074px&resize=2000%2C1126",
//       title: "Unwrap Your Confidence",
//       subtitle: "Feel bold, beautiful, and unstoppable.",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     fade: true, 
//     speed: 1500,
//     autoplaySpeed: 4000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };

//   return (
//     <div className="mb-10 relative">
//       <Slider {...settings}>
//         {slides.map((slide, i) => (
//           <div key={i} className="relative">
          
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-64 sm:h-80 md:h-[450px] lg:h-[480px] object-cover rounded-lg"
//             />

           
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg" />

           
//             <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 text-white">
//               <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
//                 {slide.title}
//               </h2>
//               <p className="text-sm sm:text-lg md:text-xl font-medium mb-5 drop-shadow-lg">
//                 {slide.subtitle}
//               </p>
//               <button className="px-5 py-2 bg-sky-600 hover:bg-sky-700 rounded-full font-semibold transition"
//                   onClick={() => {
//                          const section = document.getElementById("products");
//                          if (section) {
//                               section.scrollIntoView({ behavior: "smooth" });
//                               }
//                          Navigate('/#products')
//                         }}>
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

// export default FashionCarousel;





import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Added for professional button look

function FashionCarousel() {
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://cdn.pixabay.com/photo/2016/07/22/10/07/best-friends-1534506_1280.jpg",
      title: "New Arrivals",
      highlight: "Spring 2026",
      subtitle: "Discover the latest trends in urban fashion.",
    },
    {
      image: "https://cdn.pixabay.com/photo/2019/03/05/05/45/man-4035612_1280.jpg",
      title: "Seasonal Sale",
      highlight: "Flat 50% Off",
      subtitle: "Premium styles at prices you can't resist.",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Everyday Glamour",
      highlight: "Street Style",
      subtitle: "From casual to classy — we’ve got it all.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 1500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div style={{ bottom: "25px" }}>
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
  };

  const handleShopNow = () => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    navigate('/#products');
  };

  return (
    <div className="relative overflow-hidden group">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="outline-none">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-[5000ms] group-hover:scale-100"
              />

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

              {/* Content Box */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-20 lg:px-32 text-white">
                <span className="bg-sky-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded mb-4 animate-fadeIn">
                  {slide.highlight}
                </span>
                
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-tighter leading-none animate-slideUp">
                  {slide.title.split(' ').map((word, idx) => (
                    <span key={idx} className={idx === 1 ? "text-sky-400" : ""}>{word} </span>
                  ))}
                </h2>

                <p className="max-w-md text-sm sm:text-lg font-medium text-slate-200 mb-8 opacity-90 animate-slideUpDelay">
                  {slide.subtitle}
                </p>

                <button 
                  onClick={handleShopNow}
                  className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sky-600 hover:text-white transition-all shadow-xl active:scale-95"
                >
                  SHOP COLLECTION
                  <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Adding custom styles for Dots - Put this in your App.css or a <style> tag */}
      <style>{`
        .custom-dots li {
          margin: 0 4px;
        }
        .custom-dots li button:before {
          content: '';
          width: 12px;
          height: 3px;
          background: white;
          opacity: 0.3;
          border-radius: 10px;
          transition: all 0.3s;
        }
        .custom-dots li.slick-active button:before {
          width: 30px;
          opacity: 1;
          background: #0ea5e9;
        }
      `}</style>
    </div>
  );
}

export default FashionCarousel;