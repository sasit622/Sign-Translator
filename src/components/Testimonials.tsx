
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Nithish",
    role: "Web Designer",
    image: "/.jpg",
    quote: "I’m Nithish,the founder of SignX. Driven by a passion for inclusivity,I created this platform to make sign language learning accessible and empower communication for the Deaf,mute,and special-abled communities.",
    rating: 5
  },
  {
    id: 2,
    name: "AJAY SURYA",
    role: "Web Designer",
    image: "/.jpg",
    quote: "I’m AJAY SURYA,the founder of SignX. Driven by a passion for inclusivity,I created this platform to make sign language learning accessible and empower communication for the Deaf,mute,and special-abled communities.",
    rating: 5
  },
  {
    id: 3,
    name: "NISHITHA SHRI",
    role: "Web Designer",
    image: "/.jpg",
    quote: "I’m NISHITHA SHRI,the founder of SignX. Driven by a passion for inclusivity,I created this platform to make sign language learning accessible and empower communication for the Deaf,mute,and special-abled communities.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="signx-section bg-white dark:bg-slate-900">
      <div className="signx-container">
        <div className="text-center mb-12">
          <h2 className="signx-heading mb-4">Web Designer</h2>
          <p className="signx-text max-w-3xl mx-auto">
          At SignX, our team is dedicated to bridging communication gaps for the Deaf, mute, and special-abled communities. We combine technology, education, and passion to create an accessible platform for learning sign language. Our goal is to make communication effortless and inclusive for everyone, anywhere.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border border-slate-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <p className="signx-text italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
