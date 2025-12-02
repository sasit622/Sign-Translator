
import React from 'react';
import { Camera, Book, Award, Users, RefreshCw, Globe } from 'lucide-react';

const features = [
  {
    icon: <Camera className="w-10 h-10 text-signx-purple" />,
    title: "Real-time Translation",
    description: "When You Need It Our smart system instan tly converts sign language to text Supports regional languages like Tamil and Telugu."
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-signx-purple" />,
    title: "Interactive Practice",
    description: "Practice with our webcam tool and get instant feedback on your signing technique and medium accuracy."
  },
  {
    icon: <Globe className="w-10 h-10 text-signx-purple" />,
    title: "Multiple Sign Languages",
    description: "Learn ASL, ISL, தமிழ் ,Telugu And Hindi sign languages from different regions around the world."
  }
];

const Features = () => {
  return (
    <section className="signx-section bg-signx-light-purple/30 dark:bg-slate-800">
      <div className="signx-container">
        <div className="text-center mb-12">
          <h1 className="signx-heading mb-4">Why  SignX</h1>
          <p className="signx-text max-w-3xl mx-auto">
          Our platform offers unique features,
designed to make learning sign language accessible and engaging.
With support for regional languages like Tamil and Telugu,
we ensure interactive and effective learning for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div className="mb-5 inline-block bg-signx-light-purple dark:bg-slate-700 p-3 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="signx-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
