import React, { useState } from "react";
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
import { ShoppingCart, Search, Filter, Egg } from "lucide-react";

interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface AccessoryShopProps {
  eggBalance?: number;
  onPurchase?: (item: AccessoryItem) => void;
}

const AccessoryShop = ({
  eggBalance = 100,
  onPurchase = () => {},
}: AccessoryShopProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [cart, setCart] = useState<AccessoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AccessoryItem | null>(null);

  // Mock data for accessories
  const accessories: AccessoryItem[] = [
    {
      id: "1",
      name: "Pink Party Dress",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80",
      category: "clothes",
      description: "A beautiful pink party dress for special occasions.",
    },
    {
      id: "2",
      name: "Beach Set",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=300&q=80",
      category: "clothes",
      description: "Perfect outfit for a day at the beach.",
    },
    {
      id: "3",
      name: "Mini Puppy",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=300&q=80",
      category: "toys",
      description: "A cute puppy companion for your Barbie.",
    },
    {
      id: "4",
      name: "Barbie Convertible",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&q=80",
      category: "toys",
      description: "A stylish pink convertible car.",
    },
    {
      id: "5",
      name: "Sunglasses",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=300&q=80",
      category: "fashion",
      description: "Trendy sunglasses for a fashionable look.",
    },
    {
      id: "6",
      name: "Jewelry Set",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
      category: "fashion",
      description: "Elegant necklace and earrings set.",
    },
    {
      id: "7",
      name: "Mini Sofa",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      category: "house",
      description: "A comfortable miniature sofa for Barbie's house.",
    },
    {
      id: "8",
      name: "Kitchen Set",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&q=80",
      category: "house",
      description: "Complete kitchen set with appliances and utensils.",
    },
  ];

  // Filter accessories based on search query and category
  const filteredAccessories = accessories
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (item) =>
        selectedCategory === "all" || item.category === selectedCategory,
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
    if (eggBalance >= item.price) {
      onPurchase(item);
      // Clear cart after purchase
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setSelectedItem(item);
    }
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
                eggBalance={eggBalance}
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
                    eggBalance={eggBalance}
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
                      className="w-12 h-12 object-cover rounded-md"
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
                  disabled={totalCartPrice > eggBalance}
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
                      cart.forEach((item) => onPurchase(item));
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
    </div>
  );
};

interface AccessoryCardProps {
  item: AccessoryItem;
  onAddToCart: (item: AccessoryItem) => void;
  onPurchase: (item: AccessoryItem) => void;
  eggBalance: number;
}

const AccessoryCard = ({
  item,
  onAddToCart,
  onPurchase,
  eggBalance,
}: AccessoryCardProps) => {
  return (
    <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center text-sm font-bold">
          <Egg className="h-4 w-4 mr-1" />
          {item.price}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600">
              Buy Now
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
                disabled={eggBalance < item.price}
              >
                Purchase
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default AccessoryShop;
