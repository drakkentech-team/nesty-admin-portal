<script setup>
import {  ref, onMounted ,inject} from 'vue';

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

}




onMounted(() => {

});

</script>


<template>
  <div class="card">

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span class="font-bold white-space-nowrap"></span>
      <Button icon="pi pi-pencil" rounded @click="editable=true" :disabled="editable" />
    </div>
    <Divider/>


      <div class="grid grid-cols-3 gap-4">
        <div class="col">
          <h4><b>Group Name</b>  {{user.first_name}}</h4>
          <InputText :disabled="!editable" id="group_name" placeholder="Enter group name" v-model="user.group_name" aria-describedby="group-help" />
        </div>
        <div class="col" >
          <h4><b>Number of Members</b>  {{user.gender}}</h4>
          <InputText :disabled="!editable" id="group_name" placeholder="Enter Number of Member" v-model="user.group_name" aria-describedby="group-help" />
        </div>

        <div class="col" >
          <h4><b>Created</b> </h4>
          <InputText disabled id="date_created" placeholder="Enter Date Created" v-model="user.date_name" aria-describedby="group-help" />

        </div>

      </div>

    <Divider/>

    <div>
      <h4><b>Province</b></h4>
      <Dropdown :disabled="!editable" id="province" v-model="user.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
    </div>
    <div>
      <h4><b>Region</b></h4>
      <Dropdown :disabled="!editable" id="region" v-model="user.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
    </div>

    <div class="flex justify-content-center m-5">
      <Button v-if="editable" label="Save" icon="pi pi-check" iconPos="right" @click="submitNewGroupDetails" />
    </div>
    <Divider/>

    <DataTable :value="users" showGridlines tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="contact" header="Contact Number"></Column>
      <Column field="region" header="Region"></Column>
      <Column field="child_age_group" header="Child Age Group"></Column>
    </DataTable>
  </div>
</template>



