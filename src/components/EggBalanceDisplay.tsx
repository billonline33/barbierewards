import React from "react";
import { useEggBalance } from "@/hooks/useEggBalance";
import { Badge } from "@/components/ui/badge";
import { Egg } from "lucide-react";

export const EggBalanceDisplay = () => {
  const { eggBalance } = useEggBalance();

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 px-3 py-1 text-amber-500 border-amber-500"
    >
      <Egg className="h-4 w-4" />
      <span className="text-lg font-bold">{eggBalance}</span>
    </Badge>
  );
};
