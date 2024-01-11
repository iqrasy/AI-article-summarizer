import styled from "styled-components";

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<FooterContainer>
			<div>
				<p>Built and Designed by Iqra Imran Syed {year}</p>
			</div>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	width: 100%;
	font-size: 0.7rem;
	color: #bdbdbd;
	padding: 1rem;
	text-align: center;
	flex-wrap: wrap;
	margin-top: 3rem;

	@media only screen and (max-width: 480px) {
		bottom: 0;
		width: 100%;
		text-align: center;
		font-size: 0.6rem;
	}
`;
