import axios from "axios";

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchModerationReports = async () => {
   try {
      const response = await axios.get(`${HOST}/get-moderation`,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
      if (response) {
         return response.data;
      } else {
         return [];
      }
   } catch (error) {
      console.error("Error retrieving Moderation Reports:", error);
      throw error;
   }

   // return reports.value;  // returning demo data. Uncomment above code to fetch from db
}


export const suspendBanUser = async (sid, payload) => {
   try {
      const response = await axios.post(`${HOST}/suspend-ban-user/${sid}`, payload,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
      return response.status
   } catch (error) {
      console.error("Error Suspending/Banning user:", error);
      throw error;
   }
}


export const deleteViolation = async (payload) => {
   try {
      const response = await axios.post(`${HOST}/delete-violation`, payload,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
   } catch (error) {
      console.error("Error Deleting Violation:", error);
      throw error;
   }


   // Editing demo data. Uncomment above for db data...
   // if (payload.hasOwnProperty("post_sid")) {
   //    for (let i = 0; i < reports.value.length; i++) {
   //       if (reports.value[i].post_sid === payload.post_sid) {
   //          reports.value.splice(i, 1);
   //          break;
   //       }
   //    }
   // }

   // if (payload.hasOwnProperty("comment_sid")) {
   //    for (let i = 0; i < reports.value.length; i++) {
   //       if (reports.value[i].comment_sid === payload.comment_sid) {
   //          reports.value.splice(i, 1);
   //          break;
   //       }
   //    }
   // }
}

export const updateStatus = async (sid, statusSid) => {
   try {
      const response = await axios.put(`${HOST}/update-moderation-status/${sid}/${statusSid}`,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
   } catch (error) {
      console.error("Error updating Moderation Status:", error);
      throw error;
   }


   // Editing demo data. Uncomment above for db data...
   // for (const report of reports.value) {
   //    if (report.moderation_sid === sid) {
   //       report.moderation_status_sid = statusSid;
   //       checkModStatus();
   //       break;
   //    }
   // }
}

export const getUsersReportHistory = async (reporter_sid, reported_sid) => {
   try {
      const response = await axios.get(`${HOST}/get-reporting-history/${reporter_sid}/${reported_sid}`,{
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
      console.error("Error Suspending/Banning user:", error);
      throw error;
   }
}


// DEMO DATA
/*
const demoReports = ref([
   {
      date_reported: '2024-05-01',
      reporting_user: 'John Doe',
      reported_user: 'Jane Smith',
      reason_for_report: 'Lorem ipsum dolor sit amet',
      report_type: 'Post',
      group: 'Group 1',
      date_posted: '2024-05-01',
      // moderation_status: 'Pending',
      post_body: 'Bleehhhhhhhhhhhhhh',
      comment_body: 'Demo comment 1',
      post_sid: 0,
      comment_sid: null,
      moderation_status_sid: 2,
      moderation_sid: 0,
      reported_user_sid: 0,
      reporting_user_sid: 0
   },
   {
      date_reported: '2024-05-05',
      reporting_user: 'Alice Johnson',
      reported_user: 'Bob Brown',
      reason_for_report: 'Consectetur adipiscing elit',
      report_type: 'Comment',
      group: 'Group 2',
      date_posted: '2024-05-04',
      // moderation_status: 'Resolved',
      post_body: 'Demo body 2',
      comment_body: 'Demo comment 2',
      post_sid: 1,
      comment_sid: 0,
      moderation_status_sid: 3,
      moderation_sid: 1,
      reported_user_sid: 1,
      reporting_user_sid: 1
   },
   {
      date_reported: '2024-05-10',
      reporting_user: 'Emily Davis',
      reported_user: 'Michael Wilson',
      reason_for_report: 'Sed do eiusmod tempor incididunt',
      report_type: 'Post',
      group: 'Group 1',
      date_posted: '2024-05-09',
      // moderation_status: 'Ignored',
      post_body: 'Demo body 3',
      comment_body: 'Demo comment 3',
      post_sid: 2,
      comment_sid: null,
      moderation_status_sid: 4,
      moderation_sid: 2,
      reported_user_sid: 2,
      reporting_user_sid: 2
   },
   {
      date_reported: '2024-04-30',
      reporting_user: 'Jane Doe',
      reported_user: 'Bob Brown',
      reason_for_report: 'Something or the other',
      report_type: 'Comment',
      group: 'Group 2',
      date_posted: '2024-04-29',
      // moderation_status: 'Open',
      post_body: 'Demo body 4',
      comment_body: 'Demo comment 4',
      post_sid: 3,
      comment_sid: 1,
      moderation_status_sid: 1,
      moderation_sid: 3,
      reported_user_sid: 1,
      reporting_user_sid: 3
   },
   // Add more demo data as needed
]);

const reports = ref(demoReports.value);   // mutable runtime demo data

const checkModStatus = () => {
   reports.value.forEach(report => {
      switch (report.moderation_status_sid) {
         case 1:
            report.moderation_status = "Open";
            break;
         case 2:
            report.moderation_status = "Pending";
            break;
         case 3:
            report.moderation_status = "Resolved";
            break;
         case 4:
            report.moderation_status = "Ignored";
      }
   });
}

checkModStatus();
 */
