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
            <Column field="date" header="Edit Date" sortable></Column>
            <Column field="group_admin" header="Group Admin" sortable></Column>
            <Column field="group_name" header="Group Name" sortable></Column>
            <Column field="action" header="Action Taken" sortable></Column>
            <Column field="reason" header="Reason" sortable></Column>
         </DataTable>
      </template>
   </Card>
</template>
