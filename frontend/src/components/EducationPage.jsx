import React from "react";
import { FaArrowRight } from "react-icons/fa";
import courseImage1 from '../assets/video1.jpg'; 
import courseImage2 from '../assets/video2.jpg';
import courseImage3 from '../assets/video3.jpg';
import courseImage4 from '../assets/video4.jpeg';

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
      image: courseImage1,
      title: "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More",
      price: 15.99,
      originalPrice: 89.99,
      rating: 4.5,
      reviews: 39635,
      badge: "Bestseller"
    },
    {
      image: courseImage2,
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      price: 19.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 1652,
      badge: "Premium"
    },
    {
      image: courseImage3,
      title: "ChatGPT & Midjourney & Gemini: Digital Marketing Assistants",
      price: 22.99,
      originalPrice: 84.99,
      rating: 4.3,
      reviews: 401,
      badge: "Premium"
    },
    {
      image: courseImage4,
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
      <h1 className="text-3xl font-bold mb-8">All the skills you need in one place</h1>
      <p className="text-gray-600 mb-4 text-center">From critical skills to technical topics, find everything you need to develop professionally.</p>
      
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">ChatGPT</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">Data Science</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">Python</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">Machine Learning</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">Deep Learning</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">AI</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">Statistics</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">NLP</button>
        <FaArrowRight className="text-gray-500 self-center ml-2" />
      </div>

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
