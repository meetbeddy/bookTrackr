const navigationConfig = [
	{
		id: "dashboards.main",
		title: "Dashboard",
		role: ["admin"],
		icon: "heroicons-outline:home",
		url: "/dashboard",
	},
	{
		id: "dashboards.GenerateReciept",
		title: "Generate Reciept",
		role: ["admin", "bookstore staff"],
		icon: "heroicons-outline:plus-circle",
		url: "/dashboard/add-purchase",
	},
	{
		id: "dashboards.verify",
		title: "Verify Purchase",
		role: ["admin", "department staff"],
		icon: "heroicons-outline:badge-check",
		url: "/dashboard/verify",
	},
	{
		id: "dashboard.users",
		title: "Manage users",
		role: ["admin"],
		icon: "heroicons-outline:users",
		url: "/dashboard/users",
	},
	{
		id: "dashboard.report",
		title: "Sales report",
		role: ["admin", "department staff", "bookstore staff"],
		icon: "heroicons-outline:chart-bar",
		url: "/dashboard/sales-report",
	},
];

export default navigationConfig;
