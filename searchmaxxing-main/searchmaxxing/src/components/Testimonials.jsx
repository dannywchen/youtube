import React from 'react';
import { Card } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Marketing Manager",
      content: "SearchMaxxing has revolutionized our Reddit research. We're now able to uncover insights we never knew existed!",
    },
    {
      name: "Jane Smith",
      role: "Content Creator",
      content: "The AI summarizer is a game-changer. It saves me hours of reading time while keeping me informed on all the important discussions.",
    },
    {
      name: "Mike Johnson",
      role: "Community Manager",
      content: "The persona explorer feature has helped us understand our audience on a whole new level. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};