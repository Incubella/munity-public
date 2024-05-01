export const addressEllipsis = (address, length = 5) => {
  // console.log("addressEllipsis",address)
  if (!address || address == "" || address.length < length) {
    return address;
  }

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};

export const getLocalItem = (key, defaultValue, isJson = false) => {
  if (typeof window === "undefined") {
    return defaultValue; // Return default value or null if window is not defined
  }
  const value =
    window.localStorage.getItem(key) || (isJson ? "{}" : defaultValue);
  return isJson ? JSON.parse(value) : value;
};

export const setLocalItem = (key, value, isJson = false) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
  }
};

export const clearLocalItems = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};