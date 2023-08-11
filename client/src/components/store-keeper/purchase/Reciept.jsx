import React from "react";
import { Paper, Typography, Container, Divider, Button } from "@mui/material";
import dayjs from "dayjs";
import "./invoice.module.css";

const Receipt = ({ data, newTransaction, button }) => {
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	}).format(data.amount);
	return (
		<Container maxWidth='md' className='mt-4'>
			<Paper elevation={3} className='p-8 receipt invoiceLayout'>
				<div className='header'>
					<Typography variant='h5'>Receipt</Typography>
					<img src='/path/to/your/logo.png' alt='Logo' className='logo' />
				</div>
				<Divider className='mb-6' />
				<div className='flex justify-between mb-4 w-full'>
					<Typography variant='body2' className='text-left'>
						Date: {dayjs(data.createdAt).format("YYYY-MM-DD")}
					</Typography>
					<Typography variant='body2' className='invoiceNumber text-right'>
						Receipt #: {data.receiptNumber}
					</Typography>
				</div>
				<div className='contacts w-full'>
					<div className='address border rounded p-3 m-1 w-full'>
						<h4 className='text-bold'>Student Info:</h4>
						<p>{data.studentName}</p>
						<p>{data.regNum}</p>
						<p>{data.phoneNumber}</p>
						<p>{data.department}</p>
					</div>
				</div>
				<table className='w-full mb-6'>
					<thead>
						<tr>
							<th className='text-left'>Textbook Purchased</th>
							<th className='text-right'>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='text-left'>{data.textbook}</td>
							<td className='text-right'>{formattedAmount}</td>
						</tr>
					</tbody>
				</table>
				<div className='invoiceSummary flex justify-end'>
					<div className='summaryItem'>
						<span>Subtotal:</span>
						<input
							type='text'
							className='amount'
							value={formattedAmount}
							readOnly
						/>
					</div>
					<div className='summaryItem'>
						<span>Discount:</span>
						<input type='text' className='discount' value='0.00' readOnly />
					</div>
					<div className='summaryItem'>
						<span>Total:</span>
						<input
							type='text'
							className='amount'
							value={formattedAmount}
							readOnly
						/>
					</div>
				</div>

				<Typography variant='h4' className='font-semibold'>
					Verification Code: {data.verificationCode}
				</Typography>
				{button && (
					<Button
						variant='contained'
						color='primary'
						onClick={newTransaction}
						className='mt-6'>
						Perform Another Transaction
					</Button>
				)}
			</Paper>
		</Container>
	);
};

export default Receipt;
