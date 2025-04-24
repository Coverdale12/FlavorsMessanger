import { createContext, useContext, useState } from 'react';
import { getTodayDateFormatted } from '@global/Time';

const DateContext = createContext();

export const useDate = () => useContext(DateContext)


export const DateProvider = ({ children }) => {
  const [nowDate, setNowDate] = useState(getTodayDateFormatted())
  
  return (
    <DateContext.Provider value={{ nowDate, setNowDate }}>
      {children}
    </DateContext.Provider>
  );
}

