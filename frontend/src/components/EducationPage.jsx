import React from "react";
import { FaArrowRight } from "react-icons/fa";
import courseImage1 from '../assets/video1.jpg'; 
import courseImage2 from '../assets/video2.jpg';
import courseImage3 from '../assets/video3.jpg';
import courseImage4 from '../assets/video4.jpeg';

// Course card components to display course details
const CourseCard = ({ image, title, videoUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-200 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-40 object-cover"
          />
        </div>
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
  );
};

// Education component to display all the courses
const Education = () => {

  // Array of courses with image, title and video URL
  const courses = [
    {
      image: courseImage1,
      title: "Workouts for Pregnant Women",
      videoUrl: "https://www.youtube.com/watch?v=lKx0sOz31C4" // Replace with actual video URL
    },
    {
      image: courseImage2,
      title: "The Complete Nutrition Guide for Pregnant Women",
      videoUrl: "https://www.youtube.com/watch?app=desktop&v=IWBF60kQcuk&pp=sAQA" // Replace with actual video URL
    },
    {
      image: courseImage3,
      title: "Nutrition and its impact on Babies",
      videoUrl: "https://www.youtube.com/watch?v=4bUPl-qPg38" // Replace with actual video URL
    },
    {
      image: courseImage4,
      title: "How to take care of yourself, Postpartum",
      videoUrl: "https://www.youtube.com/watch?v=3N7zpOvStOA" // Replace with actual video URL
    }
  ];


  /*  This component renders an educational section featuring a title, a subtitle, 
  a series of category buttons, and a grid layout for displaying course cards. 
  The layout is responsive. It adjusts the number of columns based on the screen size. 
  Each course card is generated dynamically from an array of course data, 
  which includes images, titles, and video URLs for further learning. */
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-8">All the skills you need in one place</h1>
      <p className="text-gray-600 mb-4 text-center">From critical skills to technical topics, find everything you need to develop professionally.</p>
      
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Breastfeeding Techniques</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Infant Care</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Postpartum Self-Care</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Nutrition and Meal Planning</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Sleep Strategies</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Communication and Relationship Skills</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Babywearing Techniques</button>
        <button className="bg-[#A26B61] px-4 py-2 rounded-full text-sm font-semibold text-white">Support System</button>
        <FaArrowRight className="text-gray-500 self-center ml-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            videoUrl={course.videoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
