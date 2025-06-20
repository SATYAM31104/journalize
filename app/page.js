"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, ChevronRight, Book, Sparkles, Lock, FileText, BarChart2, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: 'Rich Text Editor',
    description: 'Capture your thoughts beautifully with markdown, formatting, and multimedia support.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Sparkles,
    title: 'Daily Prompts & Insights',
    description: 'Stay motivated with mood-based prompts and creative ideas that inspire consistency.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'End-to-end encryption and local data controls ensure your entries stay yours alone.',
    gradient: 'from-indigo-500 to-blue-500'
  }
];

const faqs = [
  {
    q: 'How secure is my journal data?',
    a: 'Your journal entries are protected with end-to-end encryption and stored securely. Only you have access to your personal thoughts and reflections.'
  },
  {
    q: 'Can I access my journal on multiple devices?',
    a: 'Yes! Your journal syncs seamlessly across all your devices. Write on your phone during lunch and continue on your laptop at home.'
  },
  {
    q: 'Is there a mobile app available?',
    a: 'Our responsive web app works perfectly on mobile devices, and native apps are coming soon for iOS and Android.'
  }
];

export default function InteractiveJournalLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);

    const handleScroll = () => setScrollY(window.pageYOffset);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const Skeleton = ({ className, ...props }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} {...props} />
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-orange-400 to-pink-400 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `translateY(${scrollY * particle.speed * 0.1}px) translateX(${mousePos.x * 20}px)`
            }}
          />
        ))}
        
        {/* Large gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 30}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 40}px)` }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-500"
            onMouseEnter={() => setMousePos(prev => ({ ...prev, hover: true }))}
          >
            Your Space to Reflect.<br />
            Your Story to Tell.
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 opacity-90 hover:opacity-100 transition-opacity duration-300">
            Capture your thoughts, track your moods, and reflect on your journey in a beautiful, secure space.
          </p>

          {/* Interactive Journal Preview */}
          <div 
            className="relative max-w-md mx-auto mb-12 group cursor-pointer"
            onMouseEnter={() => setActiveFeature('preview')}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-orange-100 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
              <div className="flex gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-orange-400 animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-orange-300 animate-pulse delay-100" />
                <div className="h-3 w-3 rounded-full bg-orange-200 animate-pulse delay-200" />
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-orange-600">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Today's Entry</span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-orange-900 text-left">Write What You Think</h3>
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-20">
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Start Writing 
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Learn More 
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{ 
                transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-orange-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className={`h-16 w-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`absolute inset-0 h-16 w-16 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

                <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Sections */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Rich Text Editor Demo */}
          <div className="space-y-6">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="absolute inset-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-red-700 bg-clip-text text-transparent">
              Rich Text Editor
            </h3>
            <p className="text-xl text-orange-700 leading-relaxed">
              Express your thoughts fully with our powerful editor featuring advanced formatting capabilities
            </p>
            
            <div className="space-y-3">
              {['Format Text With Ease', 'Embedded Links & Media', 'Markdown Support'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 shadow-lg group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-lg font-medium text-gray-700 group-hover:text-orange-700 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Editor Preview */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex gap-3 mb-6">
                {['orange', 'purple', 'pink'].map((color, i) => (
                  <div key={i} className={`h-10 w-10 rounded-lg bg-gradient-to-br from-${color}-200 to-${color}-300 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                    <div className={`h-4 w-4 bg-${color}-500 rounded`} />
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl w-4/5" />
                <Skeleton className="h-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg w-full" />
                <Skeleton className="h-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg w-3/4" />
                <div className="flex gap-2 mt-6">
                  <Skeleton className="h-8 w-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full" />
                  <Skeleton className="h-8 w-20 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Demo */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative group order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  {[TrendingUp, BarChart2, Sparkles].map((Icon, i) => (
                    <div key={i} className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-200 to-purple-300 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full animate-pulse">
                  Live Data
                </div>
              </div>
              
              <div className="flex items-end gap-2 h-32 p-4 bg-gradient-to-t from-indigo-50 to-transparent rounded-xl mb-4">
                {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {['😊', '😐', '😔'].map((emoji, i) => (
                  <div key={i} className="text-center p-3 bg-gradient-to-br from-green-50 to-blue-100 rounded-xl border hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">{emoji}</span>
                    </div>
                    <Skeleton className="h-4 bg-green-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6 order-1 md:order-2">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer">
                <BarChart2 className="h-8 w-8 text-white" />
              </div>
              <div className="absolute inset-0 h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
              Mood Analytics
            </h3>
            <p className="text-xl text-purple-700 leading-relaxed">
              Track your emotional journey with intelligent mood analysis and beautiful visualizations
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-900 to-purple-700 bg-clip-text text-transparent text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl border border-orange-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 font-semibold text-lg text-orange-900 hover:text-orange-700 transition-colors duration-200 hover:bg-orange-50 flex justify-between items-center"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  {faq.q}
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform duration-300 ${expandedFaq === index ? 'rotate-90' : ''}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-orange-700 bg-orange-50/50 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-purple-400/20 rounded-3xl blur-2xl" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-orange-100">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Start Reflecting on Your Journey Today
            </h2>
            <p className="text-xl text-orange-800 mb-8 font-medium">
              JOIN THOUSANDS OF WRITERS THROUGH JOURNALIZE
            </p>
            <button className="group relative bg-gradient-to-r from-orange-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <span className="relative">Get Started For Free</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}