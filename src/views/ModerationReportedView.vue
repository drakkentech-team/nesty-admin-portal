<script setup>
   import { ref, defineProps, onMounted } from "vue";
   import { checkProgressStatus } from "../utilities/moderation";


   const props = defineProps(['reports']);
   const nameAndSurname = ref();
   const username = ref();

   const checkProgressStatuses = () => {
      props.reports.forEach(report => {
         report.progressStatus = checkProgressStatus(report.moderation_status);
      });
   }

   onMounted(() => {
      checkProgressStatuses();
      nameAndSurname.value = props.reports[0].reported_user_name;
      username.value = props.reports[0].reported_user_username;
   })
</script>

<template>
   <div class="p-grid my-2">
      <div class="p-col-12">
         <h5 class="font-semibold ml-3">User: {{ nameAndSurname }} ({{ username }})</h5>
         <DataTable
            :value="reports"
            tableStyle="min-width: 50rem"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            removableSort
         >
            <Column field="date_reported" header="Date Reported" sortable></Column>
            <Column field="reason_for_report" header="Reason" sortable></Column>
            <Column field="report_type" header="Type" sortable></Column>
            <Column field="group" header="Group" sortable></Column>
            <Column field="date_posted" header="Date Posted" sortable></Column>
            <Column field="progressStatus" header="Status" sortable></Column>
            <Column field="moderation_status" header="Resolution" sortable></Column>
         </DataTable>
      </div>
   </div>

   <!-- <SuspensionView :user="user" :show="showSuspendDialog" @close="showSuspendDialog = false" /> -->
</template>