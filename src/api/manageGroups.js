import axios from "axios";

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchGroups = async () => {

    try {
       const response = await axios.get(`${HOST}/group/all`, {
          headers: {
             'Authorization': `Bearer ${BEARER_TOKEN}`,
             'Content-Type': 'application/json',
             'app-id': 1
          }
       });

       return response.data;
    }
    catch (error) {
       console.error("Error retrieving mobile user data:", error);
       throw error;
    }
};


export const createGroup = async (payload) => {

    try{
        await axios.post(`${HOST}/group/new`, payload, {
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
    }
};


export const editGroup = async (groupID,payload) => {

    try{
        await axios.put(`${HOST}/web/edit-group/${groupID}`, payload, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            },

        });
        return ("Successfully edited admin portal user")
    }
    catch (error) {
        console.error("Error editing  admin portal user:", error);
        throw error;
    }
};


export const getGroupInfo = async (groupID) => {

    try {
        const response = await axios.get(`${HOST}/group/${groupID}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            }
        });

        return response.data;
    }
    catch (error) {
        console.error("Error retrieving mobile user data:", error);
        throw error;
    }

};


export const deleteGroup = async (groupID,payload) => {

    try{
        await axios.post(`${HOST}/web/edit-group/${groupID}`, payload, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            },

        });
        return ("Successfully Deleted Group")
    }
    catch (error) {
        console.error("Error Deleting group:", error);
        throw error;
    }
};

export const fetchMetaData = async () => {

    try {
        const response = await axios.get(`${HOST}/group/metadata`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            }
        });

        return response.data;
    }
    catch (error) {
        console.error("Error retrieving metadata:", error);
        throw error;
    }
};
