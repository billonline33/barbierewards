import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BarbieGallery from "./BarbieGallery";
import AccessoryShop from "./AccessoryShop";
import ParentAdminPanel from "./ParentAdminPanel";
import { Egg, Baby, ShoppingBag, Calendar, User, Lock } from "lucide-react";
import { useEggBalance } from "@/hooks/useEggBalance";

interface UserDashboardProps {
  userType?: "child" | "parent";
  selectedBarbie?: string;
  onBackToSelection?: () => void;
}

interface Barbie {
  id: string;
  name: string;
  image: string;
  description: string;
}

const UserDashboard = ({
  userType = "child",
  selectedBarbie = "Fashion Barbie",
  onBackToSelection,
}: UserDashboardProps) => {
  const { eggBalance } = useEggBalance();
  const [currentView, setCurrentView] = useState<string>("home");
  const [isParentAuth, setIsParentAuth] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<boolean>(false);
  const [selectedBarbieData, setSelectedBarbieData] = useState<Barbie | null>(
    null
  );

  // Default Barbie data
  const defaultBarbie: Barbie = {
    id: "1",
    name: "Fashion Barbie",
    image: "/images/fashion-barbie.jpg",
    description: "The classic fashion Barbie with stylish outfits",
  };

  // Load selected Barbie from localStorage on component mount
  useEffect(() => {
    const savedBarbie = localStorage.getItem("selectedBarbie");
    if (savedBarbie) {
      try {
        const parsedBarbie = JSON.parse(savedBarbie);
        setSelectedBarbieData(parsedBarbie);
      } catch (error) {
        console.error("Error parsing saved Barbie data:", error);
        setSelectedBarbieData(defaultBarbie);
      }
    } else {
      setSelectedBarbieData(defaultBarbie);
    }
  }, []);

  // Handle Barbie selection
  const handleBarbieSelect = (barbie: Barbie) => {
    setSelectedBarbieData(barbie);
    localStorage.setItem("selectedBarbie", JSON.stringify(barbie));
  };

  const handleParentAuth = () => {
    // Simple password check - in a real app, this would be more secure
    if (password === "1234") {
      setIsParentAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const renderChildDashboard = () => (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=princess"
              alt="Child avatar"
            />
            <AvatarFallback>👧</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-primary">Barbie Rewards</h2>
            <p className="text-muted-foreground">Hello, Princess!</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1 text-amber-500 border-amber-500"
          >
            <Egg className="h-4 w-4" />
            <span className="text-lg font-bold">{eggBalance}</span>
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentView("home")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {currentView === "home" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setCurrentView("barbies")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-pink-500" />
                Barbie Selection
              </CardTitle>
              <CardDescription>
                Choose your favorite Barbie doll
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center">
                <img
                  src={selectedBarbieData?.image || defaultBarbie.image}
                  alt={selectedBarbieData?.name || defaultBarbie.name}
                  className="h-full object-contain rounded-md"
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Currently selected:{" "}
                {selectedBarbieData?.name || defaultBarbie.name}
              </p>
            </CardFooter>
          </Card>

          <Card
            className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setCurrentView("shop")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-500" />
                Accessory Shop
              </CardTitle>
              <CardDescription>
                Buy accessories with golden eggs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&q=80"
                  alt="Barbie accessories"
                  className="h-full object-contain rounded-md"
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Clothes, toys, fashion items & more
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Progress Tracker
              </CardTitle>
              <CardDescription>View your study achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&q=80"
                  alt="Progress chart"
                  className="h-full object-contain rounded-md"
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Your current egg balance: {eggBalance}
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : currentView === "barbies" ? (
        <BarbieGallery
          onSelectBarbie={handleBarbieSelect}
          selectedBarbieId={selectedBarbieData?.id || ""}
        />
      ) : currentView === "shop" ? (
        <AccessoryShop />
      ) : null}

      <div className="fixed bottom-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-pink-100 border-pink-300 hover:bg-pink-200"
            >
              <Lock className="h-5 w-5 text-pink-500" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Parent Access</DialogTitle>
              <DialogDescription>
                Enter your password to access the parent admin panel.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {authError && (
                  <p className="text-sm text-destructive">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
              <Button onClick={handleParentAuth} className="w-full">
                Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=parent"
              alt="Parent avatar"
            />
            <AvatarFallback>👩</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Parent Admin Panel
            </h2>
            <p className="text-muted-foreground">Manage rewards and progress</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsParentAuth(false);
            onBackToSelection?.();
          }}
        >
          Exit Admin Mode
        </Button>
      </div>

      <ParentAdminPanel authenticated={true} />
    </div>
  );

  // If user is parent and authenticated, show parent dashboard
  if (userType === "parent" || isParentAuth) {
    return renderParentDashboard();
  }

  // Otherwise show child dashboard
  return renderChildDashboard();
};

export default UserDashboard;
