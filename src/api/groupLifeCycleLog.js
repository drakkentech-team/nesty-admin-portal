import axios from "axios"


const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchGroupLifeCycleLogs = async () => {
   try {
      const response = await axios.get(`${HOST}/group/life-cycle`,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
      if (response.data) {
         return response.data;
      } else {
         return [];
      }
   } catch (error) {
      console.error("Error fetching Group Life Cycle Log:", error);
      throw error;
   }


   // returning demo data. Uncomment above code to fetch from db
   // return logs;
}


// DEMO DATA
/* 
const logs = [
   {
      date: '2024-05-03',
      group_admin: 'Bianca',
      group_name: 'Tokai Boy Moms',
      action: 'Deleted',
      reason: 'Inactivity'
   },
   {
      date: '2024-05-02',
      group_admin: 'Wade',
      group_name: 'Claremont Girl Dads',
      action: 'Created',
      reason: 'Requested'
   },
   {
      date: '2024-05-01',
      group_admin: 'Standard 1',
      group_name: 'Blouberg Beach Babies',
      action: 'Edited',
      reason: 'Age range changed'
   },
   {
      date: '2024-04-30',
      group_admin: 'Bianca',
      group_name: 'Supportive Husbands',
      action: 'Created',
      reason: 'Requested'
   },
   // Add more demo data as needed
] */