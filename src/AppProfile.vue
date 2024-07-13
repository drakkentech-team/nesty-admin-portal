<template>
	<div class="layout-profile">


    <span class="username text-center text-white text-overflow-clip">{{email}}</span>

		<button class="p-link layout-profile-link align my-2" @click="onClick">
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <!--<li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span class="menuitem-badge">2</span></button></li>-->
                <li><button @click="onLogout" class="p-link"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
            </ul>
        </transition>

	</div>
</template>

<script>
	import router from "@/router/routes";
  import {useStore} from "@/stores/store";

  export default {
		data() {
      const use = useStore();
      const email = use.user.user.username;
			return {
				expanded: false,
        email
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},
      async onLogout() {
        const use = useStore()
        use.clearUser();
        await router.push({path: '/login'});
      }

    }
	}
</script>

<style scoped>

</style>
