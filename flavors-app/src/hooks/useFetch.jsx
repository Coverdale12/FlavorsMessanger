import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';


export const useFetch = (url) => {
  const [token, _] = useLocalStorage("access_token")
  const [state, setState] = useState({ loading: true })
  const headers = token ? {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  } : ""

  useEffect(() => {
    axios.get(url, headers)
      .then(resp => resp.data)
      .then(data => setState({ data: data }))
      .catch(err => setState({ error: err }))
  }, [url]);

  return state;
};