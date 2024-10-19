import React from "react";

const CourseCard = ({ image, title, price, originalPrice, rating, reviews, badge }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center mt-2">
          <span className="text-red-500 text-lg font-bold">${price}</span>
          <span className="text-gray-500 line-through text-sm ml-2">${originalPrice}</span>
        </div>
        <div className="flex items-center mt-2 text-yellow-500">
          <span>⭐ {rating}</span>
          <span className="ml-1 text-gray-600">({reviews} reviews)</span>
        </div>
        <div className={`mt-3 inline-block text-sm px-2 py-1 rounded-full ${badge === 'Bestseller' ? 'bg-yellow-300 text-yellow-900' : 'bg-purple-600 text-white'}`}>
          {badge}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      image: "https://www.youtube.com/watch?v=Rm05T9HRFJM&pp=ygUScG9zdHBhcnR1bSB3b3Jrb3V0",
      title: "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More",
      price: 15.99,
      originalPrice: 89.99,
      rating: 4.5,
      reviews: 39635,
      badge: "Bestseller"
    },
    {
      image: "https://link-to-image2.com",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      price: 19.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 1652,
      badge: "Premium"
    },
    {
      image: "https://link-to-image3.com",
      title: "ChatGPT & Midjourney & Gemini: Digital Marketing Assistants",
      price: 22.99,
      originalPrice: 84.99,
      rating: 4.3,
      reviews: 401,
      badge: "Premium"
    },
    {
      image: "https://link-to-image4.com",
      title: "ChatGPT Master: Complete OpenAI ChatGPT Course",
      price: 13.99,
      originalPrice: 39.99,
      rating: 4.4,
      reviews: 400,
      badge: "Premium"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            price={course.price}
            originalPrice={course.originalPrice}
            rating={course.rating}
            reviews={course.reviews}
            badge={course.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
