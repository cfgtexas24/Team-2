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

        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const courses = [
    {
      image: courseImage1,
      title: "Workouts for Pregnant Women"
    },
    {
      image: courseImage2,
      title: "The Complete Nutrition Guide for Pregnant Women"
    },
    {
      image: courseImage3,
      title: "Nutrition and its impact on Babies"
    },
    {
      image: courseImage4,
      title: "How to take care of yourself, Postpartum"
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

export default Education;
