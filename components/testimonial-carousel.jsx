"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import data from "@/data/testimonials.json"; // Import the full object

const { testimonials } = data; // Destructure to get the array

export const TestimonialCarousel = () => {
  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">What Our Writers Say</h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true
          })
        ]}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 px-2">
              <Card className="h-full flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-2">"{testimonial.content}"</blockquote>
                  <p className="text-sm text-gray-400 mt-4">Joined: {testimonial.dateJoined} · Entries: {testimonial.entriesWritten}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
};