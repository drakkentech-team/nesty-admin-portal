<script setup>
   import { inject, onMounted, ref } from "vue";
   import ConfirmationDialog2 from "../components/ConfirmationDialog2.vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose.vue"
   import { useConfirm } from "primevue/useconfirm";
   import ModerationCaseView from "./ModerationCaseView.vue";
   import ModerationReportedView from "./ModerationReportedView.vue";
   import ModerationReporterView from "./ModerationReporterView.vue"

   
   // components:["ModerationCaseView", "ModerationReportedView", "ModerationReporterView"];
   
   const dialogRef = inject('dialogRef');
   const mounted = ref(false);
   const report = ref({});

   onMounted(() => {
      report.value = dialogRef.value.data.report;
      // checkProgressStatus();
      mounted.value = true;
   })

   const closeDialog = () => {
      dialogRef.value.close();
   }

   // const checkProgressStatus = () => {
   //    const reportStatus = report.value.status;
   //    if (reportStatus === "Open") {
   //       report.value.progressStatus = "Open";
   //    } else if (reportStatus === "Pending") {
   //       report.value.progressStatus = "In Progress";
   //    } else {
   //       report.value.progressStatus = "Resolved";
   //    }
   // }

</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <TabView v-if="mounted">
            <TabPanel header="Case">
               <ModerationCaseView :report="report" />
            </TabPanel>
            <TabPanel header="Reported History">
               <ModerationReportedView :user="report.reported_by" />
            </TabPanel>
            <TabPanel header="Reporter History">
               <ModerationReporterView :user="report.posted_by" />
            </TabPanel>
         </TabView>
      </div>
   </div>

   <ConfirmationDialog2 :title="''" :body="ignoreConfirmationmessage"
      :show="showIgnoreConfirmation" @cancel="handleCancel" @confirm="handleConfirm" />
   <ConfirmationDialogClose :show="showConfirmedDialog" />

</template>

<style scoped>
   .tst {
      border: 2px solid black;
      width: auto;
      height: 100%;
   }
   
</style>