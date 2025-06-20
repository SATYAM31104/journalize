"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-black">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Apple-style 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-thin text-white tracking-tighter">
            404
          </h1>
          <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Clean Typography */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide">
            The page you're looking for
            <br />
            <span className="text-gray-400">can't be found.</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            We've searched everywhere, but this page seems to have wandered off into the digital void.
            Let's get you back on track.
          </p>
        </div>

        {/* Apple-style Button */}
        <div className="mb-16">
          <Link href="/" className="inline-block group">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Return Home</span>
              </span>
            </Button>
          </Link>
        </div>

        {/* Minimalist Navigation */}
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-6 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 font-light">
              About
            </Link>
            <div className="w-px h-4 bg-gray-600"></div>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 font-light">
              Blog
            </Link>
            <div className="w-px h-4 bg-gray-600"></div>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 font-light">
              Contact
            </Link>
            <div className="w-px h-4 bg-gray-600"></div>
            <Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-200 font-light">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Futuristic Corner Elements */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 border border-white/20 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full m-2 animate-pulse"></div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8">
        <div className="w-16 h-16 border border-white/20 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-blue-400 rounded-full m-2 animate-pulse delay-300"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8">
        <div className="w-16 h-16 border border-white/20 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-purple-400 rounded-full m-2 animate-pulse delay-700"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 border border-white/20 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-orange-400 rounded-full m-2 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Subtle Ambient Light */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default NotFound;