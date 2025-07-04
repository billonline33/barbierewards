import { useState, useEffect } from "react";

export const useEggBalance = (initialBalance: number = 50) => {
  const [eggBalance, setEggBalance] = useState<number>(initialBalance);

  // Load egg balance from localStorage on component mount
  useEffect(() => {
    const savedEggBalance = localStorage.getItem("eggBalance");
    if (savedEggBalance) {
      try {
        const parsedBalance = parseInt(savedEggBalance);
        setEggBalance(parsedBalance);
      } catch (error) {
        console.error("Error parsing saved egg balance:", error);
        setEggBalance(initialBalance);
      }
    } else {
      setEggBalance(initialBalance);
      localStorage.setItem("eggBalance", initialBalance.toString());
    }
  }, [initialBalance]);

  // Save egg balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("eggBalance", eggBalance.toString());
  }, [eggBalance]);

  const addEggs = (amount: number) => {
    setEggBalance((prevBalance) => prevBalance + amount);
  };

  const spendEggs = (amount: number) => {
    setEggBalance((prevBalance) => Math.max(0, prevBalance - amount));
  };

  const hasEnoughEggs = (amount: number) => {
    return eggBalance >= amount;
  };

  return {
    eggBalance,
    addEggs,
    spendEggs,
    hasEnoughEggs,
    setEggBalance,
  };
};
