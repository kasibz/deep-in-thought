import { createContext, useContext, useState } from "react"

const MyContext = createContext();
export const UserContext = () => useContext(MyContext)
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState([]);
    
    const addUser = (currentUser) => {
        setUser([...user, currentUser])
    };

    return (
        <MyContext.Provider value={{addUser, user}}>
            {children}
        </MyContext.Provider>
    )
}