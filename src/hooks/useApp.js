import { useUser } from "context";
import { useLocalStorage } from "./useLocalStorage";

function useApp() {
  const { getUserInfo, logoutUser } = useUser();
  const { getItem, setItem } = useLocalStorage();
  const ranks = getUserInfo("ranks");

  function logoutHandler() {
    updateDishesToLocalStorage(ranks);
    logoutUser();
  }

  function transformDishes(dishes) {
    const ranksEntries = Object.entries(ranks);
    const transformedDishes = dishes.map((dish) => {
      const item = ranksEntries.find(
        (rank) => rank[1] === dish.id
      );
      const rank = item ? item[0] : "";
      const isAlreadyVoted = item ? true : false;
      return { ...dish, rank, isAlreadyVoted };
    });
    return transformedDishes;
  }

  function updateDishesToLocalStorage(currentRanks) {
    const localStoragedishes = getItem("dishes");

    if (isObjectEmpty(localStoragedishes)) {
      const selectedDishes = Object.entries(currentRanks);
      const updatedDishes = selectedDishes.reduce(
        (acc, [rank, id]) => {
          if (id === "") {
            return acc;
          }
          let dish = { [id]: 0 };
          dish[id] = getPoint(rank);
          return { ...acc, ...dish };
        },
        {}
      );
      setItem("dishes", updatedDishes);
    } else {
      const username = getUserInfo("username");
      const user = getItem(username);
      const previousRanks = user?.ranks ?? {
        rank1: "",
        rank2: "",
        rank3: "",
      };
      const updatedDishes = Object.keys(
        previousRanks
      ).reduce(
        (acc, key) =>
          updatedDishPoint(
            acc,
            currentRanks[key],
            previousRanks[key],
            key
          ),
        localStoragedishes
      );

      setItem("dishes", updatedDishes);
    }
  }

  function updatedDishPoint(
    dishes,
    currentId,
    previousId,
    rank
  ) {
    if (currentId === previousId) {
      return { ...dishes };
    }
    const point = getPoint(rank);
    const updatedDishes = { ...dishes };
    if (currentId) {
      updatedDishes[currentId] = dishes[currentId]
        ? dishes[currentId] + point
        : point;
    }
    if (previousId) {
      updatedDishes[previousId] -= point;
    }

    return updatedDishes;
  }

  function getPoint(rank) {
    return rank === "rank1"
      ? 30
      : rank === "rank2"
      ? 20
      : 10;
  }

  function isObjectEmpty(object) {
    return Object.keys(object).length < 1 ? true : false;
  }

  return {
    logoutHandler,
    updateDishesToLocalStorage,
    transformDishes,
  };
}

export { useApp };
