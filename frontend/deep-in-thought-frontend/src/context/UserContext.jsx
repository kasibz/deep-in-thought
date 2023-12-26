import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const UserContext = () => useContext(MyContext);
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize state based on localStorage data
    const ownerId = localStorage.getItem("ownerId");
    const tenantId = localStorage.getItem("tenantId");
    if (ownerId) {
      return [{ ownerId }];
    } else if (tenantId) {
      return [{ tenantId }];
    }
    return [];
  });

  const addUser = (currentUser) => {
    setUser([currentUser]);
  };
  const deleteUser = () => {
    setUser([]);
  };
  return (
    <MyContext.Provider value={{ addUser, user, deleteUser }}>
      {children}
    </MyContext.Provider>
  );
};
