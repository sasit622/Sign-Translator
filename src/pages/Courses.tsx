
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const courseCategories = [
  { value: "all", label: "All Courses" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "asl", label: "ISL" },
  { value: "bsl", label: "தமிழ் SL" },
  { value: "isl", label: "TSL" },
];

const allCourses = [
  {
    id: 1,
    title: "Indian Sign Language",
    description: "Learn the Rich Vocabulary and Syntax of Indian Sign Language (ISL)Discover our popular Indian Sign Language courses, designed for learners at every level. Whether you're just beginning or looking to advance your skills, there's something here for everyone. ",
    level: "Beginner",
    category: "asl",
    duration: "4 weeks",
    students: 1234,
    image: "/ss.jpg",
    tag: "Popular"
  },
  {
    id: 2,
    title: "தமிழ் Sign Language",
    description: "எங்கள் தமிழ் இந்தியச் சான்றெழுத்து மொழி பாடங்களை, அனைத்து நிலைகளிலும் கற்றுக்கொள்ளும் மாணவர்களுக்கான வகுப்புகளாக வடிவமைக்கப்பட்டுள்ளது..",
    level: "Intermediate",
    category: "bsl",
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
    category: "isl",
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
    category: "all",
    duration: "5 weeks",
    students: 421,
    image: "/islb.jpg",
    tag: "Popular"
  }
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filterCoursesByCategory = (category: string) => {
    if (category === "all") return allCourses;
    if (category === "beginner" || category === "intermediate" || category === "advanced") {
      return allCourses.filter(course => course.level.toLowerCase() === category);
    }
    return allCourses.filter(course => course.category === category);
  };
  
  const filterCoursesBySearch = (courses: typeof allCourses) => {
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-b from-signx-light-purple/30 to-white dark:from-slate-900 dark:to-slate-900 py-16">
          <div className="signx-container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="signx-heading mb-4">
                Explore Our <span className="signx-gradient-text">Sign Language Courses</span>
              </h1>
              <p className="signx-text text-lg mb-8">
              Unlock a world of communication with our curated lessons.
Designed for beginners, intermediates, and advanced signers,each course guides you step by step through your journey.Learn at your own pace with engaging and interactive content.
              </p>
              
              
            </div>
          </div>
        </section>
        
        {/* Course Tabs & Listing */}
        <section className="signx-section">
          <div className="signx-container">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-8">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 overflow-x-auto flex-wrap">
                  {courseCategories.map((category) => (
                    <TabsTrigger 
                      key={category.value} 
                      value={category.value}
                      className="rounded-full data-[state=active]:bg-signx-purple data-[state=active]:text-white"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <Button variant="outline" size="icon" className="rounded-full">
                  <Filter className="h-5 w-5" />
                </Button>
              </div>
              
              {courseCategories.map((category) => (
                <TabsContent key={category.value} value={category.value}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filterCoursesBySearch(filterCoursesByCategory(category.value)).map((course) => (
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
                  
                  {filterCoursesBySearch(filterCoursesByCategory(category.value)).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-lg font-medium mb-4">No courses found</p>
                      <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                      <Button onClick={() => setSearchQuery("")} variant="outline" className="rounded-full">
                        Clear Search
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
