const navigationConfig = [
	{
		id: "dashboards.main",
		title: "Dashboard",
		type: "item",
		icon: "heroicons-outline:home",
		url: "/dashboard",
	},
	{
		id: "dashboards.GenerateReciept",
		title: "Generate Reciept",
		type: "item",
		icon: "heroicons-outline:plus-circle",
		url: "/dashboard/add-purchase",
	},
	{
		id: "dashboards.verify",
		title: "Verify Purchase",
		type: "item",
		icon: "heroicons-outline:badge-check",
		url: "/dashboard/verify",
	},
	{
		id: "dashboard.users",
		title: "Manage users",
		type: "item",
		icon: "heroicons-outline:users",
		url: "/dashboard/users",
	},
	{
		id: "dashboard.report",
		title: "Sales report",
		type: "item",
		icon: "heroicons-outline:chart-bar",
		url: "/dashboard/sales-report",
	},
	{
		id: "dashboard.messaging",
		title: "Messaging",
		type: "item",
		icon: "heroicons-outline:chat-bubble-center",
		url: "/dashboard/messaging",
	},
	{
		id: "dashboard.notification",
		title: "Notification",
		type: "item",
		icon: "heroicons-outline:bell",
		url: "/dashboard/notification",
	},
];

export default navigationConfig;
