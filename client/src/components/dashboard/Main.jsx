import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import {
	EmojiEvents,
	CheckCircle,
	HourglassEmpty,
	AttachMoney,
} from "@mui/icons-material";
import { fetchdashboardData } from "../../api";

function Main() {
	const [dashboardData, setDashboardData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetchdashboardData();

				setDashboardData(res.data);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			}
		};

		fetchData();
	}, []);
	console.log(dashboardData);
	return (
		<Container>
			<Typography variant='h4' gutterBottom>
				Dashboard
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={3}>
					<Paper
						elevation={3}
						className='dashboard-widget p-3 flex items-center'>
						<EmojiEvents className='text-yellow-500 text-4xl mr-3' />
						<div>
							<Typography variant='h6' className='font-semibold'>
								Total Purchases
							</Typography>
							<Typography variant='h4'>
								{dashboardData?.totalPurchases || "-"}
							</Typography>
						</div>
					</Paper>
				</Grid>

				<Grid item xs={12} sm={4} md={3}>
					<Paper
						elevation={3}
						className='dashboard-widget p-3 flex items-center'>
						<CheckCircle className='text-green-500 text-4xl mr-3' />
						<div>
							<Typography variant='h6' className='font-semibold'>
								Verified Purchases
							</Typography>
							<Typography variant='h4'>
								{dashboardData?.verifiedPurchases || "-"}
							</Typography>
						</div>
					</Paper>
				</Grid>

				<Grid item xs={12} sm={4} md={3}>
					<Paper
						elevation={3}
						className='dashboard-widget p-3 flex items-center'>
						<HourglassEmpty className='text-gray-500 text-4xl mr-3' />
						<div>
							<Typography variant='h6' className='font-semibold'>
								Pending Verification
							</Typography>
							<Typography variant='h4'>
								{dashboardData?.pendingVerifications || "-"}
							</Typography>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Paper
						elevation={3}
						className='dashboard-widget p-3 flex items-center'>
						<AttachMoney className='text-blue-500 text-4xl mr-3' />
						<div>
							<Typography variant='h6' className='font-semibold'>
								Total Revenue
							</Typography>
							<Typography variant='h4'>
								{new Intl.NumberFormat("en-NG", {
									style: "currency",
									currency: "NGN",
								}).format(dashboardData?.totalRevenue || "-")}
							</Typography>
						</div>
					</Paper>
				</Grid>
			</Grid>
			<Typography variant='h5' gutterBottom>
				Textbooks
			</Typography>
		</Container>
	);
}

export default Main;
