<script setup>

   import {defineAsyncComponent, onMounted, ref} from 'vue';
   import { useToast } from "primevue/usetoast";
   import { useConfirm } from "primevue/useconfirm";
   import {fetchPrivateMessages,sendMessage} from "@/api/privateMessage";
   import {fetchGroups} from "@/api/manageGroups";
   import {fetchMobileUsers} from "@/api/mobileAppUsers";
   import { useDialog } from 'primevue/usedialog';

   const dialog = useDialog()
   const advancedSearchView = defineAsyncComponent(() => import('../views/AdvancedSearch.vue'));


   const toast = useToast();
   const confirm = useConfirm();

   const isSearch =  ref(false);

   const addMessage = ref(false);
   const searchDialog = ref(false);


   const users = ref([]);
   const groups = ref([]);

   const validationErrors = ref({
     group_name: null,
     province: null,
     region: null,
     min_age: null,
     max_age: null,
     description: null,
     reason_for_creation:null
   });

   const validateCreateForm = () => {
     let isValid = true;
     // Reset validation errors
     validationErrors.value = {
       group: null,
       users: null,
       subject: null,
       message_body: null
     };




     if (!messageForm.value.group) {
       validationErrors.value.group = 'Group is required.';
       isValid = false;
     }

     if (!messageForm.value.users) {
       validationErrors.value.users = 'Users is required.';
       isValid = false;
     }

     if (!messageForm.value.subject) {
       validationErrors.value.subject = 'Subject is required.';
       isValid = false;
     }

     if (!messageForm.value.message_body) {
       validationErrors.value.message_body = 'Message is required.';
       isValid = false;
     }

     return isValid;
   };


   const clearSearchResults=async ()=>{

     fetchGroups().then((data)=>{
       groups.value = data;
     });
     isSearch.value = false;
     toast.add({ severity: 'success', summary: 'Success', detail: 'Retrieving Messages', life: 3000 });
   }

  const handleViewClick = () => {
    dialog.open(advancedSearchView, {
      data:{

      },
      props: {
        header: 'Advanced Search',
        style: {
          width: '50vw',
        },
        breakpoints:{
          '960px': '75vw',
          '640px': '90vw'
        },
        modal: true,

      },
      onClose: (options) => {

        searchMessages(options.data)

      }
    });
  }






  const confirm1 = () => {
      confirm.require({
          message: 'Would you like to send another message?',
          header: 'Message Sent!',

          rejectClass: 'p-button-secondary p-button-outlined',
          rejectLabel: 'No',
          acceptLabel: 'Yes',
          accept: () => {
              toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
              addMessage.value = true;

          },
          reject: () => {
              toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
  };


   const messages = ref([]);

    const messageForm = ref({
        group: null,
        users: null,
        subject: null,
        message_body: null
    });





   const searchMessages = async(searchForm)=>{
        //todo connect search endpoint
        try {

         searchDialog.value = false;
         toast.add({ severity: 'success', summary: 'Success', detail: 'Searching!!!', life: 3000 });
         isSearch.value = true;

          }
       catch (error) {
         console.error("Error in saveUser:", error);
         toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
       } finally {
     }
   }

   const sendNewMessage=async()=>{
     if (validateCreateForm()) {
       try {

         const payload = {
           groups: messageForm.value.group,
           users: messageForm.value.users,
           subject: messageForm.value.subject,
           message_body: messageForm.value.message_body
         }

         await sendMessage(payload)
         addMessage.value = false;
         confirm1();
         toast.add({severity: 'success', summary: 'Success', detail: 'Message Sent!!!', life: 3000});

       } catch (error) {
         console.error("Error in saveUser:", error);
         toast.add({
           severity: 'error',
           summary: 'Danger',
           detail: 'Error Deleting User, Please try again!!!',
           life: 3000
         });
       } finally {

       }
     }else{
       toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please check the form fields.', life: 3000 });
     }

   }


   onMounted(() => {
     fetchPrivateMessages().then((data) => {
       messages.value = data;
     });

     fetchMobileUsers().then((data)=>{
       users.value = data
     })

     fetchGroups().then((data) => {
       groups.value = data;
     });
   });



</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Private Messages</span>
                  <div >
                    <Button
                        class="mr-5"
                        label="Search"
                        icon="pi pi-search"
                        severity="info"
                        @click="handleViewClick"
                    />
                    <Button
                        label="New Message"
                        icon="pi pi-plus"
                        severity="info"
                        @click="addMessage=true"
                    />
                  </div>
               </div>

            </template>
            <template #content>

                <DataTable :value="messages" paginator :rows="5"   :rowsPerPageOptions="[5, 10, 20, 50]"  tableStyle="min-width: 50rem">
                    <Column field="date" sortable header="Date"></Column>
                    <Column field="recipients" sortable header="Recipients"></Column>
                    <Column field="subject" sortable header="Subject"></Column>
                    <Column field="received" sortable header="Received"></Column>
                    <Column field="opened" sortable header="Opened"></Column>
                    <Column field="messageType" sortable header="Message Type"></Column>
                </DataTable>



                <Dialog :dismissableMask="true" v-model:visible="addMessage" :style="{width: '450px'}" header="New Message" :modal="true" class="p-fluid">
                     <div class="form grid">
                        <div class="field col-12">
                           <label for="group_">Group</label>
                            <Dropdown id="group_" v-model="messageForm.group" :options="groups"  optionLabel="group_name" placeholder="Select Group" checkmark :highlightOnSelect="false" />
                            <template v-if="validationErrors.group">
                              <small style="color: red">{{ validationErrors.group }}</small>
                            </template>
                        </div>
                        <div class="field col-12">
                           <label for="user">Users</label>
                           <Dropdown id="user" v-model="messageForm.users" :options="users" optionLabel="username" placeholder="Select User"  />
                          <template v-if="validationErrors.group_name">
                            <small style="color: red">{{ validationErrors.group_name }}</small>
                          </template>
                        </div>

                        <div class="field col-12">
                           <label for="subject">Subject</label>
                           <InputText id="subject" placeholder="Subject" v-model.trim="messageForm.subject"  autofocus />
                            <template v-if="validationErrors.subject">
                              <small style="color: red">{{ validationErrors.subject }}</small>
                            </template>

                        </div>

                        <div class="field col-12">
                           <label for="body">Body</label>
                            <Textarea id="body" v-model="messageForm.message_body" autoResize />
                          <template v-if="validationErrors.message_body">
                            <small style="color: red">{{ validationErrors.message_body }}</small>
                          </template>
                        </div>

                     </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addMessage=false"/>
                        <Button label="Send" icon="pi pi-check" text @click="sendNewMessage" />
                     </template>
                  </Dialog>


                  <ConfirmDialog></ConfirmDialog>
            </template>
         </Card>
		</div>
    <div class="m-5 flex flex-row-reverse ">
      <Button @click="clearSearchResults" v-show="isSearch" label="Return To Search"/>
    </div>
	</div>
  <DynamicDialog />
</template>

