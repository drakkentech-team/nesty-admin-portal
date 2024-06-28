<script setup>
import {onMounted, ref} from 'vue';
import {fetchGroupLifeCycleLogs} from "@/api/groupLifeCycleLog";
import {FilterMatchMode} from "primevue/api";


const logs = ref([]);
   const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
   });

   const fetchLogs = async () => {
     logs.value = await fetchGroupLifeCycleLogs();
   }

   onMounted(() => {
      fetchLogs();
   })
</script>

<template>
   <Card>
      <template #title>Group Life Cycle Log</template>
      <template #content>
         <div class="flex justify-content-end my-3">
            <IconField iconPosition="left">
               <InputIcon>
                  <i class="pi pi-search" />
               </InputIcon>
               <InputText v-model="filters['global'].value" placeholder="Search" />
            </IconField>
         </div>
         <DataTable
            :value="logs"
            tableStyle="min-width: 50rem"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            removableSort
            v-model:filters="filters"
            :globalFilterFields="['date', 'group_admin', 'group_name', 'action', 'reason']"
         >
            <Column field="date" header="Date" sortable></Column>
            <Column field="group_admin" header="Performed by" sortable></Column>
            <Column field="group_name" header="Group Name" sortable></Column>
            <Column field="action" header="Action" sortable></Column>
            <Column field="reason" header="Reason for Action" sortable></Column>
         </DataTable>
      </template>
   </Card>
</template>
