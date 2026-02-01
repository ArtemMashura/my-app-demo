import axios from "axios";

const HOST = import.meta.env.VITE_HOST
if (!HOST) {
  console.error(
    'HOST is not defined! Please check your environment variables.'
  );
}

const privateInstance = axios.create({
  baseURL: HOST,
  withCredentials: false, // Для авторизованных запросов
  headers: {
    'Access-Control-Allow-Origin': '*', // Временно разрешить все источники
  },
});

privateInstance.interceptors.response.use(
  (response) => {
    console.log(
      `Response: ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `Response Error ${error.response.status}: ${error.response.data}`
      );
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiPrivate = privateInstance;
