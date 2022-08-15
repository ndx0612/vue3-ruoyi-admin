import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
	// name属性的说明和用法：https://router.vuejs.org/zh/guide/essentials/named-routes.html
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		name: 'login',
		component: () => import("@/view/loginRegister/login.vue"),
	},
	{
		path: "/home",
		name: 'home',
		component: () => import("@/view/homePage/index.vue"),
		children: [
			{
				path: "/cluesManage",
				name: 'cluesManage',
				component: () => import("@/view/homePage/cluesManage.vue"),
			},
			{
				path: "/schoolManage",
				name: 'schoolManage',
				component: () => import("@/view/homePage/schoolManage/index.vue"),
			},
			{
				path: "/schoolConfig",
				name: 'schoolConfig',
				component: () => import("@/view/homePage/schoolManage/config.vue"),
			},
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router