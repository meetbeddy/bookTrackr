import { styled } from "@mui/material";

// import FabButton from "../Fab/Fab";

const Footer = () => {
	const FooterText = styled("div")({
		color: "white",

		width: "100%",
		margin: "0px auto",
		textAlign: "center",
		padding: "5px",
	});

	return (
		<footer className='fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between'>
			<FooterText>
				©BookTrackr | Made with ♥ in 🇳🇬{" "}
				<span>
					<a
						href='https://github.com/meetbeddy'
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-300'></a>
				</span>
			</FooterText>
			{/* {user && <FabButton />} */}
		</footer>
	);
};

export default Footer;
