<script setup>
import {ref, onMounted, defineAsyncComponent, computed} from 'vue';
   import { fetchMobileUsers} from '@/api/mobileAppUsers';
   import { useDialog } from 'primevue/usedialog';
   import {FilterMatchMode} from "primevue/api";
   const userView = defineAsyncComponent(() => import('../views/UserView.vue'));

   const dialog = useDialog();



   const handleRowClick = (event) => {
      console.log(event.data.value)
      dialog.open(userView, {
         data:{
            user: event.data
         },
         props: {
               header: 'View Groups',
               style: {
                  width: '90vw',
               },
               breakpoints:{
                  '960px': '75vw',
                  '640px': '90vw'
               },
               modal: true
         },
         onClose: (options) => {
         }
    });
}


   const userData = ref([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        contact: '123-456-7890',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        username: 'johndoe',
        province: 'California'
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        contact: '987-654-3210',
        date_of_birth: '1992-05-15',
        gender: 'Female',
        username: 'janedoe',
        province: 'New York'
      },
    ]);

   const filters = ref({
     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
     moderation_status: { value: null, matchMode: FilterMatchMode.IN }
   });

  const isFiltersEnabled = computed(() => {
    return filters.value['global'].value || filters.value['moderation_status'].value;
  })


onMounted(() => {
      fetchMobileUsers().then((data) => {
        userData.value = data;
      });
   });


</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
      <DynamicDialog />
			<Card>
            <template #title> Mobile App Users </template>
               <template #content>
                  <DataTable
                     :value="userData"
                     paginator :rows="5"
                     sortMode="multiple"
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                     removableSort
                     @row-click="handleRowClick"
                     filterDisplay="menu"
                     v-model:filters="filters"
                  >

                    <template #header>
                      <div class="flex justify-content-between">
                        <div class="flex justify-content-start">
                          <Button icon="pi pi-filter" outlined @click="toggleFPanel" />
                        </div>
                        <div class="flex justify-content-end gap-5">
                          <Button @click="clearFilters" label="Clear" v-show="isFiltersEnabled" />
                          <IconField iconPosition="left">
                            <InputIcon>
                              <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search" />
                          </IconField>
                        </div>
                      </div>
                    </template>
                     <Column sortable  field="first_name" header="Name"></Column>
                     <Column sortable  field="last_name" header="Surname"></Column>
                     <Column field="email" header="Email"></Column>
                     <Column field="contact" header="Contact"></Column>
                     <Column field="date_of_birth" header="Date Of Birth"></Column>
                     <Column field="gender" header="Gender"></Column>
                     <Column sortable  field="username" header="User Name"></Column>
                     <Column sortable  field="province" header="Province"></Column>

                  </DataTable>
               </template>
         </Card>
		</div>
	</div>
</template>

