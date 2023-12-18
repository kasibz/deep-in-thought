import { createContext, useContext, useState } from 'react';

const MyPropertyContext = createContext();

export const useMyPropertyContext = () => useContext(MyPropertyContext);

export const PropertyProvider = ({ children }) => {
    const [ownerProperty, setOwnerProperty] = useState([]);
    const [tenantProperty, setTenantProperty] = useState([]);

    // Function to add a property for the owner
    const addOwnerProperty = property => {
        setOwnerProperty(prevProperties => [...prevProperties, property]);
    };

    // Function to add a property for the tenant
    const addTenantProperty = property => {
        setTenantProperty(prevProperties => [...prevProperties, property]);
    };

    return (
        <MyPropertyContext.Provider value={{ 
            ownerProperty, 
            addOwnerProperty, 
            tenantProperty, 
            addTenantProperty 
        }}>
            {children}
        </MyPropertyContext.Provider>
    );
};
