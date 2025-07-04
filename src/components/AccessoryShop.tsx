import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingCart, Search, Filter, Egg, X } from "lucide-react";
import { useEggBalance } from "@/hooks/useEggBalance";

interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface AccessoryShopProps {
  // Props are now optional since we're using the hook
  onPurchase?: (item: AccessoryItem) => void;
}

const AccessoryShop = ({ onPurchase = () => {} }: AccessoryShopProps) => {
  const { eggBalance, spendEggs, hasEnoughEggs } = useEggBalance();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [cart, setCart] = useState<AccessoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AccessoryItem | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AccessoryItem | null>(
    null
  );

  // Load purchased items from localStorage on component mount
  useEffect(() => {
    const savedPurchasedItems = localStorage.getItem("purchasedAccessories");
    if (savedPurchasedItems) {
      try {
        const parsedItems = JSON.parse(savedPurchasedItems);
        setPurchasedItems(new Set(parsedItems));
      } catch (error) {
        console.error("Error parsing saved purchased items:", error);
      }
    }
  }, []);

  // Save purchased items to localStorage whenever they change
  const addPurchasedItem = (itemId: string) => {
    setPurchasedItems((prev) => {
      const newSet = new Set(prev).add(itemId);
      localStorage.setItem("purchasedAccessories", JSON.stringify([...newSet]));
      return newSet;
    });
  };

  // Mock data for accessories
  const accessories: AccessoryItem[] = [
    {
      id: "1",
      name: "Blue Dress",
      price: 25,
      image: "/images/accessories/blueDress.jpg",
      category: "clothes",
      description: "A beautiful blue dress.",
    },
    {
      id: "2",
      name: "Brown Shoe",
      price: 30,
      image: "/images/accessories/brownshoe.jpg",
      category: "clothes",
      description: "Perfect outfit for a day at the beach.",
    },
    {
      id: "3",
      name: "Hair Band",
      price: 15,
      image: "/images/accessories/hairband.jpg",
      category: "toys",
      description: "A cute hair band for your Barbie.",
    },
    {
      id: "4",
      name: "Handbag",
      price: 50,
      image: "/images/accessories/handbag.jpg",
      category: "toys",
      description: "A stylish hand bag.",
    },
    {
      id: "5",
      name: "Pants",
      price: 10,
      image: "/images/accessories/pants.jpg",
      category: "fashion",
      description: "Trendy pants for Barbie.",
    },
    {
      id: "6",
      name: "Purple Dress",
      price: 20,
      image: "/images/accessories/purpleDress.jpg",
      category: "fashion",
      description: "A lovely purple dress.",
    },
    {
      id: "7",
      name: "Red Shoe",
      price: 18,
      image: "/images/accessories/redshoe.jpg",
      category: "fashion",
      description: "Stylish red shoes.",
    },
    {
      id: "8",
      name: "Swimming Suite",
      price: 22,
      image: "/images/accessories/swimmingsuite.jpg",
      category: "clothes",
      description: "A cute swimming suite for Barbie.",
    },
    {
      id: "9",
      name: "T-Shirt",
      price: 12,
      image: "/images/accessories/tshirt.jpg",
      category: "clothes",
      description: "Casual t-shirt for Barbie.",
    },
    {
      id: "10",
      name: "Wedding Dress",
      price: 60,
      image: "/images/accessories/weddingDress.jpg",
      category: "clothes",
      description: "A beautiful wedding dress.",
    },
    {
      id: "11",
      name: "Yellow Dress",
      price: 25,
      image: "/images/accessories/yellowDress.jpg",
      category: "clothes",
      description: "A bright yellow dress.",
    },
    {
      id: "12",
      name: "Yellow Hair Dryer",
      price: 15,
      image: "/images/accessories/yellowhairdryer.jpg",
      category: "house",
      description: "A yellow hair dryer for Barbie.",
    },
  ];

  // Filter accessories based on search query and category
  const filteredAccessories = accessories
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (item) => selectedCategory === "all" || item.category === selectedCategory
    );

  // Sort accessories based on selected sort option
  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name); // name-desc
  });

  const handleAddToCart = (item: AccessoryItem) => {
    setCart([...cart, item]);
  };

  const handlePurchase = (item: AccessoryItem) => {
    if (hasEnoughEggs(item.price)) {
      spendEggs(item.price);
      onPurchase(item);
      // Mark item as purchased and save to localStorage
      addPurchasedItem(item.id);
      // Clear cart after purchase
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setSelectedItem(item);
    }
  };

  const handleImageClick = (item: AccessoryItem) => {
    setSelectedImage(item);
    setImageModalOpen(true);
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Accessory Shop</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
            <Egg className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-bold text-lg">{eggBalance}</span>
            <span className="ml-1 text-gray-500">golden eggs</span>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({cart.length})</span>
            </Button>
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-pink-500">
                {cart.length}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search accessories..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-40">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={setSelectedCategory}
      >
        <TabsList className="grid grid-cols-5 mb-6 bg-pink-100">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="clothes">Clothes</TabsTrigger>
          <TabsTrigger value="toys">Toys</TabsTrigger>
          <TabsTrigger value="fashion">Fashion</TabsTrigger>
          <TabsTrigger value="house">House</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAccessories.map((item) => (
              <AccessoryCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onPurchase={handlePurchase}
                onImageClick={handleImageClick}
                eggBalance={eggBalance}
                isPurchased={purchasedItems.has(item.id)}
                hasEnoughEggs={hasEnoughEggs}
              />
            ))}
          </div>
        </TabsContent>

        {["clothes", "toys", "fashion", "house"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedAccessories
                .filter((item) => item.category === category)
                .map((item) => (
                  <AccessoryCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onPurchase={handlePurchase}
                    onImageClick={handleImageClick}
                    eggBalance={eggBalance}
                    isPurchased={purchasedItems.has(item.id)}
                    hasEnoughEggs={hasEnoughEggs}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="mt-6 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </CardTitle>
            <CardDescription>
              You have {cart.length} items in your cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(item)}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Egg className="h-4 w-4 text-yellow-500" />
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="font-bold">
              Total:
              <span className="ml-2 flex items-center">
                <Egg className="h-5 w-5 text-yellow-500 mr-1" />
                {totalCartPrice}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-pink-500 hover:bg-pink-600"
                  disabled={!hasEnoughEggs(totalCartPrice)}
                >
                  Checkout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to purchase these items for{" "}
                    {totalCartPrice} golden eggs?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      cart.forEach((item) => {
                        if (hasEnoughEggs(item.price)) {
                          spendEggs(item.price);
                          onPurchase(item);
                          addPurchasedItem(item.id);
                        }
                      });
                      setCart([]);
                    }}
                  >
                    Purchase
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      )}

      {/* Insufficient funds dialog */}
      <AlertDialog
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Not Enough Golden Eggs</AlertDialogTitle>
            <AlertDialogDescription>
              You don't have enough golden eggs to purchase this item. You need{" "}
              {selectedItem?.price} eggs but you only have {eggBalance} eggs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setSelectedItem(null)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-pink-600">
              {selectedImage?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="relative flex-1 overflow-hidden">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full flex items-center text-lg font-bold">
                    <Egg className="h-5 w-5 mr-2" />
                    {selectedImage.price}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {selectedImage?.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{selectedImage?.description}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (selectedImage) {
                    handleAddToCart(selectedImage);
                    setImageModalOpen(false);
                  }
                }}
                disabled={
                  selectedImage ? purchasedItems.has(selectedImage.id) : false
                }
              >
                {selectedImage && purchasedItems.has(selectedImage.id)
                  ? "Owned"
                  : "Add to Cart"}
              </Button>
              <Button
                className="flex-1 bg-pink-500 hover:bg-pink-600"
                onClick={() => {
                  if (selectedImage) {
                    handlePurchase(selectedImage);
                    setImageModalOpen(false);
                  }
                }}
                disabled={
                  selectedImage ? purchasedItems.has(selectedImage.id) : false
                }
              >
                {selectedImage && purchasedItems.has(selectedImage.id)
                  ? "Owned"
                  : "Buy Now"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface AccessoryCardProps {
  item: AccessoryItem;
  onAddToCart: (item: AccessoryItem) => void;
  onPurchase: (item: AccessoryItem) => void;
  onImageClick: (item: AccessoryItem) => void;
  eggBalance: number;
  isPurchased: boolean;
  hasEnoughEggs: (amount: number) => boolean;
}

const AccessoryCard = ({
  item,
  onAddToCart,
  onPurchase,
  onImageClick,
  eggBalance,
  isPurchased,
  hasEnoughEggs,
}: AccessoryCardProps) => {
  return (
    <Card
      className={`overflow-hidden transition-shadow ${
        isPurchased ? "bg-gray-100 opacity-60" : "bg-white hover:shadow-lg"
      }`}
    >
      <div
        className="relative h-48 cursor-pointer"
        onClick={() => onImageClick(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform hover:scale-105 ${
            isPurchased ? "grayscale" : ""
          }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2">
            <Search className="h-6 w-6 text-gray-700" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          Click to view
        </div>
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full flex items-center text-sm font-bold ${
            isPurchased
              ? "bg-gray-400 text-gray-700"
              : "bg-yellow-400 text-yellow-900"
          }`}
        >
          <Egg className="h-4 w-4 mr-1" />
          {item.price}
        </div>
        {isPurchased && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">PURCHASED</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg ${isPurchased ? "text-gray-500" : ""}`}>
          {item.name}
        </CardTitle>
        <CardDescription
          className={`line-clamp-2 ${isPurchased ? "text-gray-400" : ""}`}
        >
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onAddToCart(item)}
          disabled={isPurchased}
        >
          {isPurchased ? "Owned" : "Add to Cart"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="flex-1 bg-pink-500 hover:bg-pink-600"
              disabled={isPurchased}
            >
              {isPurchased ? "Owned" : "Buy Now"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to purchase {item.name} for {item.price}{" "}
                golden eggs?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onPurchase(item)}
                disabled={!hasEnoughEggs(item.price)}
              >
                Yes, Purchase
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default AccessoryShop;
