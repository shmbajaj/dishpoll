import { useContext, useState, createContext } from "react";
import { useLocalStorage } from "hooks";

const UserContext = createContext();
const defaultState = {
  isLoggedIn: false,
  id: "",
  username: "",
  ranks: {
    rank1: "",
    rank2: "",
    rank3: "",
  },
  password: "",
};

function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(defaultState);
  const { setItem } = useLocalStorage();

  function getUserInfo(key) {
    return user[key];
  }

  function toggleUserLoggedIn() {
    setUser((p) => ({ ...p, isLoggedIn: !p.isLoggedIn }));
  }

  function updateUserInfo(userInfo) {
    setUser((p) => ({
      ...p,
      ...userInfo,
      isLoggedIn: true,
    }));
  }

  function updateRanks(rank, id) {
    const userCurrentSelectedDish = Object.entries(
      user.ranks
    ).find((e) => e[1] === id);

    if (user.ranks[rank] === id) {
      setUser((p) => ({
        ...p,
        ranks: { ...p.ranks, [rank]: "" },
      }));
    } else if (userCurrentSelectedDish) {
      setUser((p) => ({
        ...p,
        ranks: {
          ...p.ranks,
          [rank]: id,
          [userCurrentSelectedDish[0]]: "",
        },
      }));
    } else {
      setUser((p) => ({
        ...p,
        ranks: { ...p.ranks, [rank]: id },
      }));
    }
  }

  function updateUserInfoToLocalStorage() {
    setItem(user.username, user);
  }

  //on logout save user info
  function logoutUser() {
    updateUserInfoToLocalStorage();
    setUser(defaultState);
  }

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn: user.isLoggedIn,
        getUserInfo,
        updateUserInfo,
        updateUserInfoToLocalStorage,
        updateRanks,
        toggleUserLoggedIn,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useUser };
