<script setup>
   import { ref  } from 'vue';
   import { useToast } from "primevue/usetoast";
   import { useConfirm } from "primevue/useconfirm";

   const toast = useToast();
   const confirm = useConfirm();

   const addMessage = ref(false);
   const searchDialog = ref(false);


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


   const messages = [
      {
        date: '2024-05-01',
        recipients: ['John Doe', 'Jane Smith'],
        subject: 'Meeting Reminder',
        received: true,
        opened: true,
        messageType: 'Email'
      },
      {
        date: '2024-05-02',
        recipients: ['Alice Johnson'],
        subject: 'Project Update',
        received: true,
        opened: false,
        messageType: 'Email'
      },
      {
        date: '2024-05-03',
        recipients: ['Bob Williams'],
        subject: 'Urgent: Action Required',
        received: true,
        opened: true,
        messageType: 'Email'
      },
      {
        date: '2024-05-04',
        recipients: ['Emily Davis', 'Michael Brown'],
        subject: 'Weekly Newsletter',
        received: true,
        opened: true,
        messageType: 'Newsletter'
      },
      {
        date: '2024-05-05',
        recipients: ['Sam Wilson'],
        subject: 'Invitation to Webinar',
        received: true,
        opened: false,
        messageType: 'Email'
      }
    ]

    const cities = ref([
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ]);

    const messageForm = ref({
        group:[],
        users:[],
        subject:"",
        message_body:""
    });

    const searchForm = ref({
        group:'',
        date:'',
        username:"",
       email:''
    });

    const saveMessage = () => {
      addMessage.value = false;
      confirm1();
      console.log(messageForm.value);
   };

   const searchMessages = async()=>{

        console.log(searchForm.value);
        try {


         searchDialog.value = false;

         toast.add({ severity: 'success', summary: 'Success', detail: 'Searching!!!', life: 3000 });

          }
       catch (error) {
         console.error("Error in saveUser:", error);
         toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
       } finally {


     }

   }

   const sendMessage=async()=>{
      console.log(user.value);
      try {

         const payload ={
            email: user.value.email,
            password: "",
            is_active : 0
         }

         await deleteAdminPortalUser(user.value['sid'],payload);
         users.value  = await fetchAdminPortalUsers();



         toast.add({ severity: 'success', summary: 'Success', detail: 'User Deleted!!!', life: 3000 });
         confirmationDialogTitle.value = "Deleted successfully!";
         confirmationDialog.value = false;
         confirmationDialogClose.value= true;
      }
      catch (error) {
        console.error("Error in saveUser:", error);
        toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Deleting User, Please try again!!!', life: 3000 });
      } finally {

         spinner.value = false;
      }

   }


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
                        @click="searchDialog=true"
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

                <DataTable :value="messages"  tableStyle="min-width: 50rem">
                    <Column field="date" header="Date"></Column>
                    <Column field="recipients" header="Recipients"></Column>
                    <Column field="subject" header="Subject"></Column>
                    <Column field="received" header="Received"></Column>
                    <Column field="opened" header="Opened"></Column>
                    <Column field="messageType" header="Message Type"></Column>
                </DataTable>

                <Dialog :dismissableMask="true" v-model:visible="searchDialog" :style="{width: '450px'}" header="Advanced Search" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col-12">
                           <label for="username">Username</label>
                           <MultiSelect id="username" v-model="searchForm.username" :options="cities" optionLabel="name" placeholder="Select User Names" checkmark :highlightOnSelect="false" />

                        </div>
                        <div class="field col-12">
                           <label for="email">Email</label>
                           <MultiSelect id="email" v-model="searchForm.email" :options="cities" optionLabel="name" placeholder="Select Email"  />

                        </div>
                        <div class="field col-12">
                           <label for="group">Username</label>
                           <MultiSelect id="group" v-model="searchForm.group" :options="cities" optionLabel="name" placeholder="Select Groups"  />

                       </div>

                        <div class="field col-12">
                           <label for="date_range">Date Range</label>
                            <Calendar id="date_range" v-model="searchForm.date" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" />
                        </div>

                     </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="searchDialog=false"/>
                        <Button label="Search" icon="pi pi-search" text @click="searchMessages" />
                     </template>
                  </Dialog>



                <Dialog :dismissableMask="true" v-model:visible="addMessage" :style="{width: '450px'}" header="New Message" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col-12">
                           <label for="group_">Group</label>
                            <Dropdown id="group_" v-model="messageForm.group" :options="cities" optionLabel="name" placeholder="Select Group" checkmark :highlightOnSelect="false" />
                        </div>
                        <div class="field col-12">
                           <label for="user">Users</label>
                           <Dropdown id="user" v-model="messageForm.users" :options="cities" optionLabel="name" placeholder="Select User"  />
                        </div>

                        <div class="field col-12">
                           <label for="subject">Subject</label>
                           <InputText id="subject" placeholder="Subject" v-model.trim="messageForm.subject"  autofocus />

                        </div>

                        <div class="field col-12">
                           <label for="body">Body</label>
                            <Textarea id="body" v-model="messageForm.message_body" autoResize />

                        </div>

                     </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addMessage=false"/>
                        <Button label="Send" icon="pi pi-check" text @click="saveMessage" />
                     </template>
                  </Dialog>


                  <ConfirmDialog></ConfirmDialog>
            </template>
         </Card>
		</div>
	</div>
</template>

