import React from "react";
import { Paper, Typography, Container, Divider } from "@mui/material";
import "./invoice.module.css";

const Receipt = ({ data }) => {
	return (
		<Container maxWidth='md' className='mt-4'>
			<Paper elevation={3} className='p-8 receipt invoiceLayout'>
				<div className='header'>
					<Typography variant='h5'>Receipt</Typography>
					<img src='/path/to/your/logo.png' alt='Logo' className='logo' />
				</div>
				<Divider className='mb-6' />
				<div className='flex justify-between mb-4'>
					<Typography variant='body2'>
						Date: {new Date().toLocaleDateString()}
					</Typography>
					<Typography variant='body2' className='invoiceNumber'>
						Receipt #: {data.receiptNumber}
					</Typography>
				</div>
				<div className='contacts'>
					<div className='address'>
						<h4>Buyer:</h4>
						<p>{data.studentName}</p>
						<p>{data.regNum}</p>
						<p>{data.phoneNumber}</p>
						<p>{data.department}</p>
					</div>
					{/* Add seller contact info if needed */}
					{/* <div className="dates">
            <h4>Date Issued:</h4>
            <p>{new Date().toLocaleDateString()}</p>
          </div> */}
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
							<td className='text-right'>$50.00</td>
						</tr>
						{/* Add more rows for additional purchased items */}
					</tbody>
				</table>
				<div className='invoiceSummary'>
					<div className='summaryItem'>
						<span>Subtotal:</span>
						<input type='text' className='amount' value='$50.00' readOnly />
					</div>
					<div className='summaryItem'>
						<span>Discount:</span>
						<input type='text' className='discount' value='$0.00' readOnly />
					</div>
					<div className='summaryItem'>
						<span>Total:</span>
						<input type='text' className='amount' value='$50.00' readOnly />
					</div>
				</div>
				<Typography variant='body2' className='font-bold'>
					Verification Code: {data.verificationCode}
				</Typography>
			</Paper>
		</Container>
	);
};

export default Receipt;
