<script setup>
   import { inject, onMounted, ref } from "vue";
   import ModerationCaseView from "./ModerationCaseView.vue";
   import ModerationReportedView from "./ModerationReportedView.vue";
   import ModerationReporterView from "./ModerationReporterView.vue"

   
   const dialogRef = inject('dialogRef');
   const mounted = ref(false);
   const report = ref({});

   onMounted(() => {
      report.value = dialogRef.value.data.report;
      mounted.value = true;
   })

   const closeDialog = () => {
      dialogRef.value.close();
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <TabView v-if="mounted">
            <TabPanel header="Case">
               <ModerationCaseView :report="report" />
            </TabPanel>
            <TabPanel header="Reported History">
               <ModerationReportedView :user="report.reporting_user" />
            </TabPanel>
            <TabPanel header="Reporter History">
               <ModerationReporterView :user="report.reported_user" />
            </TabPanel>
         </TabView>
      </div>
   </div>
</template>

<style scoped>
   
</style>