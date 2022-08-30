import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { useUser } from "./Users.context";
import { useLocalStorage, useApp } from "hooks";

const DishesContext = createContext();

function useDishes() {
  return useContext(DishesContext);
}

function DishesProvider({ children }) {
  const [dishes, setDishes] = useState([]);
  const [renderedDishes, setRenderedDishes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("dishes");
  const { getUserInfo, updateUserInfoToLocalStorage } =
    useUser();
  const { isItemExists, getItem, setItem } =
    useLocalStorage();
  const { updateDishesToLocalStorage, transformDishes } =
    useApp();
  const ranks = getUserInfo("ranks");

  useEffect(() => {
    async function initializeDishes() {
      try {
        setStatus("loading");
        const response = await fetch(
          "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
        );
        const data = await response.json();
        const dishes = data.map((dish) => ({
          ...dish,
          rank: "",
          isAlreadyVoted: false,
        }));
        setDishes(dishes);
        setRenderedDishes(dishes);
        setTimeout(() => setStatus("success"), 1000);
      } catch (e) {
        setStatus("failed");
      }
    }
    initializeDishes();
    if (!isItemExists("dishes")) {
      setItem("dishes", {});
    }
  }, []);

  useEffect(() => {
    const dishes = transformDishes(renderedDishes);
    setRenderedDishes(dishes);
  }, [ranks]);

  useEffect(() => {
    setStatus("loading");
    if (activeTab === "rankings") {
      const dishesInLocalStorage = getItem("dishes");
      const dishesWithPoints = renderedDishes.map(
        (dish) => {
          const points = dishesInLocalStorage[dish.id];
          return { ...dish, points: points ?? 0 };
        }
      );
      const sortedDishes = dishesWithPoints.sort(
        (a, b) => b.points - a.points
      );
      setRenderedDishes(sortedDishes);
    } else {
      const unsortedDishes = transformDishes(dishes);
      setRenderedDishes(unsortedDishes);
    }
    setTimeout(() => setStatus("success"), 2000);
  }, [activeTab]);

  function getDishes() {
    return renderedDishes;
  }

  function getActiveTab() {
    return activeTab;
  }

  function getStatus() {
    return status;
  }

  function updateActiveTab(value) {
    if (value === "rankings") {
      updateDishesToLocalStorage(ranks);
      updateUserInfoToLocalStorage();
    }
    setActiveTab(value);
  }

  return (
    <DishesContext.Provider
      value={{
        getDishes,
        getActiveTab,
        getStatus,
        updateActiveTab,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
}

export { useDishes, DishesProvider };
