import React, { createContext, useContext, useState} from 'react';

const ScaleContext = createContext<{ scale: string; setScale: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

export const ScaleProvider: React.FC = ({ children }) => {
    const [ scale, setScale ] = useState('system');
    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

export const useScale = () => {
    const context = useContext(ScaleContext);
    if (!context) {
        throw new Error('useScale must be used within a ScaleProvider')
    }
    return context;
};