
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "Indian Sign Language",
    description: "Learn the Rich Vocabulary and Syntax of Indian Sign Language (ISL)Discover our popular Indian Sign Language courses, designed for learners at every level. Whether you're just beginning or looking to advance your skills, there's something here for everyone.",
    level: "Beginner ",
    duration: "5 weeks",
    students: 421,
    image: "/ss.jpg",
    tag: "Featured"
  },
  {
    id: 2,
    title: "தமிழ் Sign Language",
    description: "எங்கள் தமிழ் இந்தியச் சான்றெழுத்து மொழி பாடங்களை, அனைத்து நிலைகளிலும் கற்றுக்கொள்ளும் மாணவர்களுக்கான வகுப்புகளாக வடிவமைக்கப்பட்டுள்ளது..",
    level: "Intermediate",
    duration: "6 weeks",
    students: 857,
    image: "/tsl.jpg",
    tag: "New"
  },
  {
    id: 3,
    title: "Telugu Sign Language",
    description: "తెలుగు ఇండియన్ సైన్ లాంగ్వేజిలో క్లిష్టమైన వ్యాకరణ నిర్మాణాలు మరియు వ్యక్తీకరణలను maîtrise చేయండి. మా కోర్సులు మీరు ఉన్నత TISL భావాలను అర్థం చేసుకునే విధంగా మీ నైపుణ్యాలను మరియు అవగాహనను మెరుగుపరుస్తాయి.",
    level: "Intermediate",
    duration: "3 weeks",
    students: 678,
    image: "/isll.jpg",
    tag: "Featured"
  },
  {
    id: 4,
    title: "ASL Basics",
    description: "Learn the fundamental signs and grammar of American Sign Language. Master the art of finger spelling for clearer and faster communication . Welcome to learn new From beginners to advanced there's something for everyone...",
    level: "Advanced",
    duration: "4 weeks",
    students: 1234,
    image: "/islb.jpg",
    tag: "Popular"
  }
];

const FeaturedCourses = () => {
  return (
    <section className="signx-section bg-white dark:bg-slate-900">
      <div className="signx-container">
        <div className="text-center mb-12">
          <h2 className="signx-heading mb-4">Our Courses</h2>
          <p className="signx-text max-w-3xl mx-auto">
          Explore our top sign language courses tailored for all skill levels. Whether you're a beginner or an advanced , we have something for you. 
            From beginners to advanced signers, there's something for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {course.tag && (
                  <Badge className="absolute top-3 right-3 bg-signx-purple">
                    {course.tag}
                  </Badge>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="bg-signx-light-purple text-signx-purple border-none">
                    {course.level}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-signx-purple hover:bg-signx-purple/90 text-white rounded-full">
                  <Link to={`/courses/${course.id}`}>
                    <BookOpen className="w-4 h-4 mr-2" /> View Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
