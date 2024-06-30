<script setup>
import {  ref, onMounted ,inject} from 'vue';
import { useToast } from "primevue/usetoast";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import {deleteGroup, editGroup, getGroupInfo} from "@/api/manageGroups";


const toast = useToast();

const editable  = ref(false);

const options = ref({
  province: [
    {sid: 1, name: 'Eastern Cape'},
    {sid: 2, name: 'Free State'},
    {sid: 3, name: 'Gauteng'},
    {sid: 4, name: 'KwaZulu-Natal'},
    {sid: 5, name: 'Limpopo'},
    {sid: 6, name: 'Mpumalanga'},
    {sid: 8, name: 'North West'},
    {sid: 7, name: 'Northern Cape'},
    {sid: 9, name: 'Western Cape'}
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

const confirmationDialog = ref(false);
const confirmationDialogClose = ref(false);
const confirmationDialogTitle = ref('Are you sure?');
const confirmationDialogBody = ref('Please confirm to proceed.');
const callback = ref()
const deleteDialog = ref(false);

const confirmDeleteGroup = ()=>{
  confirmationDialogTitle.value = "Delete Group";
  confirmationDialogBody.value = "Are you sure you want to delete?";
  callback.value = getReasonForDeleting;
  confirmationDialog.value= true;
}

const getReasonForDeleting=()=>{
  deleteDialog.value = true;
}


const deleteGroupInfo=async()=>{
  try {

    deleteDialog.value = false;
    await  deleteGroup(groupID);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted Group', life: 3000 });

    closeDialog();
  }
  catch (error) {
    toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
  } finally {

  }
}






const dialogRef = inject('dialogRef');

const closeDialog = () => {
  dialogRef.value.close();
}

const group = ref(
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


const users = ref();
const groupID = ref();


const submitNewGroupDetails = async () => {

  editable.value = false;

  try {

    const payload = {
      name: groupData.value.group_name,
      province_fk: groupData.value.province,
      region_fk: groupData.value.region,
      group_type_fk: groupData.value.group_type,
      description: "Just a test",
    }

    await editGroup(groupID.value, payload)
    toast.add({severity: 'success', summary: 'Success', detail: 'Updated !!!', life: 3000});

  } catch (error) {

    toast.add({severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000});
  } finally {

  }
}



const groupData = ref(
    {}
);

onMounted(() => {
  const params = dialogRef.value.data;
  groupID.value = params.group.group_sid;


  getGroupInfo(params.group.group_sid).then((data) => {
    console.log(data);
    groupData.value = data.group_info[0];
    groupData.value.province = 1;
    groupData.value.region = 1;
    users.value = data.user_info;

    console.log(groupData.value);

  });

  groupData.value.province = 1;
  groupData.value.region = 1;


  console.log(groupData.value);


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
          <span><b>Group Name : </b> </span>
          <InputText :disabled="!editable" id="group_name" v-model="groupData.group_name" aria-describedby="group-help" />
        </div>
        <div class="col" >
          <span><b>Number of Members : </b>  </span>
          <InputText disabled id="group_name" placeholder="Enter Number of Member" v-model="groupData.user_count" aria-describedby="group-help" />
        </div>

        <div class="col" >
          <span><b>Created : </b> </span>
          <InputText disabled id="date_created" placeholder="Enter Date Created" v-model="groupData.date_created" aria-describedby="group-help" />
        </div>

      </div>

    <Divider/>

    <div>
      <span><b>Province : </b></span>
      <Dropdown :disabled="!editable" option-value="sid" id="province" v-model="groupData.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
    </div>
    <div class="my-5">
      <span><b>Region : </b></span>
      <Dropdown :disabled="!editable" option-value="sid" id="region" v-model="groupData.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
    </div>

    <div class="flex justify-content-center m-5">
      <Button v-if="!editable" severity="danger"   label="Delete Group" icon="pi pi-trash" iconPos="right" @click="confirmDeleteGroup" />
      <Button class="m-2" v-if="editable" severity="danger" label="Cancel" icon="pi pi-times" iconPos="right" @click="editable=false" />
      <Button class="m-2" v-if="editable" label="Save" icon="pi pi-check" iconPos="right" @click="submitNewGroupDetails" />

    </div>
    <Divider/>

    <DataTable :value="users" paginator :rows="5" showGridlines sortMode="multiple" tableStyle="min-width: 50rem">
      <Column field="user_username"  sortable header="Username"></Column>
      <Column field="user_email"  sortable header="Email"></Column>
      <Column field="user_mobile_number"  sortable header="Contact Number"></Column>
      <Column field="user_region"  sortable header="Region"></Column>
      <Column field="child_age_group"  sortable header="Child Age Group"></Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="deleteDialog" :style="{}" header="Delete Group" :modal="true" class="p-fluid">


    <div class="field col-12">
      <Textarea id="description" placeholder="Reasons For Deleting" v-model="group.reasons" autoResize rows="5" cols="30" />
    </div>

    <template #footer>
      <Button label="Save" icon="pi pi-check" text @click="deleteGroupInfo" />
    </template>
  </Dialog>

  <ConfirmationDialog :twoButton="!confirmationDialogClose" :confirmLabel="confirmLabel" :rejectLabel="rejectLabel" :icon ="'pi pi-question'" :title="confirmationDialogTitle" :body="confirmationDialogBody"  :show="confirmationDialog" @cancel ="confirmationDialog=false" @confirm="callback"/>

</template>



