<script setup>
   import { ref, onMounted,defineAsyncComponent } from 'vue';
   import { getMobileUsers, updateMobileUser, deleteUserPolicy} from '../api/mobileAppUsers';
   import { useDialog } from 'primevue/usedialog';
   const userView = defineAsyncComponent(() => import('../views/UserView.vue'));

   const dialog = useDialog();

   

   const handleRowClick = (event) => {
      console.log(event.data.value);
      const dialogRef = dialog.open(userView, {
         data:{
            user: event.data
         },
         props: {
               header: 'User Management > App Users',
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
      // Add more sample data as needed
    ]);
   const user = ref(null);
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);

   const editForm = ref({
      first_name: "",
      last_name: "",
      email: null,
      id: null,
      contact_nr: { name: "" },
      organisation: "",
   })

   onMounted(() => {
      getMobileUsers().then((data) => {
        userData.value = data;
      });
   });

   const editUser = (data) => {
      user.value = {...data};
      editDialog.value = true;
   };


   const deletePolicy = (policy_sid) => {
      spinner.value = true;
      const open_user = user.value.user_sid
      deleteUserPolicy({
         user_detail_fk: user.value.user_sid,
         policy_fk: policy_sid,
      })
      let updatedUsers = userData.value.map(user => {
         if (user.user_sid === open_user) {
            let updatedPolicies = user.active_policy.filter(policy => policy.policy_sid !== policy_sid);
            return {
                  ...user,
                  active_policy: updatedPolicies
            };
         }
         return user;
      });
      userData.value = updatedUsers
      editDialog.value = false;
      user.value = {};
   }

   const saveUser = async () => {
    console.log(user.value)
    saved.value = true;
    spinner.value = true;  

    try {
        await updateMobileUser({
            user_fk: user.value.user_sid,
            name: user.value.first_name,
            surname: user.value.last_name,
            email: user.value.email,
            id: user.value.id,
            mobile_number: user.value.contact_number,
            client_id: user.value.client_id
        });

        const data = await getMobileUsers();
        userData.value = data;
    } catch (error) {
        console.error("Error in saveUser:", error);
        // Handle your error here
    } finally {
        spinner.value = false;
        editDialog.value = false;
        user.value = {};
    }
};

   const closeDialog = () => {
      editDialog.value = false;
      saved.value = false;
   };



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
                     @row-click="handleRowClick"
                  >  
                     <Column sortable  field="first_name" header="Name"></Column>
                     <Column sortable  field="last_name" header="Surname"></Column>
                     <Column field="email" header="Email"></Column>
                     <Column field="contact" header="Contact"></Column>
                     <Column field="date_of_birth" header="Date Of Birth"></Column>
                     <Column field="gender" header="Gender"></Column>
                     <Column sortable  field="username" header="User Name"></Column>
                     <Column sortable  field="province" header="Province"></Column>

                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="User Details" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col-6">
                           <label for="client_id" class="bold-label">Client Internal Reference</label>
                           <InputText id="name" v-model.trim="user.client_id" required="true" autofocus :class="{'p-invalid': saved && !user.client_id}" />
                           <small class="p-error" v-if="saved && !user.client_id">Client is required.</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="name" class="bold-label">Name</label>
                           <InputText id="name" v-model.trim="user.first_name" required="true" autofocus :class="{'p-invalid': saved && !user.first_name}" />
                           <small class="p-error" v-if="saved && !user.first_name">Name is required.</small>
                        </div>
                        <div class="field col">
                           <label for="surname" class="bold-label">Surname</label>
                           <InputText id="name" v-model.trim="user.last_name" required="true" autofocus :class="{'p-invalid': saved && !user.last_name}" />
                           <small class="p-error" v-if="saved && !user.last_name">Surname is required.</small>
                        </div>
                     </div>
                     <div class="field">
                        <label for="email" class="bold-label">Email</label>
                        <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': saved && !user.email}" />
                        <small class="p-error" v-if="saved && !user.email">Email is required.</small>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="id" class="bold-label">ID</label>
                           <InputText id="id" v-model.trim="user.id" required="true" autofocus :class="{'p-invalid': saved && !user.id}" />
                           <small class="p-error" v-if="saved && !user.id">ID is required.</small>
                        </div>
                        <div class="field col">
                           <label for="contact_number" class="bold-label">Contact Number</label>
                           <InputText id="contact_number" v-model.trim="user.contact_number" required="true" autofocus :class="{'p-invalid': saved && !user.contact_number}" />
                           <small class="p-error" v-if="saved && !user.contact_number">Contact Number is required.</small>
                        </div>
                     </div>
                     <!-- <div class="field">
                        <label for="organisation" class="bold-label">Organisation</label>
                        <InputText id="organisation" v-model.trim="user.organisation" required="true" autofocus :class="{'p-invalid': saved && !user.organisation}" />
                        <small class="p-error" v-if="saved && !user.organisation">Organisation is required.</small>
                     </div> -->
                     <div class="field">
                        <DataTable :value="[user][0].active_policy" tableStyle="width: 390px">
                           <Column field="policy_name" header="Policy">
                              <template #body="slotProps">
                                 <span v-if="slotProps.data.policy_name.toLowerCase() === 'none'">No active policies</span>
                                 <span v-else>{{ slotProps.data.policy_name }}</span>
                              </template>
                           </Column>
                           <Column :exportable="false" style="min-width:8rem">
                              <template #body="slotProps">
                                 <Button 
                                    v-if="slotProps.data.policy_name.toLowerCase() !== 'none'"
                                    icon="pi pi-trash" 
                                    class="p-button-outlined p-button-rounded" 
                                    severity="danger" 
                                    @click="deletePolicy(slotProps.data.policy_sid)"
                                 />
                              </template>
                           </Column>
                        </DataTable>
                     </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
	</div>
</template>

