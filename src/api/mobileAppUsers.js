const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchMobileUsers = async () => {

   return [
      {
         first_name: 'John',
         last_name: 'Doe',
         email: 'john.doe@example.com',
         contact: '123-456-7890',
         date_of_birth: '1990-01-01',
         gender: 'Male',
         username: 'johndoe',
         province: 'California'
      },
      {
         first_name: 'Jane',
         last_name: 'Doe',
         email: 'jane.doe@example.com',
         contact: '987-654-3210',
         date_of_birth: '1992-05-15',
         gender: 'Female',
         username: 'janedoe',
         province: 'New York'
      },
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


export const fetchUserGroups = async (userID) => {

   const groups = [
      {
         group_name: 'Adventure Enthusiasts',
         location: 'Mount Everest Base Camp',
         suburb: 'Solukhumbu',
         privacy: 'Private',
         status: 'Active'
      },
      {
         group_name: 'Book Club',
         location: 'Central Library',
         suburb: 'Downtown',
         privacy: 'Public',
         status: 'Active'
      },
      {
         group_name: 'Tech Innovators',
         location: 'Tech Park',
         suburb: 'Innovation District',
         privacy: 'Public',
         status: 'Pending'
      },
      {
         group_name: 'Yoga Circle',
         location: 'Sunny Meadows Park',
         suburb: 'Green Valley',
         privacy: 'Private',
         status: 'Cancelled'
      },
      // ... additional group objects
   ];

   return groups;
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




export const fetchUserHistory = async (userID) => {

   const reports =  [
      {
         date: '2024-05-01',
         reported_by: 'John Doe',
         posted_by: 'Jane Smith',
         reason: 'Lorem ipsum dolor sit amet',
         type: 'Type A',
         group: 'Group 1',
         date_posted: '2024-05-02',
         status: 'Pending'
      },
      {
         date: '2024-05-05',
         reported_by: 'Alice Johnson',
         posted_by: 'Bob Brown',
         reason: 'Consectetur adipiscing elit',
         type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-05-06',
         status: 'Approved'
      },
      {
         date: '2024-05-10',
         reported_by: 'Emily Davis',
         posted_by: 'Michael Wilson',
         reason: 'Sed do eiusmod tempor incididunt',
         type: 'Type C',
         group: 'Group 1',
         date_posted: '2024-05-12',
         status: 'Rejected'
      },
   ]

   return reports;
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



