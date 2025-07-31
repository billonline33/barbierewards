import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface Barbie {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface BarbieGalleryProps {
  onSelectBarbie?: (barbie: Barbie) => void;
  selectedBarbieId?: string;
}

const BarbieGallery = ({
  onSelectBarbie = () => {},
  selectedBarbieId = "",
}: BarbieGalleryProps) => {
  // Mock data for Barbie dolls
  const barbies: Barbie[] = [
    {
      id: "1",
      name: "Fashion Barbie",
      image: "/images/barbie1.webp",
      description: "The classic fashion Barbie with stylish outfits",
    },
    {
      id: "2",
      name: "Doctor Barbie",
      image: "/images/barbie2.jpg",
      description: "Barbie as a medical professional",
    },
    {
      id: "3",
      name: "Astronaut Barbie",
      image: "/images/barbie3.webp",
      description: "Barbie ready for space adventures",
    },
    {
      id: "4",
      name: "Mermaid Barbie",
      image: "/images/mermaidBarbie.jpg",
      description: "Barbie as a beautiful mermaid",
    },
    {
      id: "5",
      name: "Princess Barbie",
      image: "/images/royal-barbie.webp",
      description: "Barbie as a royal princess",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBarbie = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % barbies.length);
  };

  const prevBarbie = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + barbies.length) % barbies.length
    );
  };

  const handleSelectBarbie = (barbie: Barbie) => {
    onSelectBarbie(barbie);
  };

  return (
    <div className="w-full bg-pink-50 p-6 rounded-xl">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold text-pink-600">Choose Your Barbie</h2>

        {/* Main display for selected Barbie */}
        <div className="relative w-full max-w-3xl">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md overflow-hidden border-4 border-pink-300 shadow-xl">
              <div className="relative pt-[100%] bg-gradient-to-b from-pink-100 to-purple-100">
                <img
                  src={barbies[currentIndex].image}
                  alt={barbies[currentIndex].name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {selectedBarbieId === barbies[currentIndex].id && (
                  <Badge className="absolute top-4 right-4 bg-pink-500 text-white">
                    Selected
                  </Badge>
                )}
              </div>
              <CardContent className="p-4 bg-white">
                <h3 className="text-xl font-bold text-pink-600">
                  {barbies[currentIndex].name}
                </h3>
                <p className="text-gray-600 mt-2">
                  {barbies[currentIndex].description}
                </p>
                <Button
                  onClick={() => handleSelectBarbie(barbies[currentIndex])}
                  className="w-full mt-4 bg-pink-500 hover:bg-pink-600"
                  variant="default"
                >
                  {selectedBarbieId === barbies[currentIndex].id
                    ? "Selected"
                    : "Choose This Barbie"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md border-pink-200 z-10"
            onClick={prevBarbie}
          >
            <ChevronLeft className="h-6 w-6 text-pink-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md border-pink-200 z-10"
            onClick={nextBarbie}
          >
            <ChevronRight className="h-6 w-6 text-pink-500" />
          </Button>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex space-x-2 overflow-x-auto py-2 w-full max-w-3xl">
          {barbies.map((barbie, index) => (
            <motion.div
              key={barbie.id}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer rounded-md overflow-hidden ${
                currentIndex === index
                  ? "ring-4 ring-pink-500"
                  : "ring-2 ring-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="w-16 h-16 relative">
                <img
                  src={barbie.image}
                  alt={barbie.name}
                  className="w-full h-full object-cover"
                />
                {selectedBarbieId === barbie.id && (
                  <div className="absolute inset-0 bg-pink-500 bg-opacity-30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barbie count indicator */}
        <div className="flex space-x-1">
          {barbies.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-pink-500" : "bg-pink-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbieGallery;
