import { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';


export default function useFetch(url, token = false) {
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
