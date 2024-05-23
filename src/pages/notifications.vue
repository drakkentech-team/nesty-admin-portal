<script setup>
   import { ref, reactive, onMounted, onUnmounted, nextTick, watch, computed  } from 'vue';
   import { getNotifications, getNotificationTemplates, sendNotification } from '../api/notifications';
   import { applyFilters } from '../api/filters';
   import { getProducts } from '../api/products';
   import { todayDate, addDays } from "../utilities/common"
   import { getMobileUsers } from '../api/mobileAppUsers';
   import { useStore } from '../stores/store';


</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Notifications</span>
                  <Button 
                     label="New Notification" 
                     icon="pi pi-plus" 
                     severity="info" 
                  />
               </div>
            </template>
         </Card>
		</div>
	</div>
</template>

