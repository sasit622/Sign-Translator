
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Camera, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCourses />
        <Features />
        
        {/* Live Translator Banner */}
        <section className="py-16 bg-signx-purple/10 dark:bg-slate-800/50">
          <div className="signx-container">
            <div className="bg-gradient-to-r from-signx-purple to-blue-500 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Try Our Live Sign Language Translator</h2>
                <p className="text-white/90 max-w-md mb-6">
                Use your webcam and start signing instantly.
Watch your signs convert to text in real-time,
making communication easier and more natural..
                </p>
                <Button asChild size="lg" className="bg-white text-signx-purple hover:bg-white/90 rounded-full">
                  <Link to="/practice">
                    <Camera className="mr-2 h-5 w-5" /> Try It Now!
                  </Link>
                </Button>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-1 rounded-xl shadow-xl">
                <img 
                  src="/2.jpg" 
                  alt="Live Translation" 
                  className="w-full max-w-md rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
                {/* Library Preview Section */}
                <section className="signx-section bg-white dark:bg-slate-900">
          <div className="signx-container">
            <div className="text-center mb-12">
              <h2 className="signx-heading mb-4">Extensive Sign Language Library</h2>
              <p className="signx-text max-w-3xl mx-auto">
                Access our comprehensive collection of sign language resources, books, and
                visual dictionaries to enhance your learning journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "ASL Dictionary",
                  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80",
                  description: "Comprehensive visual dictionary of American Sign Language."
                },
                {
                  title: "Sign Language History",
                  image: "/tamil.jpg",
                  description: "Explore the rich history and evolution of sign languages across cultures."
                },
                {
                  title: "Fingerspelling Charts",
                  image: "https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  description: "Visual guides for mastering fingerspelling in multiple sign languages."
                }
              ].map((book, index) => (
                <div key={index} className="signx-card overflow-hidden">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{book.title}</h3>
                    <p className="signx-text mb-4">{book.description}</p>
                    <Button asChild variant="outline" className="w-full rounded-full">
                      <Link to="/library">
                        <BookOpen className="mr-2 h-4 w-4" /> View Resource
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild className="signx-button-primary">
                <Link to="/library">
                  Explore Full Library <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
