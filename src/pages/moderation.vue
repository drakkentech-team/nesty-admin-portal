<script setup>
   import { ref } from "vue";
   import { FilterMatchMode } from "primevue/api";


   const reports = ref([]);
   reports.value =  [
      {
         date: '2024-05-01',
         reported_by: 'John Doe',
         posted_by: 'Jane Smith',
         reason: 'Lorem ipsum dolor sit amet',
         type: 'Type A',
         group: 'Group 1',
         date_posted: '2024-05-01',
         status: 'Pending'
      },
      {
         date: '2024-05-05',
         reported_by: 'Alice Johnson',
         posted_by: 'Bob Brown',
         reason: 'Consectetur adipiscing elit',
         type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-05-04',
         status: 'Approved'
      },
      {
         date: '2024-05-10',
         reported_by: 'Emily Davis',
         posted_by: 'Michael Wilson',
         reason: 'Sed do eiusmod tempor incididunt',
         type: 'Type C',
         group: 'Group 1',
         date_posted: '2024-05-09',
         status: 'Rejected'
      },
      {
         date: '2024-04-30',
         reported_by: 'Jane Doe',
         posted_by: 'Bob Brown',
         reason: 'Something or the other',
         type: 'Type B',
         group: 'Group 2',
         date_posted: '2024-04-29',
         status: 'Open'
      },
      // Add more demo data as needed
   ]
   
   const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
   });

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
      var statusOrder = sortStatuses(a.status, b.status);
      var dateOrder = new Date(a.date) - new Date(b.date);
      return -statusOrder || -dateOrder;
   }

   reports.value.sort((a, b) => defaultOrder(a, b));
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <Card>
            <template #title> Moderation </template>
            <template #content>
               <DataTable 
                  :value="reports"
                  tableStyle="min-width: 50rem"
                  paginator
                  :rows="5"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                  removableSort
                  v-model:filters="filters"
                  :globalFilterFields="['date', 'reported_by', 'posted_by', 'reason', 'type',
                     'group', 'date_posted', 'status'
                  ]"
            >
               <template #header>
                  <div class="flex justify-content-end">
                     <IconField iconPosition="left">
                        <InputIcon>
                           <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search" />
                     </IconField>
                  </div>
               </template>
               <Column field="date" header="Date Reported" sortable></Column>
               <Column field="reported_by" header="Reported By" sortable></Column>
               <Column field="posted_by" header="Posted By" sortable></Column>
               <Column field="reason" header="Reason" sortable></Column>
               <Column field="type" header="Type" sortable></Column>
               <Column field="group" header="Group" sortable></Column>
               <Column field="date_posted" header="Date Posted" sortable></Column>
               <Column field="status" header="Status" sortable></Column>
            </DataTable>
            </template>
         </Card>
      </div>
   </div>
</template>