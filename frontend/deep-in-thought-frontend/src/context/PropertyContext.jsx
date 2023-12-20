import { createContext, useContext, useState } from 'react';

const MyPropertyContext = createContext();

export const useMyPropertyContext = () => useContext(MyPropertyContext);

export const PropertyProvider = ({ children }) => {
    const [ownerProperties, setOwnerProperties] = useState([]);
    const [tenantProperty, setTenantProperty] = useState([]);

    // Function to add a property for the owner
    const addOwnerProperty = (property) => {
        setOwnerProperties([property]);
    };

    // Function to add a property for the tenant
    const addTenantProperty = property => {
        setTenantProperty(prevProperties => [...prevProperties, property]);
    };

    return (
        <MyPropertyContext.Provider value={{ 
            ownerProperties, 
            addOwnerProperty, 
            tenantProperty, 
            addTenantProperty 
        }}>
            {children}
        </MyPropertyContext.Provider>
    );
};
