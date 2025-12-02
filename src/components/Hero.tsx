
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-signx-light-purple/30 to-white dark:from-slate-900 dark:to-slate-900 pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="signx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="signx-heading mb-4">
              <span className="signx-gradient-text">SignX</span>{' '}<br/>
              Redefining Connection Through Sign Language
            </h1>
            <p className="signx-text text-lg mb-8 max-w-xl">
            "SignX empowers communication through sign language and technology.
Our platform bridges gaps, making learning sign language accessible and interactive.
We aim to break down communication barriers and foster deeper connections.
Whether you're a beginner or advanced learner, SignX helps you grow in your skills.
Join us in transforming the way you connect with the world through inclusive communication.
"
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="signx-button-primary">
                <Link to="/courses">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/practice">Try Practice Tool</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-signx-purple to-blue-500 opacity-30 blur-xl"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
              <video
  className="w-full h-auto"
  poster="/1.webp"
  controls
  muted
>
  <source src="/2.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
        <div className="p-6 text-white">
          <h3 className="font-bold text-lg">Introduction to ASL</h3>
          <p className="text-sm opacity-90">Learn the basics of American Sign Language</p>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
