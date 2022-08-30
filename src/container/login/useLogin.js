import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "hooks";
import { useUser } from "context";

function useLogin() {
  const users = useRef([]);
  const [message, setMessage] = useState("");
  const { updateUserInfo } = useUser();
  const { isItemExists, getItem } = useLocalStorage();
  const ranks = {
    rank1: "",
    rank2: "",
    rank3: "",
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/syook/react-dishpoll/main/users.json"
        );
        users.current = await response.json();
      } catch (e) {
        setMessage(
          e?.message ?? "Failed to get users json."
        );
      }
    }
    getUsers();
  }, []);

  function getAndUpdateUserInfo(user) {
    if (isItemExists(user.username)) {
      const userInfo = getItem(user.username);
      //if user exist get from local storage and update to context
      updateUserInfo(userInfo);
    } else {
      updateUserInfo({ ...user, ranks });
    }
  }

  function onSubmit(event) {
    const userFormInput = { username: "", password: "" };
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [key, value] of formData.entries()) {
      userFormInput[key] = value;
    }
    const user = users.current.find(
      (user) =>
        user.username === userFormInput.username &&
        user.password === userFormInput.password
    );
    if (user) {
      getAndUpdateUserInfo(user);
    } else {
      setMessage(
        "Either username or password is incorrect"
      );
    }
  }

  return { onSubmit, message };
}

export { useLogin };
