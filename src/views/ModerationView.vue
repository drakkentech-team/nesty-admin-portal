<script setup>
   import { computed, inject, onMounted, ref } from "vue";
   import ModerationCaseView from "./ModerationCaseView.vue";
   import ModerationReportedView from "./ModerationReportedView.vue";
   import ModerationReporterView from "./ModerationReporterView.vue";
   import { getUsersReportHistory } from "../api/moderation";
   import { storeToRefs } from "pinia";
   import { useModerationStore } from "../stores/moderationStore";

   
   const { report } = storeToRefs(useModerationStore());
   
   const dialogRef = inject('dialogRef');
   const mounted = ref(false);
   const reportingUserReports = ref([]);
   const reportedUserReports = ref([]);

   onMounted(async () => {
      await fetchUsersReportHistory();
      mounted.value = true;
   })

   const closeDialog = () => {
      dialogRef.value.close();
   }

   const fetchUsersReportHistory = async () => {
      const reportHistory = await getUsersReportHistory(
         report.value.reporting_user_sid, report.value.reported_user_sid
      );
      reportingUserReports.value = reportHistory.reporting_user;
      reportedUserReports.value = reportHistory.reported_user;
   }
</script>

<template>
   <TabView v-if="mounted" style="height: 39vw;">
      <TabPanel header="Case">
         <ModerationCaseView :report="report" />
      </TabPanel>
      <TabPanel header="Reported History">
         <ModerationReportedView :reports="reportedUserReports" />
      </TabPanel>
      <TabPanel header="Reporter History">
         <ModerationReporterView :reports="reportingUserReports" />
      </TabPanel>
   </TabView>
</template>

<style scoped>
   
</style>