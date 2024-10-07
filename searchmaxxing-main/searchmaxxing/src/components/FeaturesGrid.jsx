import React from 'react';
import { Card } from "@/components/ui/card";

export const FeaturesGrid = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};