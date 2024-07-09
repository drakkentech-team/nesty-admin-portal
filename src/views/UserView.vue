<script setup>
   import {ref, onMounted, inject} from 'vue';
   import {fetchUserGroups} from '@/api/mobileAppUsers';
   import ModerationReportedView from "@/views/ModerationReportedView.vue";
   import {getUsersReportHistory} from "@/api/moderation";

   const reports = ref([]);
   const groups = ref([]);

   const dialogRef = inject('dialogRef');

   const user = ref(
    {
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        date_of_birth: '',
        gender: '',
        username: '',
        province: ''
      }
   );





   onMounted(() => {
     const params = dialogRef.value.data;
     user.value = params.user;

     const userID = params.user.sid;


     fetchUserGroups(userID).then((data) => {
       groups.value = data;
     }).catch((error) => {
       console.error("Error fetching user groups:", error);
     });

     getUsersReportHistory(0, userID).then((data) => {
       reports.value = data.reported_user;
       console.log("Reports fetched:", reports.value);
     }).catch((error) => {
       console.error("Error fetching user report history:", error);
     });
   });



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
                      <h5><b>First Name</b> : {{user.first_name}}</h5>
                      <h5><b>Gender</b> : {{user.gender}}</h5>
                      <h5><b>Date Of Birth</b> : {{user.email}}</h5>
                    </div>
                    <div class="col" >
                      <h5><b>Surname</b> : {{user.last_name}}</h5>
                      <h5><b>Cell</b> : {{user.mobile_number}}</h5>
                      <h5><b>Province</b> : {{user.province}}</h5>
                    </div>
                    <div>
                      <h5><b>Username</b> : {{user.username}}</h5>
                      <h5><b>Email</b> : {{user.email}}</h5>
                      <h5><b>Status</b> : {{user.status}}</h5>
                    </div>

                </div>

                <DataTable :value="groups"  paginator :rows="5" showGridlines tableStyle="min-width: 50rem">
                    <Column field="group_name" header="Group Name"></Column>
                    <Column field="location" header="Location"></Column>
                    <Column field="suburb" header="Suburb"></Column>
                    <Column field="privacy" header="Private/Public"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>

            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-history" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User History</span>
                    </div>
                </template>
                <ModerationReportedView :reports="reports"/>
            </TabPanel>
        </TabView>

    </div>


</template>



