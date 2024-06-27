import axios from "axios";

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchGroups = async () => {

    try {
       const response = await axios.get(`${HOST}/web/get-all-groups`, {
          headers: {
             'Authorization': `Bearer ${BEARER_TOKEN}`,
             'Content-Type': 'application/json',
             'app-id': 1
          }
       });

       console.log(response.data);
       return response.data;
    }
    catch (error) {
       console.error("Error retrieving mobile user data:", error);
       throw error;
    }
};


export const createGroup = async (payload) => {

    console.log("Create group!!!");
    /*try{
        await axios.post(`${HOST}/create-web-user`, payload, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            },

        });
        return ("Successfully created admin portal user")
    }
    catch (error) {
        console.error("Error creating admin portal user:", error);
        throw error;
    }*/
};


