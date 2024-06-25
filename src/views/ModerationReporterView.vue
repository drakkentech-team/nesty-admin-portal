<script setup>
   import { ref, defineProps } from "vue";
   import { checkProgressStatus } from "../utilities/moderation";


   const props = defineProps(["user"]); //do we receive username or id?
   const nameAndSurname = ref("Mia Summer"); //demo data
   const reports = ref([]);
   reports.value =  [
      {
         date_reported: '2024-05-01',
         reason_for_report: 'Lorem ipsum dolor sit amet',
         report_type: 'Type A',
         group: 'Group 1',
         date_posted: '2024-05-01',
         moderation_status: 'Pending'
      },
      {
         date_reported: '2024-05-05',
         reason_for_report: 'Consectetur adipiscing elit',
         report_type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-05-04',
         moderation_status: 'Resolved'
      },
      {
         date_reported: '2024-05-10',
         reason_for_report: 'Sed do eiusmod tempor incididunt',
         report_type: 'Type C',
         group: 'Group 1',
         date_posted: '2024-05-09',
         moderation_status: 'Overruled'
      },
      {
         date_reported: '2024-04-30',
         reason_for_report: 'Something or the other',
         report_type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-04-29',
         moderation_status: 'Open'
      },
      // Add more demo data as needed
   ]

   const checkProgressStatuses = () => {
      reports.value.forEach(report => {
         report.progressStatus = checkProgressStatus(report.moderation_status);
      });
   }

   checkProgressStatuses();
</script>

<template>
   <div class="p-grid my-2">
      <div class="p-col-12">
         <h5 class="font-semibold ml-3">User: {{ nameAndSurname }} ({{ user }})</h5>
         <DataTable
            :value="reports"
            tableStyle="min-width: 50rem"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            removableSort
         >
            <!-- <template #header>
               <div class="grid">
                  <span class="col">Username: {{ user }}</span>
                  <span class="col">Name and Surname: {{ nameAndSurname }}</span>
               </div>
            </template> -->

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
</template>