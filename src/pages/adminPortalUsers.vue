<script setup>

   import {ref, onMounted, computed} from 'vue';
   import { fetchAdminPortalUsers, createAdminPortalUser, updateAdminPortalUser ,deleteAdminPortalUser} from '@/api/adminPortalUsers';
   import { useToast } from "primevue/usetoast";
   import {FilterMatchMode} from "primevue/api";
   import ConfirmationDialog from "../components/ConfirmationDialog2.vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose2.vue"

   const users = ref([]);
   const user = ref();

   const addUsersDialog = ref(false);
   const editDialog = ref(false);
   const saved = ref(false);
   const toast = useToast();

   const showDeleteConfirmation = ref(false);
   const showIgnoreConfirmation = ref(false);


   const confirmDialogTitle = ref('');
   const confirmDialogMessage = ref('');
   const confirmedDialogMessage = ref('');
   const showDeleteConfirmed = ref(false);
   const showSaveConfirmed = ref(false);
   const showEditConfirmed = ref(false);

   const handleConfirm = () => {
     if (showDeleteConfirmation.value) {
        deleteUser();
     }
     closeConfirmDialog();
   }


   const closeConfirmDialog = () => {
     showConfirmDialog.value = false;
     confirmDialogTitle.value = '';
     confirmDialogMessage.value = '';
   }

   const showConfirmDialog = computed({
     get() {
       return showDeleteConfirmation.value
     },
     set(newValue) {
       if (newValue === false) {
         showIgnoreConfirmation.value = false;
         showDeleteConfirmation.value = false;
       }
     }
   })

   const showConfirmedDialog = computed({
     get() {
       return showDeleteConfirmed.value || showSaveConfirmed.value || showEditConfirmed.value;
     },
     set(newValue) {
       if (newValue === false) {
         showDeleteConfirmed.value = false;
         showSaveConfirmed.value = false;
         showEditConfirmed.value = false;
       }
     }
   })



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

   const validationErrors = ref({
     email: null,
   });

   const validateCreateForm = () => {
     let isValid = true;
     // Reset validation errors
     validationErrors.value = {
       email : null,
     };


     // Validate province
     if (!usersForm.value.email) {
       validationErrors.value.email = 'Email is required.';
       isValid = false;
     } else if (!isValidEmail(usersForm.value.email)) {
       validationErrors.value.email = 'Invalid Email.';
       isValid = false;
     }
     return isValid;
   };

   const editUser= async ()=>{

       try {
         const payload = {
           email: user.value.email,
           password: user.value.password,
           is_admin: (usersForm.value.is_admin) ? 1 : 0,
           is_active: 1
         }
         await updateAdminPortalUser(user.value['sid'], payload);
         users.value = await fetchAdminPortalUsers();

         confirmedDialogMessage.value = `<b>${user.value.email}</b> has been UPDATED `;
         showEditConfirmed.value  = true;
         editDialog.value = false;
         toast.add({severity: 'success', summary: 'Success', detail: 'User Updated!!!', life: 3000});

       } catch (error) {
         console.error("Error in saveUser:", error);
         toast.add({severity: 'error', summary: 'Danger', detail: 'Error Updating User, Please try again!!!', life: 3000});
       } finally {

       }
   }

   const selectEditUser = (event) => {
      user.value = {...event.data}
      user.value.is_admin = (user.value.is_admin===1);
      editDialog.value = true;
   };

   const confirmEditUser= ()=>{
      editUser();
   }



   const confirmDeleteUser=(data)=>{
     confirmDialogTitle.value = `Selected to DELETE \n<b>${data.email}</b>`;
     confirmDialogMessage.value = "This action is <b>permanent</b>, are you sure you want to continue?";
     user.value = data;
     showDeleteConfirmation.value = true;
   }



   const deleteUser=async()=>{

      try {

         const payload ={
            email: user.value.email,
            password: "",
            is_active : 0
         }

         await deleteAdminPortalUser(user.value['sid'],payload);
            users.value= await fetchAdminPortalUsers();

         toast.add({ severity: 'success', summary: 'Success', detail: 'User Deleted!!!', life: 3000 });
         confirmedDialogMessage.value = `<b>${user.value.email}</b> has been DELETED`;
         showDeleteConfirmed.value  = true;


      }
      catch (error) {
        console.error("Error in saveUser:", error);
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Deleting User, Please try again!!!', life: 3000 });
      } finally {
      }

   }

   const confirmSaveUser = () => {

     if(validateCreateForm()){
       saveUser()
     }else{
       toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please check the form fields.', life: 3000 });
     }

   }




const saveUser = async() => {
        try {
         await createAdminPortalUser({
            email: usersForm.value.email,
            password: usersForm.value.password,
            is_admin: usersForm.value.is_admin,
         });


          users.value = await fetchAdminPortalUsers();
          toast.add({ severity: 'success', summary: 'Success', detail: 'User Created!!!', life: 3000 });
          confirmedDialogMessage.value = `<b>${usersForm.value.email}</b> has been CREATED`;
          addUsersDialog.value = false;
          showSaveConfirmed.value = true;


      }
      catch (error) {
        console.error("Error in saveUser:", error);
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000 });
      }
      finally {

      }
   };

   const closeDialog = () => {
      editDialog.value = false;
      saved.value = false;
   };

   const filters = ref({
     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
   });

const isFiltersEnabled = computed(() => {
  return filters.value['global'].value || filters.value['moderation_status'].value;
})

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>

               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>User management > Portal Users</span>
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
                     :globalFilterFields="['email', 'group_admin', 'group_name', 'action', 'reason']"
                     data-key="sid"
                     selection-mode="single"
                     @rowClick="selectEditUser"

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

                     <Column field="email" header="Email"></Column>
                     <Column field="is_admin" header="User Role">

                        <template #body="slotProps">
                           {{ (slotProps.data.is_admin===1)? 'Admin': 'Standard' }}
                        </template>

                     </Column>
                     <Column field="last_login" header="Last Login"></Column>

                     <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button :icon="'pi pi-trash'" outlined rounded  @click="confirmDeleteUser(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>



                  <Dialog :dismissableMask="true" v-model:visible="addUsersDialog" :style="{width: '450px'}" header="Create User" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="email" class="bold-label">Email</label>
                           <InputText id="email" v-model.trim="usersForm.email"  autofocus :class="{'p-invalid':  !isValidEmail(usersForm.email)}" />
                          <template v-if="validationErrors.email">
                            <small style="color: red">{{ validationErrors.email }}</small>
                          </template>
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
                           <InputText disabled id="email" v-model.trim="user.email" autofocus  />
                        </div>

                        <div class="field col-12">
                           <label for="password" class="bold-label">Current Password</label>
                           <Password id="password" type="password" v-model.trim="user.current_password" required toggleMask autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="saved && !user.current_password">Password is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="password" class="bold-label">New Password</label>
                           <Password id="password" v-model.trim="user.password" required toggleMask autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="! user.password">Password is required.</small>
                        </div>

                           <div class="field col flex align-items-center justify-center">
                              <label for="admin" class="bold-label mr-4">Admin </label>
                              <Checkbox id="admin" type v-model="user.is_admin" :binary="true"  autofocus  />
                           </div>

                     </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="confirmEditUser" />
                     </template>
                  </Dialog>

               </template>
         </Card>
		</div>
    <ConfirmationDialog :title="confirmDialogTitle" :body="confirmDialogMessage"
                        :show="showConfirmDialog" @close="closeConfirmDialog" @confirm="handleConfirm" />
    <ConfirmationDialogClose :title="confirmedDialogMessage" buttonLabel="Close"
                             :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
	</div>



</template>

