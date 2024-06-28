<script setup>
import {  ref, onMounted ,inject} from 'vue';
import { useToast } from "primevue/usetoast";


const toast = useToast();

const editable  = ref(false);

const options = ref({
  province : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],

  region : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],
  username : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],
  names: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],
  group: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],email : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],

})






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

const users = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    contact: '123-456-7890',
    region: 'North America',
    child_age_group: '0-3',
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    contact: '098-765-4321',
    region: 'Europe',
    child_age_group: '4-7',
  },
  {
    username: 'william_brown',
    email: 'william.brown@example.com',
    contact: '234-567-8901',
    region: 'Asia',
    child_age_group: '8-12',
  },
  {
    username: 'emma_jones',
    email: 'emma.jones@example.com',
    contact: '567-890-1234',
    region: 'South America',
    child_age_group: '13-18',
  },
  {
    username: 'michael_davis',
    email: 'michael.davis@example.com',
    contact: '890-123-4567',
    region: 'Australia',
    child_age_group: '0-3',
  }
];


const submitNewGroupDetails = () => {

  editable.value = false;
  toast.add({ severity: 'success', summary: 'Success', detail: 'Updated !!!', life: 3000 });
}






onMounted(() => {

});

</script>


<template>
  <div class="card">
    <Divider/>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span class="font-bold white-space-nowrap"></span>
      <Button icon="pi pi-pencil" rounded @click="editable=true" :disabled="editable" />
    </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col">
          <span><b>Group Name : </b>  {{user.first_name}}</span>
          <InputText :disabled="!editable" id="group_name" placeholder="Enter group name" v-model="user.group_name" aria-describedby="group-help" />
        </div>
        <div class="col" >
          <span><b>Number of Members : </b>  {{user.gender}}</span>
          <InputText :disabled="!editable" id="group_name" placeholder="Enter Number of Member" v-model="user.group_name" aria-describedby="group-help" />
        </div>

        <div class="col" >
          <span><b>Created : </b> </span>
          <InputText disabled id="date_created" placeholder="Enter Date Created" v-model="user.date_name" aria-describedby="group-help" />

        </div>

      </div>

    <Divider/>

    <div>
      <span><b>Province : </b></span>
      <Dropdown :disabled="!editable" id="province" v-model="user.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
    </div>
    <div class="my-5">
      <span><b>Region : </b></span>
      <Dropdown :disabled="!editable" id="region" v-model="user.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
    </div>

    <div class="flex justify-content-center m-5">
      <Button v-if="editable" label="Save" icon="pi pi-check" iconPos="right" @click="submitNewGroupDetails" />
    </div>
    <Divider/>

    <DataTable :value="users" paginator :rows="5" showGridlines sortMode="multiple" tableStyle="min-width: 50rem">
      <Column field="username"  sortable header="Username"></Column>
      <Column field="email"  sortable header="Email"></Column>
      <Column field="contact"  sortable header="Contact Number"></Column>
      <Column field="region"  sortable header="Region"></Column>
      <Column field="child_age_group"  sortable header="Child Age Group"></Column>
    </DataTable>
  </div>
</template>



