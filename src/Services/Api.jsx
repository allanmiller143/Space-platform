/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import axios from 'axios';


const apiUrl = 'https://spaceimoveis-api-729fe2d11cef.herokuapp.com/';


export async function getData(url= '',token = '') {
  try {
    const response = await axios.get(`${apiUrl}${url}`,
      {headers: { 'ngrok-skip-browser-warning': '1', 'x-access-token': token, }}
    );
    const status = response.status;
    const userInfo = response.data;
    return {userInfo,status}
  } catch (error) {
    const message = error.response.data.message;
    const status = error.response.status;
    return { message, status };
  }
}

export async function putData(url = '', data = {}, token = '') {
  const response = await axios.put(`${apiUrl}${url}`, data, {headers: { 'Content-Type': 'application/json', 'x-access-token': token,} })  
    .then((response) => {
      const message = response.message;
      const status = response.status;
      const data = response.data;
      return { message, status,data };
    }).catch((error) => {
      const message = error.response.data.message;
      const status = error.response.status;
      return  {message, status };
    });
  return response;
}

export async function postData( url = '', data = {},token = '' ) {
  const response = await axios.post(`${apiUrl}${url}`, data, { headers: { 'Content-Type': 'application/json', 'x-access-token': token,'ngrok-skip-browser-warning': '1', } })
    .then((response) => {
      const message = response.message;
      const status = response.status;
      const data = response.data;
      return { message, status,data };
    }).catch((error) => {
      const message = error.response.data.message;
      const status = error.response.status;
      return  {message, status };
    });
  return response;
}

export async function postFormData(url = '', formData = {},token = '') {
  const response = await axios.post(`${apiUrl}${url}`, formData, { headers: { 'Content-Type': 'multipart/form-data', 'x-access-token': token } })
    .then((response) => {
      const message = response.message;
      const status = response.status;
      const data = response.data;
      return { message, status,data };
    }).catch((error) => {
      const message = error.response.data.message;
      const status = error.response.status;
      return  {message,status};
    });
  return response;
}


export async function postFormLoadingData(url = '', formData = {}, token = '', setLoading, setProgress) {
  try {
    setLoading(true); // Start loading

    const response = await axios.post(`${apiUrl}${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total || 1; // Fallback in case total is 0
        const currentProgress = Math.round((progressEvent.loaded * 100) / total);
        setProgress(currentProgress); // Update progress state
      },
    });

    setLoading(false); // Stop loading after completion
    return {data: response.data, status :response.status}; // Return the response data
  } catch (error) {
    setLoading(false); // Stop loading if there is an error
    const message = error.response?.data?.message || 'An error occurred';
    const status = error.response?.status || 500;
    return { message, status }; // Return error details
  }
}


export async function putFormData(url = '', formData = {}, token = '') {
  const response = await axios.put(`${apiUrl}${url}`, formData, { headers: { 'Content-Type': 'multipart/form-data', 'x-access-token': token } })  
    .then((response) => {
      const message = response.message;
      const status = response.status;
      const data = response.data;
      return { message, status };
    }).catch((error) => {
      const message = error.response.data.message;
      const status = error.response.status;
      return  {message, status };
    });

  return response;
}

export async function deleteData(url = '',token = '') {
  try {
    const response = await axios.delete(`${apiUrl}${url}`, {
      headers: { 'Content-Type': 'application/json','x-access-token': token }
    });
    const message = response.data.message;
    const status = response.status;
    return { message, status };
  } catch (error) {
    const message = error.response.data.message;
    const status = error.response.status;
    return { message, status };
  }
}
  








