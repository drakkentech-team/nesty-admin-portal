import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const login = async (payload) => {
   try {
      const response = await axios.post(`${API_ENDPOINT}/web-login`, payload, {
         headers: {
         //   'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
         }
      });
      return response;
   } 
   catch (error) {
      console.error("Error during login:", error);
      throw error;
   }
};
