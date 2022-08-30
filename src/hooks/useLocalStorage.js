function useLocalStorage() {
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  function clearStorage() {
    localStorage.clear();
  }
  function deleteItem(key) {
    localStorage.removeItem(key);
  }

  function isItemExists(key) {
    return localStorage.getItem(key) ? true : false;
  }

  return {
    setItem,
    getItem,
    clearStorage,
    deleteItem,
    isItemExists,
  };
}

export { useLocalStorage };
