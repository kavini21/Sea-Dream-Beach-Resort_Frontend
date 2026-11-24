'use client';

import { Users, Heart, Award, Clock } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Family-Run",
    description: "Personal touch and genuine care from our family to yours",
  },
  {
    icon: Users,
    title: "Warm Hospitality",
    description: "Friendly service that makes you feel at home",
  },
  {
    icon: Award,
    title: "Quality Service",
    description: "Committed to providing the best experience",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always here to help with any request",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="w-full h-[500px]  text-white bg-[url('/images/aboutpage.jpg')]">
        <div className="flex flex-col items-center justify-center h-full text-center container-custom">
          <h1 className="mb-4 text-4xl font-bold">About Sea Dream Beach</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Discover the story behind your perfect beach getaway
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2">
            <div>
              <img
                src="/images/hotel-view.jpg"
                alt="Hotel View"
                className="object-cover w-full rounded-lg shadow-lg h-96"
              />
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-bold text-primary">
                Our Story
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Sea Dream Beach Resort has been a family-run establishment for
                over a decade, welcoming travelers from around the world to
                experience the beauty of Weligama.
              </p>
              <p className="mb-4 leading-relaxed text-gray-600">
                Our journey began with a simple dream - to create a peaceful
                haven where guests could escape the hustle of daily life and
                reconnect with nature and themselves.
              </p>
              <p className="leading-relaxed text-gray-600">
                Today, we're proud to offer 7+ beautifully appointed rooms, each
                designed with your comfort in mind. Our 4.5-star guest rating
                reflects our commitment to excellence and genuine hospitality.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <h2 className="mb-12 text-3xl font-bold text-center text-primary">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 text-center rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
