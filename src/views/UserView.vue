<script setup>
   import { computed, ref, onMounted ,inject} from 'vue';
   import { createNews, getNews, updateNews } from '../api/news';
   import { useToast } from "primevue/usetoast";
   import { getMobileUsers } from '../api/mobileAppUsers';
   import { todayDate } from "../utilities/common"
   
   const toast = useToast();

   const dialogRef = inject('dialogRef');
   const user = ref(
    { 
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        contact: '123-456-7890',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        username: 'johndoe',
        province: 'California'
      }
   );

   onMounted(() => {
        const params = dialogRef.value.data; 
        user.value = params;
    })




 const reports =  [
      {
        date: '2024-05-01',
        reported_by: 'John Doe',
        posted_by: 'Jane Smith',
        reason: 'Lorem ipsum dolor sit amet',
        type: 'Type A',
        group: 'Group 1',
        date_posted: '2024-05-02',
        status: 'Pending'
      },
      {
        date: '2024-05-05',
        reported_by: 'Alice Johnson',
        posted_by: 'Bob Brown',
        reason: 'Consectetur adipiscing elit',
        type: 'Type B',
        group: 'Group 2',
        date_posted: '2024-05-06',
        status: 'Approved'
      },
      {
        date: '2024-05-10',
        reported_by: 'Emily Davis',
        posted_by: 'Michael Wilson',
        reason: 'Sed do eiusmod tempor incididunt',
        type: 'Type C',
        group: 'Group 1',
        date_posted: '2024-05-12',
        status: 'Rejected'
      },
      // Add more demo data as needed
    ]



</script>


<template>
    <div class="card">
        
  
        <TabView class="tabview-custom">
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-id-card" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User Details</span>
                    </div>
                </template>
                <div class="grid grid-cols-3 gap-4">
                    <div class="col">
                        <h4>First Name : {{user.first_name}}</h4>
                        <h4>Gender : {{user.gender}}</h4>
                        <h4>Date Of Birth : {{user.email}}</h4>
                    </div>
                    <div class="col" >
                        <h4>Surname : {{user.last_name}}</h4>
                        <h4>Cell : {{user.contact}}</h4>
                        <h4>Province : {{user.province}}</h4>
                    </div>
                    <div>
                        <h4>Username : {{user.username}}</h4>
                        <h4>Email : {{user.email}}</h4>
                        <h4>Status : {{user.status}}</h4>
                    </div>
                    
                </div>

                <DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
                    <Column field="code" header="Group Name"></Column>
                    <Column field="name" header="Loacation"></Column>
                    <Column field="category" header="Suburb"></Column>
                    <Column field="quantity" header="Private/Public"></Column>
                    <Column field="quantity" header="Status"></Column>
                </DataTable>

            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-history" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User History</span>
                    </div>
                </template>

                <DataTable :value="reports" showGridlines tableStyle="min-width: 50rem">
                    <Column field="date" header="Date"></Column>
                    <Column field="reported_by" header="Reported By"></Column>
                    <Column field="posted_by" header="Posted By"></Column>
                    <Column field="reason" header="Reason"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="group" header="Group"></Column>
                    <Column field="date_posted" header="Date Posted"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
                
            </TabPanel>
        </TabView>
    </div>
</template>



