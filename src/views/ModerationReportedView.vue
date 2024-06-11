<script setup>
   import { ref, defineProps } from "vue";
   import { checkProgressStatus } from "../utilities/moderation";
   import SuspensionView from "./SuspensionView.vue";


   const props = defineProps(["user"]); //do we receive username or id?
   const nameAndSurname = ref("Lilly Du Toit"); //demo data
   const showSuspendDialog = ref(false);
   const reports = ref([]);
   reports.value =  [
      {
         date: '2024-05-01',
         reason: 'Lorem ipsum dolor sit amet',
         type: 'Type A',
         group: 'Group 1',
         date_posted: '2024-05-01',
         status: 'Pending'
      },
      {
         date: '2024-05-05',
         reason: 'Consectetur adipiscing elit',
         type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-05-04',
         status: 'Resolved'
      },
      {
         date: '2024-05-10',
         reason: 'Sed do eiusmod tempor incididunt',
         type: 'Type C',
         group: 'Group 1',
         date_posted: '2024-05-09',
         status: 'Overruled'
      },
      {
         date: '2024-04-30',
         reason: 'Something or the other',
         type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-04-29',
         status: 'Open'
      },
      // Add more demo data as needed
   ]

   const checkProgressStatuses = () => {
      reports.value.forEach(report => {
         report.progressStatus = checkProgressStatus(report.status);
      });
   }

   checkProgressStatuses();
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <DataTable
            :value="reports"
            tableStyle="min-width: 50rem"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            removableSort
         >
            <template #header>
               <div class="grid">
                  <div class="col-9 flex gap-8">
                     <span>Username: {{ user }}</span>
                     <span>Name and Surname: {{ nameAndSurname }}</span>
                  </div>
                  <Button @click="showSuspendDialog = true" outlined class="col-3 justify-content-center">Suspend Reported User</Button>
               </div>
            </template>

            <Column field="date" header="Date Reported" sortable></Column>
            <Column field="reason" header="Reason" sortable></Column>
            <Column field="type" header="Type" sortable></Column>
            <Column field="group" header="Group" sortable></Column>
            <Column field="date_posted" header="Date Posted" sortable></Column>
            <Column field="progressStatus" header="Status" sortable></Column>
            <Column field="status" header="Resolution" sortable></Column>
         </DataTable>
      </div>
   </div>

   <SuspensionView :user="user" :show="showSuspendDialog" @close="showSuspendDialog = false" />
</template>