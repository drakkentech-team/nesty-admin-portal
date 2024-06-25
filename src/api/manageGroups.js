import axios from "axios";

export const fetchGroups = async () => {

    return [
        {
            sid:1,
            name: "Tech Enthusiasts",
            long_description: "Public",
            suburb: "San Francisco",
            user_count: 120,
            status: "Active"
        },
        {
            sid:2,
            name: "Photography Club",
            long_description: "Private",
            suburb: "New York",
            user_count: 85,
            status: "Active"
        },
        {
            sid:3,
            name: "Fitness Freaks",
            long_description: "Public",
            suburb: "Los Angeles",
            user_count: 95,
            status: "Inactive"
        },
        {
            sid:4,
            name: "Bookworms Society",
            long_description: "Private",
            suburb: "Chicago",
            user_count: 60,
            status: "Active"
        },
        {
            sid:5,
            name: "Foodies Group",
            long_description: "Public",
            suburb: "Austin",
            user_count: 150,
            status: "Active"
        }
    ];
    /*try {
       const response = await axios.get(`${API_ENDPOINT}/get-mobile-app-users`, {
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
    }*/
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


