import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
function FashionCarousel() {
  const Navigate=useNavigate()
  const slides = [
    {
      image:
        "https://cdn.pixabay.com/photo/2016/07/22/10/07/best-friends-1534506_1280.jpg",
      title: "New Arrivals",
      subtitle: "Trendy fashion outfits just for you",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2019/03/05/05/45/man-4035612_1280.jpg",
      title: "Flat 50% Off",
      subtitle: "Grab the best deals before they’re gone",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Everyday Glamour",
      subtitle: "From casual to classy — we’ve got it all.",
    },
    {
      image:
        "https://www.hollywoodreporter.com/wp-content/uploads/2025/08/American-Eagle.jpg?crop=0px%2C30px%2C1918px%2C1074px&resize=2000%2C1126",
      title: "Unwrap Your Confidence",
      subtitle: "Feel bold, beautiful, and unstoppable.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true, 
    speed: 1500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="mb-10 relative">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="relative">
          
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-64 sm:h-80 md:h-[450px] lg:h-[480px] object-cover rounded-lg"
            />

           
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg" />

           
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 text-white">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-lg md:text-xl font-medium mb-5 drop-shadow-lg">
                {slide.subtitle}
              </p>
              <button className="px-5 py-2 bg-sky-600 hover:bg-sky-700 rounded-full font-semibold transition"
                  onClick={() => {
                         const section = document.getElementById("products");
                         if (section) {
                              section.scrollIntoView({ behavior: "smooth" });
                              }
                         Navigate('/#products')
                        }}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FashionCarousel;
