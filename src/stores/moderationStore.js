import { defineStore } from "pinia";
import { ref } from "vue";


export const useModerationStore = defineStore("moderationStore", () => {
   const reloadRequired = ref(false);

   return { reloadRequired };
})