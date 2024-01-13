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
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	font-size: 0.7rem;
	color: var(--accent-200);
	text-align: center;
	flex-wrap: wrap;

	@media only screen and (max-width: 480px) {
		position: absolute;
		text-align: center;
		font-size: 0.6rem;
		bottom: -5rem;
	}
`;
