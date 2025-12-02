import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


// Define resource types properly without self-referencing
interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'book' | 'video' | 'article';
  language: 'ASL' | 'தமிழ் SL' | 'TSL' | 'Multiple';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  imageUrl: string;
  downloadUrl?: string;
  viewUrl?: string;
}

// Library resources data
const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Complete ASL Guide",
    description: "A comprehensive guide to American Sign Language with detailed illustrations and practice exercises.",
    type: "book",
    language: "ASL",
    level: "All Levels",
    imageUrl: "/asl.jpg",
    downloadUrl: "#",
    viewUrl: "#"
  },
  {
    id: 2,
    title: "தொடக்கநிலையினரு க்கான தமிழ் SL",
    description: "இந்த தொடக்கத்திற்கான சித்திர வழிகாட்டியை பயன்படுத்தி பிரிட்டிஷ் சைகை மொழியுடன் உங்கள் பயணத்தை தொடங்குங்கள்.",
    type: "book",
    language: "தமிழ் SL",
    level: "Beginner",
    imageUrl: "/tamil.jpg",
    downloadUrl: "#",
    viewUrl: "#"
  },
  {
    id: 3,
    title: "ITSL",
    description: "భారతీయ సంకేత భాషలోని ప్రాంతీయ వైవిధ్యాలను చక్కగా వివరించిన, సంపూర్ణమైన నిఘంటువు.ఇది ప్రతి ప్రాంతానికి తగిన ప్రత్యేక సంకేతాలను అర్థం చేసుకునేందుకు ఉపయోగపడుతుంది.",
    type: "book",
    language: "TSL",
    level: "All Levels",
    imageUrl: "/telugu.jpg",
    downloadUrl: "#",
    viewUrl: "#"
  },
  {
    id: 4,
    title: "Medical Sign Language Guide",
    description: "Master essential signs used in medical settings across various sign languages.From symptoms and diagnoses to emergency instructions, communicate with confidence and care.",
    type: "book",
    language: "Multiple",
    level: "Intermediate",
    imageUrl: "/medical.jpg",
    downloadUrl: "#",
    viewUrl: "#"
  },
  {
    id: 5,
    title: "ASL Fingerspelling Practice",
    description: "Video tutorials to help you master ASL fingerspelling with guided practice.",
    type: "video",
    language: "ASL",
    level: "Beginner",
    imageUrl: "/ll.jpg",
    viewUrl: "#"
  },
  {
    id: 6,
    title: "Sign Language Around the World",
    description: "An article exploring the diversity of sign languages globally with cultural context.",
    type: "article",
    language: "Multiple",
    level: "All Levels",
    imageUrl: "/w.jpg",
    viewUrl: "#"
  },
  {
    id: 7,
    title: "Advanced Expression Techniques",
    description: "Take your signing to the next level with these advanced expression and storytelling techniques.",
    type: "video",
    language: "ASL",
    level: "Advanced",
    imageUrl: "/e.jpg",
    viewUrl: "#"
  },
  {
    id: 8,
    title: "தமிழ் SL Regional Variations",
    description: "Understand the regional variations in British Sign Language with this detailed guide.சைகைகளை அறிந்து, தெளிவான தொடர்பை மேம்படுத்துங்கள்.",
    type: "book",
    language: "தமிழ் SL",
    level: "Intermediate",
    imageUrl: "/tamil2.jpg",
    downloadUrl: "#",
    viewUrl: "#"
  }
];

// Filter options
const languages = ['All', 'ASL', 'தமிழ் SL', 'TSL', 'Multiple'];
const types = ['All', 'Book', 'Video', 'Article'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

const Library = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  
  // Filter resources based on filters only
  const filteredResources = resourcesData.filter(resource => {
    const matchesLanguage = selectedLanguage === 'All' || resource.language === selectedLanguage;
    const matchesType = selectedType === 'All' || resource.type === selectedType.toLowerCase();
    const matchesLevel = selectedLevel === 'All' || resource.level === selectedLevel;
    
    return matchesLanguage && matchesType && matchesLevel;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-slate-50 dark:bg-slate-900">
        <div className="signx-container py-12">
          <div className="text-center mb-12">
          <h1 className="signx-heading mb-4">
               <span className="signx-gradient-text">SignX</span>
              </h1>
            <h1 className="signx-heading mb-4">Sign Language Library</h1>
            <p className="signx-text max-w-3xl mx-auto">
            Dive into the world of sign language – discover books, videos, and visual guides that bring gestures to life
            </p><p>சைகை மொழியின் உலகத்தை ஆராயுங்கள்</p>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Language filter */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-slate-200">Language</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Button
                      key={language}
                      variant={selectedLanguage === language ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(language)}
                      className={selectedLanguage === language ? "bg-signx-purple hover:bg-signx-purple/90" : ""}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Type filter */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-slate-200">Resource Type</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type ? "bg-signx-purple hover:bg-signx-purple/90" : ""}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Level filter */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-slate-200">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                      className={selectedLevel === level ? "bg-signx-purple hover:bg-signx-purple/90" : ""}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 dark:text-slate-200">Resources ({filteredResources.length})</h2>
            <Separator className="mb-6" />
            
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 transition-transform hover:shadow-md hover:-translate-y-1">
                    <div className="h-40 overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex gap-2 mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-signx-light-purple/30 text-signx-purple">
                          {resource.language}
                        </span>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700">
                          {resource.level}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 dark:text-slate-200">{resource.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{resource.description}</p>
                      <div className="flex gap-2">
                        {resource.viewUrl && (
                          <Button variant="outline" size="sm" className="w-full">
                            View
                          </Button>
                        )}
                        {resource.downloadUrl && (
                          <Button size="sm" className="w-full bg-signx-purple hover:bg-signx-purple/90">
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2 dark:text-slate-200">No resources found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
