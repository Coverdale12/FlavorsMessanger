import { createContext, useContext, useState } from 'react';

const PathContext = createContext();

export const usePath = () => useContext(PathContext)


export const PathProvider = ({ children }) => {
  const [nowPath, setPath] = useState("")
  
  return (
    <PathContext.Provider value={{ nowPath, setPath }}>
      {children}
    </PathContext.Provider>
  );
}

