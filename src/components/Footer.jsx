import styled from "styled-components";

const Footer = () => {
	return (
		<FooterContainer>
			<div>
				<p>Built and Designed by Iqra Imran Syed</p>
			</div>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	font-size: 20px;
	text-align: center;
	flex-wrap: wrap;
	color: #a9a9a9;
	font-family: "ppneuebit-bold";
	letter-spacing: 0.7px;

	@media only screen and (max-width: 480px) {
		position: absolute;
		text-align: center;
		font-size: 0.6rem;
		bottom: -5rem;
	}
`;
