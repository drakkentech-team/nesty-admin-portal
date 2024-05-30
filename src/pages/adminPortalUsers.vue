<script setup>
   
   import { ref, onMounted, vModelCheckbox } from 'vue';
   import { fetchAdminPortalUsers, createAdminPortalUser, updateAdminPortalUser ,deleteAdminPortalUser} from '../api/adminPortalUsers';
   import { useToast } from "primevue/usetoast";
   import ConfirmationDialogClose from '../components/ConfirmationDialogClose.vue';
   import ConfirmationDialog from '../components/ConfirmationDialog.vue'


   const users = ref([]);
   const user = ref(null);
   const addUsersDialog = ref(false);
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);
   const toast = useToast();
   const confirmationDialog = ref(false);
   const confirmationDialogClose = ref(false);
   const confirmationDialogTitle = ref('Are you sure?');
   const confirmationDialogBody = ref('Please confirm to proceed.');
   const callback = ref()

   components:['ConfirmationDialogClose', 'ConfirmationDialog']



   onMounted(() => {
      fetchAdminPortalUsers().then((data) => {
         users.value = data;
      });
   });

   const usersForm = ref({
      email: "",
      password: "",
      is_admin: 0
   })


   const isValidEmail = (email) =>{
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

   const editUser= async ()=>{
      
      try {
         
         const payload ={
            email: user.value.email,
            password: user.value.password,
            is_admin: (usersForm.value.is_admin)? 1:0,
            is_active : 1
         }


         await updateAdminPortalUser(user.value['sid'],payload);
         const data = await fetchAdminPortalUsers();
         users.value = data;

         toast.add({ severity: 'success', summary: 'Success', detail: 'User Updated!!!', life: 3000 });
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
        //confirmationDialogClose.value= true;
        //confirmationDialogTitle.value = "Error. Please try again!";
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000 });
      } finally {
        
         //confirmationDialogTitle.value = "Deleted successfully!";
         //confirmationDialog.value = false;
         //confirmationDialogClose.value= true;
         spinner.value = false;
      }

   }


   const confirmEditUser = (data) => {
      user.value = {...data};
      user.value.is_admin = (data.is_admin===1)? true:false;
      editDialog.value = true;
      
   };

   const saveEditUser = () => {
      editDialog.value = false;
      confirmationDialogTitle.value = "Update User";
      confirmationDialogBody.value = "Are you Sure you want to update user?";
      callback.value = editUser;
      confirmationDialog.value= true;
   
   };

   const confirmDeleteUser=(data)=>{
      user.value = {...data}
      confirmationDialogTitle.value = "Delete User";
      confirmationDialogBody.value = "Are you Sure you want to delete?";
      callback.value = deleteUser;
      confirmationDialog.value= true;
   
   }

   const deleteUser=async()=>{
      console.log(user.value);
      try {
         
         const payload ={
            email: user.value.email,
            password: "",
            is_active : 0
         }

         await deleteAdminPortalUser(user.value['sid'],payload);
            const data = await fetchAdminPortalUsers();
            users.value = data;


         toast.add({ severity: 'success', summary: 'Success', detail: 'User Deleted!!!', life: 3000 });
         confirmationDialogTitle.value = "Deleted successfully!";
         confirmationDialog.value = false;
         confirmationDialogClose.value= true;
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
        //confirmationDialogClose.value= true;
        //confirmationDialogTitle.value = "Error. Please try again!";
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Deleting User, Please try again!!!', life: 3000 });
      } finally {
         
         spinner.value = false;
      }

   }

   const confirmSaveUser = () => {
      //confirmationDialog.value= true;
      //callback.value = saveUser;
      saveUser()
   }

   const saveUser = async() => {
        try {
         await createAdminPortalUser({
            email: usersForm.value.email,
            password: usersForm.value.password,
            is_admin: usersForm.value.is_admin,
         });
         console.log(usersForm.value);
         const data = await fetchAdminPortalUsers();
         users.value = data;

         toast.add({ severity: 'success', summary: 'Success', detail: 'User Created!!!', life: 3000 });
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
        //confirmationDialogClose.value= true;
        //confirmationDialogTitle.value = "Error Please try again!";
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000 });
      } 
      finally {
        spinner.value = false;
        addUsersDialog.value = false;
        
        //confirmationDialogClose.value= true;
        //confirmationDialogTitle.value = "User Created successfully!";
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
			<Card>
            <template #title> 
            
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>User Management</span>
                  <Button 
                     label="Create User" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="addUsersDialog=true"
                  />
               </div>
            
            </template>
               <template #content>
                  <DataTable 
                     :value="users"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     
                     <Column field="email" header="Email"></Column>
                     <Column field="is_admin" header="User Role">

                        <template #body="slotProps">
                           {{ (slotProps.data.is_admin==1)? 'Admin': 'Standard' }}
                        </template>
                     
                     </Column>
                     <Column field="last_login" header="Last Login"></Column>
                    
                     <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="confirmEditUser(slotProps.data)" />
                           <Button :icon="'pi pi-trash'" outlined rounded  @click="confirmDeleteUser(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

               

                  <Dialog :dismissableMask="true" v-model:visible="addUsersDialog" :style="{width: '450px'}" header="Create User" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="email" class="bold-label">Email</label>
                           <InputText id="email" v-model.trim="usersForm.email"  autofocus :class="{'p-invalid':  !isValidEmail(usersForm.email)}" />
                           <small class="p-error" v-if=" !isValidEmail(usersForm.email)">email is required.</small>
                        </div>
            
                        <div class="field col-12">
                           <label for="password" class="bold-label">Password</label>
                           <Password id="password"  v-model.trim="usersForm.password" toggleMask required autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="saved && !usersForm.password">Password is required.</small>
                        </div>
                        
                           <div class="field col flex align-items-center justify-center">
                              <label for="admin" class="bold-label mr-3">Admin</label>
                              <Checkbox id="admin" type v-model="usersForm.is_admin" :binary="true"  autofocus  />
                           </div>
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addUsersDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="confirmSaveUser" />
                     </template>
                  </Dialog>


                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="Edit User" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="email" class="bold-label">Email</label>
                           <InputText disabled id="email" v-model.trim="user.email" required autofocus  />
                        </div>
            
                        <div class="field col-12">
                           <label for="password" class="bold-label">Current Password</label>
                           <Password id="password" type v-model.trim="user.current_password" required toggleMask autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="saved && !user.password">Password is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="password" class="bold-label">New Password</label>
                           <Password id="password" v-model.trim="user.password" required toggleMask autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="!user.password == user.current_password">Password is required.</small>
                        </div>
                        
                           <div class="field col flex align-items-center justify-center">
                              <label for="admin" class="bold-label mr-4">Admin </label>
                              <Checkbox id="admin" type v-model="user.is_admin" :binary="true"  autofocus  />
                           </div>

                     </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveEditUser" />
                     </template>
                  </Dialog>

               </template>
         </Card>
		</div>
	</div>

   <ConfirmationDialogClose :title="confirmationDialogTitle" :show="confirmationDialogClose" @confirm ="confirmationDialogClose=false"/>
   <ConfirmationDialog :title="confirmationDialogTitle" :body="confirmationDialogBody"  :show="confirmationDialog" @cancel ="confirmationDialog=false" @confirm="callback"/>
</template>

