import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Container,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	MenuItem,
	Button,
	TextField,
	Grid,
} from "@mui/material";
import { fetchAllPurchases } from "../../../actions/purchaseActions";

const TextbookSalesTracking = () => {
	const [salesData, setSalesData] = useState([]);
	const [dateRangeFilter, setDateRangeFilter] = useState({});
	const [selectedTextbook, setSelectedTextbook] = useState("");

	const dispatch = useDispatch();
	const purchases = useSelector((state) => state.purchase.purchases);

	useEffect(() => {
		dispatch(fetchAllPurchases());
	}, [dispatch]);

	const handleDateFromChange = (event) => {
		setDateRangeFilter({ ...dateRangeFilter, from: event.target.value });
	};

	const handleDateToChange = (event) => {
		setDateRangeFilter({ ...dateRangeFilter, to: event.target.value });
	};

	const handleTextbookFilterChange = (event) => {
		setSelectedTextbook(event.target.value);
	};

	const generateReport = () => {
		const query = {};

		if (dateRangeFilter.from && dateRangeFilter.to) {
			query.startDate = dateRangeFilter.from;
			query.endDate = dateRangeFilter.to;
		}

		if (selectedTextbook && selectedTextbook !== "ALL") {
			query.textbook = selectedTextbook;
		}
		dispatch(fetchAllPurchases(query));
	};

	return (
		<Container>
			<Typography variant='h4' gutterBottom>
				Textbook Sales Tracking
			</Typography>

			<Paper elevation={3} sx={{ padding: 2 }}>
				<Grid container spacing={2} className='m-6'>
					<Grid item xs={12} sm={4}>
						<TextField
							label='From Date'
							type='date'
							value={dateRangeFilter.from || ""}
							onChange={handleDateFromChange}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label='To Date'
							type='date'
							value={dateRangeFilter.to || ""}
							onChange={handleDateToChange}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label='Textbook Filter'
							value={selectedTextbook}
							onChange={handleTextbookFilterChange}
							select
							fullWidth>
							<MenuItem value='' disabled>
								Select Textbook
							</MenuItem>
							<MenuItem value='ALL'>ALL</MenuItem>
							<MenuItem value='COS 101'>COS 101</MenuItem>
							<MenuItem value='COS 301'>COS 301</MenuItem>
						</TextField>
					</Grid>
				</Grid>
				<div className='m-4'>
					<Button variant='contained' color='primary' onClick={generateReport}>
						Generate Report
					</Button>
				</div>

				<TableContainer>
					<Typography className='text-red-500'>
						*only verified sales are captured here
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Textbook</TableCell>
								<TableCell>Quantity Sold</TableCell>
								<TableCell>Revenue</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{purchases &&
								purchases.map((purchase, i) => (
									<TableRow key={i}>
										<TableCell>{purchase._id.date}</TableCell>
										<TableCell>{purchase._id.textbook}</TableCell>
										<TableCell>{purchase.totalQuantitySold}</TableCell>
										<TableCell>
											{new Intl.NumberFormat("en-NG", {
												style: "currency",
												currency: "NGN",
											}).format(purchase?.totalRevenue || "-")}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};

export default TextbookSalesTracking;
