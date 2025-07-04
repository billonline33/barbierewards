import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDashboard from "./UserDashboard";
import { LockIcon, UserIcon } from "lucide-react";

const Home = () => {
  const [userType, setUserType] = useState<"child" | "parent" | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleUserTypeSelect = (type: "child" | "parent") => {
    setUserType(type);
  };

  // If user type is selected, show the appropriate dashboard
  if (userType) {
    return (
      <UserDashboard
        userType={userType}
        onBackToSelection={() => setUserType(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
            Barbie Rewards App
          </h1>
          <p className="text-lg text-purple-700">
            Earn golden eggs and build your Barbie collection!
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-center mb-6 text-pink-600">
                Who's using the app today?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={() => handleUserTypeSelect("child")}
                  className="h-32 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl flex flex-col items-center justify-center gap-2 text-xl"
                >
                  <UserIcon size={32} />
                  Child Mode
                </Button>

                <Button
                  onClick={() => handleUserTypeSelect("parent")}
                  className="h-32 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl flex flex-col items-center justify-center gap-2 text-xl"
                >
                  <LockIcon size={32} />
                  Parent Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <img
            src="https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800&q=80"
            alt="Barbie Dolls"
            className="rounded-xl shadow-lg mx-auto max-h-64 object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
