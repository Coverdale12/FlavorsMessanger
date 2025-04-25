import { useEffect, useState } from "react";


export default function useLocalStorage(key, defData) {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData || defData
  });
  useEffect(() => {
    localStorage.setItem(key, state)
  }, [state])
  return [state, setState]
}