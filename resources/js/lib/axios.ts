import axios from 'axios';

export async function axiosGet(url: string) {
  const token = localStorage.getItem('token');
  console.log("Este es el token: ", token)

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return response;
}

export async function axiosPost(url: string, data: any) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return response;
}

type DeleteOptions = {
  data?: any;
  headers?: Record<string, string>;
};

export async function axiosPut(url: string, data: any) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const response = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return response;
}
