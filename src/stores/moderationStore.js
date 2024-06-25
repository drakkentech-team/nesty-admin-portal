import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchModerationReports } from "../api/moderation";


export const useModerationStore = defineStore("moderationStore", () => {
   // const reloadRequired = ref(false);
   const reports = ref([]);
   const openStatusCount = ref(0);

   const fetchReports = () => {
      fetchModerationReports().then((data) => {
         reports.value = data;
         sortReports();
         countStatuses();
      });
   }
   
   const sortStatuses = (a, b) => {
      const status0 = "Open";
      const status1 = "Pending";

      if (a === b) {
         return 0;
      } else if (a === status0) {
         return 1;
      } else if (b === status0 || b === status1) {
         return -1;
      } else if (a === status1) {
         return 1;
      } else {
         return 0;
      };
   }

   const defaultOrder = (a, b) => {
      const statusOrder = sortStatuses(a.moderation_status, b.moderation_status);
      const dateOrder = new Date(a.date_reported) - new Date(b.date_reported);
      return -statusOrder || -dateOrder;
   }

   const sortReports = () => {
      reports.value.sort((a, b) => defaultOrder(a, b));
   }

   const countStatuses = () => {
      openStatusCount.value = 0;
      reports.value.forEach(report => {
         const status = report.moderation_status;
         if (status === "Open") {
            openStatusCount.value++;
         // } else if (status === "Pending") {
         //    pendingStatusCount.value++;
         } else {
            return;
         }
      });
   }

   fetchReports();

   return { reports, openStatusCount, fetchReports };
})