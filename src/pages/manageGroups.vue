<script setup>
   import {onMounted, ref,defineAsyncComponent} from 'vue';
   import { useConfirm } from "primevue/useconfirm";
   import { useToast } from "primevue/usetoast";
   import {createGroup, fetchGroups} from "@/api/manageGroups";

   import { useDialog } from 'primevue/usedialog';
   const userView = defineAsyncComponent(() => import('../views/GroupDetailsView.vue'));
   import { useStore } from '@/stores/store';



   const dialog = useDialog()

   const isSearch =  ref(false);
   const userID = ref(17);


  const toast = useToast();
  const confirm = useConfirm();


   const searchDialog = ref(false);
   const newDialog = ref(false);

   const validationErrors = ref({
     group_name: null,
     province: null,
     region: null,
     min_age: null,
     max_age: null,
     description: null,
     reason_for_creation: null
   });

   const validateCreateForm = () => {
     let isValid = true;
     // Reset validation errors
     validationErrors.value = {
       group_name: null,
       province: null,
       region: null,
       min_age: null,
       max_age: null,
       description: null,
       reason_for_creation: null
     };

     // Validate group_name
     if (!createForm.value.group_name || createForm.value.group_name.length < 3) {
       validationErrors.value.group_name = 'Group name is required and should be at least 3 characters long.';
       isValid = false;
     }

     // Validate province
     if (!createForm.value.province) {
       validationErrors.value.province = 'Province is required.';
       isValid = false;
     }

     if (!createForm.value.region) {
       validationErrors.value.region = 'Region is required.';
       isValid = false;
     }

     if (!createForm.value.description) {
       validationErrors.value.description = 'Description is required.';
       isValid = false;
     }

     if (!createForm.value.min_age) {
       validationErrors.value.min_age = 'Min Age is required.';
       isValid = false;
     }

     if (!createForm.value.max_age) {
       validationErrors.value.max_age = 'Max Age is required.';
       isValid = false;
     }

     if (!createForm.value.reason_for_creation) {
       validationErrors.value.re= 'Reason for creation is required.';
       isValid = false;
     }

     return isValid;
   };

const createNewGroupDetails = async () => {

  if (validateCreateForm()){
    try {

      const payload = {
        name: createForm.value.group_name,
        province_fk: createForm.value.province,
        min_age: createForm.value.min_age,
        max_age: createForm.value.max_age,
        region_fk: createForm.value.region,
        description: createForm.value.description,
        group_type_fk: createForm.value.group_type,
        reason_for_creation: createForm.value.reason_for_creation,
        admin_user_fk: userID
      }

      await createGroup( payload);
      groupsData.value = await fetchGroups();
      newDialog.value = false;
      toast.add({ severity: 'success', summary: 'Success', detail: 'group created!!!', life: 3000 });

       }
       catch (error) {
         console.error("Error Creating Group:", error);
         toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Deleting User, Please try again!!!', life: 3000 });
       } finally {

       }
  } else {
    toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please check the form fields.', life: 3000 });
  }
};


   const confirm1 = () => {
    confirm.require({
        message: 'Group Created Successfully!',
        header: 'Message Sent!',

        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'No',
        acceptLabel: 'Close',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            addMessage.value = true;
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
} ;




const groupsData = ref([]);

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);


const options = ref({
  province: [
    {sid: '1', name: 'Eastern Cape'},
    {sid: '2', name: 'Free State'},
    {sid: '3', name: 'Gauteng'},
    {sid: '4', name: 'KwaZulu-Natal'},
    {sid: '5', name: 'Limpopo'},
    {sid: '6', name: 'Mpumalanga'},
    {sid: '8', name: 'North West'},
    {sid: '7', name: 'Northern Cape'},
    {sid: '9', name: 'Western Cape'}
  ],
  group_types:[
    {
      "sid" : 1,
      "name" : "Buy/Sell"
    },
    {
      "sid" : 3,
      "name" : "Pregnancy"
    },
    {
      "sid" : 5,
      "name" : "Private"
    },
    {
      "sid" : 4,
      "name" : "Public"
    },
    {
      "sid" : 2,
      "name" : "Reviews"
    }
  ],
  region : [
    {
      "sid" : 1,
      "name" : "Abaqulusi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 2,
      "name" : "Albert Luthuli Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 3,
      "name" : "Alfred Duma Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 4,
      "name" : "Amahlathi Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 5,
      "name" : "Ba-Phalaborwa Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 6,
      "name" : "Beaufort West Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 7,
      "name" : "Bela-Bela Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 8,
      "name" : "Bergrivier Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 9,
      "name" : "Big Five Hlabisa Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 10,
      "name" : "Bitou Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 11,
      "name" : "Blouberg Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 12,
      "name" : "Blue Crane Route Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 13,
      "name" : "Breede Valley Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 14,
      "name" : "Buffalo City Metropolitan Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 15,
      "name" : "Bushbuckridge Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 16,
      "name" : "Cape Agulhas Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 17,
      "name" : "Cederberg Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 18,
      "name" : "City of Cape Town Metropolitan Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 19,
      "name" : "City of Ekurhuleni Metropolitan Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 20,
      "name" : "City of Johannesburg Metropolitan Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 21,
      "name" : "City of Matlosana Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 22,
      "name" : "City of Tshwane Metropolitan Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 23,
      "name" : "Collins Chabane Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 24,
      "name" : "Dannhauser Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 25,
      "name" : "Dawid Kruiper Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 26,
      "name" : "Dihlabeng Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 27,
      "name" : "Dikgatlong Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 28,
      "name" : "Dipaleseng Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 29,
      "name" : "Ditsobotla Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 30,
      "name" : "Dr AB Xuma Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 31,
      "name" : "Dr Beyers NaudÃ© Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 32,
      "name" : "Dr JS Moroka Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 33,
      "name" : "Dr Nkosazana Dlamini Zuma Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 34,
      "name" : "Drakenstein Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 35,
      "name" : "eDumbe Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 36,
      "name" : "Elias Motsoaledi Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 37,
      "name" : "Elundini Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 38,
      "name" : "eMadlangeni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 39,
      "name" : "Emakhazeni Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 40,
      "name" : "Emalahleni Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 41,
      "name" : "Emalahleni Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 42,
      "name" : "Emfuleni Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 43,
      "name" : "Emthanjeni Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 44,
      "name" : "Endumeni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 45,
      "name" : "Enoch Mgijima Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 46,
      "name" : "Ephraim Mogale Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 47,
      "name" : "eThekwini Metropolitan Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 48,
      "name" : "Fetakgomo Tubatse Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 49,
      "name" : "Ga-Segonyana Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 50,
      "name" : "Gamagara Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 51,
      "name" : "George Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 52,
      "name" : "Govan Mbeki Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 53,
      "name" : "Great Kei Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 54,
      "name" : "Greater Giyani Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 55,
      "name" : "Greater Kokstad Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 56,
      "name" : "Greater Letaba Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 57,
      "name" : "Greater Taung Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 58,
      "name" : "Greater Tzaneen Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 59,
      "name" : "Hantam Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 60,
      "name" : "Hessequa Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 61,
      "name" : "Impendle Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 62,
      "name" : "Ingquza Hill Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 63,
      "name" : "Inkosi Langalibalele Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 64,
      "name" : "Intsika Yethu Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 65,
      "name" : "Inxuba Yethemba Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 66,
      "name" : "JB Marks Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 67,
      "name" : "Joe Morolong Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 68,
      "name" : "Jozini Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 69,
      "name" : "Kagisano-Molopo Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 70,
      "name" : "Kai !Garib Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 71,
      "name" : "Kamiesberg Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 72,
      "name" : "Kannaland Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 73,
      "name" : "Kareeberg Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 74,
      "name" : "Karoo Hoogland Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 75,
      "name" : "Kgatelopele Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 76,
      "name" : "Kgetlengrivier Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 77,
      "name" : "Khai-Ma Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 78,
      "name" : "!Kheis Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 79,
      "name" : "King Sabata Dalindyebo Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 80,
      "name" : "Knysna Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 81,
      "name" : "Kopanong Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 82,
      "name" : "Kou-Kamma Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 83,
      "name" : "Kouga Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 84,
      "name" : "KwaDukuza Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 85,
      "name" : "Laingsburg Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 86,
      "name" : "Langeberg Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 87,
      "name" : "Lekwa Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 88,
      "name" : "Lekwa-Teemane Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 89,
      "name" : "Lepelle-Nkumpi Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 90,
      "name" : "Lephalale Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 91,
      "name" : "Lesedi Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 92,
      "name" : "Letsemeng Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 93,
      "name" : "Madibeng Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 94,
      "name" : "Mafube Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 95,
      "name" : "Magareng Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 96,
      "name" : "Mahikeng Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 97,
      "name" : "Makana Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 98,
      "name" : "Makhado Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 99,
      "name" : "Makhuduthamaga Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 100,
      "name" : "Maluti-a-Phofung Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 101,
      "name" : "Mamusa Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 102,
      "name" : "Mandeni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 103,
      "name" : "Mangaung Metropolitan Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 104,
      "name" : "Mantsopa Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 105,
      "name" : "Maphumulo Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 106,
      "name" : "Maquassi Hills Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 107,
      "name" : "Maruleng Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 108,
      "name" : "Masilonyana Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 109,
      "name" : "Matatiele Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 110,
      "name" : "Matjhabeng Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 111,
      "name" : "Matzikama Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 112,
      "name" : "Mbhashe Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 113,
      "name" : "Mbombela Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 114,
      "name" : "Merafong City Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 115,
      "name" : "Metsimaholo Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 116,
      "name" : "Mhlontlo Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 117,
      "name" : "Midvaal Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 118,
      "name" : "Mkhambathini Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 119,
      "name" : "Mkhondo Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 120,
      "name" : "Mnquma Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 121,
      "name" : "Modimolleâ€“Mookgophong Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 122,
      "name" : "Mogalakwena Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 123,
      "name" : "Mogale City Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 124,
      "name" : "Mohokare Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 125,
      "name" : "Molemole Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 126,
      "name" : "Moqhaka Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 127,
      "name" : "Moretele Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 128,
      "name" : "Moses Kotane Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 129,
      "name" : "Mossel Bay Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 130,
      "name" : "Mpofana Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 131,
      "name" : "Msinga Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 132,
      "name" : "Msukaligwa Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 133,
      "name" : "Msunduzi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 134,
      "name" : "Mthonjaneni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 135,
      "name" : "Mtubatuba Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 136,
      "name" : "Musina Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 137,
      "name" : "Nala Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 138,
      "name" : "Naledi Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 139,
      "name" : "Nama Khoi Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 140,
      "name" : "Ndlambe Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 141,
      "name" : "Ndwedwe Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 142,
      "name" : "Nelson Mandela Bay Metropolitan Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 143,
      "name" : "Newcastle Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 144,
      "name" : "Ngqushwa Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 145,
      "name" : "Ngwathe Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 146,
      "name" : "Nkandla Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 147,
      "name" : "Nketoana Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 148,
      "name" : "Nkomazi Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 149,
      "name" : "Nongoma Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 150,
      "name" : "Nqutu Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 151,
      "name" : "Ntabankulu Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 152,
      "name" : "Nyandeni Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 153,
      "name" : "Okhahlamba Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 154,
      "name" : "Oudtshoorn Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 155,
      "name" : "Overstrand Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 156,
      "name" : "Phokwane Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 157,
      "name" : "Phumelela Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 158,
      "name" : "Pixley ka Seme Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 159,
      "name" : "Polokwane Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 160,
      "name" : "Port St Johns Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 161,
      "name" : "Prince Albert Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 162,
      "name" : "Ramotshere Moiloa Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 163,
      "name" : "Rand West City Local Municipality",
      "province_fk" : 3
    },
    {
      "sid" : 164,
      "name" : "Ratlou Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 165,
      "name" : "Ray Nkonyeni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 166,
      "name" : "Raymond Mhlaba Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 167,
      "name" : "Renosterberg Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 168,
      "name" : "Richmond Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 169,
      "name" : "Richtersveld Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 170,
      "name" : "Rustenburg Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 171,
      "name" : "Sakhisizwe Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 172,
      "name" : "Saldanha Bay Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 173,
      "name" : "Senqu Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 174,
      "name" : "Setsoto Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 175,
      "name" : "Siyancuma Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 176,
      "name" : "Siyathemba Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 177,
      "name" : "Sol Plaatje Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 178,
      "name" : "Stellenbosch Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 179,
      "name" : "Steve Tshwete Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 180,
      "name" : "Sundays River Valley Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 181,
      "name" : "Swartland Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 182,
      "name" : "Swellendam Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 183,
      "name" : "Thaba Chweu Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 184,
      "name" : "Thabazimbi Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 185,
      "name" : "Theewaterskloof Local Municipality",
      "province_fk" : 9
    },
    {
      "sid" : 186,
      "name" : "Thembelihle Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 187,
      "name" : "Thembisile Hani Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 188,
      "name" : "Thulamela Local Municipality",
      "province_fk" : 5
    },
    {
      "sid" : 189,
      "name" : "Tokologo Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 190,
      "name" : "Tsantsabane Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 191,
      "name" : "Tswaing Local Municipality",
      "province_fk" : 7
    },
    {
      "sid" : 192,
      "name" : "Tswelopele Local Municipality",
      "province_fk" : 2
    },
    {
      "sid" : 193,
      "name" : "Ubuhlebezwe Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 194,
      "name" : "Ubuntu Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 195,
      "name" : "Ulundi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 196,
      "name" : "Umdoni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 197,
      "name" : "uMfolozi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 198,
      "name" : "uMhlabuyalingana Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 199,
      "name" : "uMhlathuze Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 200,
      "name" : "uMlalazi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 201,
      "name" : "uMngeni Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 202,
      "name" : "uMshwathi Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 203,
      "name" : "Umsobomvu Local Municipality",
      "province_fk" : 8
    },
    {
      "sid" : 204,
      "name" : "uMuziwabantu Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 205,
      "name" : "Umvoti Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 206,
      "name" : "Umzimkhulu Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 207,
      "name" : "Umzimvubu Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 208,
      "name" : "Umzumbe Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 209,
      "name" : "uPhongolo Local Municipality",
      "province_fk" : 4
    },
    {
      "sid" : 210,
      "name" : "Victor Khanye Local Municipality",
      "province_fk" : 6
    },
    {
      "sid" : 211,
      "name" : "Walter Sisulu Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 212,
      "name" : "Winnie Madikizela-Mandela Local Municipality",
      "province_fk" : 1
    },
    {
      "sid" : 213,
      "name" : "Witzenberg Local Municipality",
      "province_fk" : 9
    }
  ],

  username : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],
names: [
    {name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],
group: [
    {sid:1, name: 'New York', code: 'NY' },
    {sid:2,  name: 'Rome', code: 'RM' },
    {sid:3,  name: 'London', code: 'LDN' },
    {sid:4,  name: 'Istanbul', code: 'IST' },
    {sid:5, name: 'Paris', code: 'PRS' }
],email : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],

})

const searchForm = ref({
  keyword_search:'',
  name_surname:'',
  email:'',
  username:'',
  group:'',
  date:''
})


const createForm = ref({
  group_name:'',
  province:'',
  min_age:0,
  max_age:100,
  region:'',
  description:'',
  group_type:'',
  reason_for_creation:''
})

const handleViewClick = (event) => {
  dialog.open(userView, {
    data:{
     group : {...event.data}
    },
    props: {
      header: 'Group Details',
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

      fetchGroups().then((data) => {
        groupsData.value = data;
      });
    }
  });
}


const searchGroup= async()=>{

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


const group= ref();




const clearSearchResults=async ()=>{

  fetchGroups().then((data)=>{
    groupsData.value = data;
  });
  isSearch.value = false;
  toast.add({ severity: 'success', summary: 'Success', detail: 'Retrieving Groups', life: 3000 });
}

onMounted(() => {

  const user = useStore();
  userID.value = 17;
  fetchGroups().then((data) => {
    groupsData.value = data;
  });

});




</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Manage Groups</span>
                  <div >
                    <Button
                        class="mr-5"
                        label="Search"
                        icon="pi pi-search"
                        severity="info"
                        @click="searchDialog=true"
                    />
                    <Button
                        label="New Group"
                        icon="pi pi-plus"
                        severity="info"
                        @click="newDialog=true"
                    />
                  </div>
               </div>
            </template>
               <template #content>
                  <DataTable
                     :value="groupsData"
                     paginator :rows="5"
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                     sortMode="multiple"
                     data-key="sid"
                     selection-mode="single"
                     @rowClick="handleViewClick"

                  >
                     <Column field="group_name" sortable header="Group Name"></Column>
                     <Column field="group_type"  sortable header="Private/Public"></Column>
                     <Column field="region" sortable header="Region"></Column>
                     <Column field="user_count" sortable header="user_count"></Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="searchDialog" :style="{width: '670px'}" header="Advanced Search" :modal="true" class="p-fluid">
                    <div class="field col-12">
                        <label for="username">Username</label>
                        <MultiSelect v-model="searchForm.username" display="chip" :options="options.username" optionLabel="name" placeholder="Select Username"  />

                    </div>
                    <div class="field col-12">
                      <label for="name">Name</label>
                       <MultiSelect ed id="name" v-model="searchForm.name_surname" display="chip"  :options="options.name" optionLabel="name" placeholder="Select Name" />
                    </div>
                    <div class="field col-12">
                      <label for="email">Email</label>
                      <MultiSelect id="email"  v-model="searchForm.email"  display="chip"  :options="options.email" optionLabel="name" placeholder="Select Email" :maxSelectedLabels="3"  />
                    </div>
                    <div class="field col-12">
                      <label for="name">Group</label>
                      <Dropdown id="group" v-model="searchForm.group"  display="chip"  :options="options.group" optionLabel="name" placeholder="Select Group"  />
                    </div>

                    <div class="field col-12">
                      <label for="group_name">Date Filter</label>
                      <Calendar v-model="searchForm.date" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" />
                    </div>


                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="searchDialog=false"/>
                        <Button label="Search" icon="pi pi-search" text @click="searchGroup" />
                     </template>
               </Dialog>



               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{}" header="Create Group" :modal="true" class="p-fluid">
                <div class="field col-12">
                        <label for="group_name">Group Name</label>
                        <InputText id="group_name" placeholder="Enter group name" v-model="createForm.group_name" aria-describedby="group-help" />
                        <template v-if="validationErrors.group_name">
                          <small style="color: red">{{ validationErrors.group_name }}</small>
                        </template>
                    </div>
                    <div class="field col-12">
                      <label for="province">Province</label>
                        <Dropdown id="province" option-value="sid" v-model="createForm.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
                      <template v-if="validationErrors.province">
                        <small style="color: red">{{ validationErrors.province }}</small>
                      </template>
                    </div>

                    <div class="field col-12">
                      <label for="region">Region</label>
                        <Dropdown id="region" option-value="sid" v-model="createForm.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
                        <template v-if="validationErrors.region">
                          <small style="color: red">{{ validationErrors.region }}</small>
                        </template>
                    </div>

                 <div class="field col-12">
                   <label for="group_type">Group Type</label>
                   <Dropdown id="group_type" option-value="sid" v-model="createForm.group_type" :options="options.group_types" optionLabel="name" placeholder="Select a Group Type"  />
                   <template v-if="validationErrors.region">
                     <small style="color: red">{{ validationErrors.region }}</small>
                   </template>
                 </div>

                    <div class="field col-12">
                      <label for="min_age">Min Age</label>
                      <InputNumber  id="min_age" v-model="createForm.min_age"  showButtons buttonLayout="vertical" class="m-5" style="width: 3rem" :min="0" :max="99">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                      </InputNumber>
                      <label for="max_age">Max Age</label>
                      <InputNumber v-model="createForm.max_age" showButtons buttonLayout="vertical" class="m-5" style="width: 3rem" :min="0" :max="99">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                      </InputNumber>
                      <template v-if="validationErrors.min_age">
                        <small style="color: red">{{ validationErrors.min_age }}</small>
                      </template>
                      <template v-if="validationErrors.max_age">
                        <small style="color: red">{{ validationErrors.max_age }}</small>
                      </template>
                  </div>

                  <div class="field col-12">
                    <label for="region">Description</label>
                    <Textarea id="description" placeholder="Group Description" v-model="createForm.description" autoResize rows="5" cols="30" />
                    <template v-if="validationErrors.description">
                      <small style="color: red">{{ validationErrors.description }}</small>
                    </template>
                  </div>

                 <div class="field col-12">
                   <label for="region">Resons For Creation</label>
                   <Textarea id="description" placeholder="Group Description" v-model="createForm.reason_for_creation" autoResize rows="5" cols="30" />
                   <template v-if="validationErrors.reason_for_creation">
                     <small style="color: red">{{ validationErrors.reason_for_creation }}</small>
                   </template>
                 </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="newDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="createNewGroupDetails" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
    <div class="m-5 flex flex-row-reverse ">
      <Button @click="clearSearchResults" v-show="isSearch" label="Return To Search"/>
    </div>
	</div>

  <DynamicDialog />
</template>

