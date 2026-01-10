import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
   
      <h2 className="text-4xl font-bold text-center text-sky-700 mb-8">
        About Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       
        <div>
          <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Welcome to <span className="font-bold text-sky-600">FiTz.</span>, 
            your go-to destination for the latest fashion trends. We believe that 
            fashion is not just about clothing — it's about confidence, self-expression, 
            and style.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our mission is to bring you high-quality dresses at affordable prices, 
            while keeping comfort and style in mind. Whether it’s casual wear, 
            party outfits, or elegant evening dresses, we have something for everyone.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a passion for fashion and customer satisfaction, 
            we are here to make your shopping experience simple, 
            enjoyable, and inspiring.
          </p>
        </div>

       
        <div className="flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2022/02/12/21/37/woman-7009979_1280.jpg"
            alt="Fashion Store"
            className="rounded-lg shadow-lg object-cover w-full h-80"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
