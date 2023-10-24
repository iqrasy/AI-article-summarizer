import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<FooterContainer>
			<Container>
				<Row>
					<Col>
						<p>Built and Designed by Iqra Imran Syed</p>
					</Col>
					<Col>
						<p>Copyright © {year} </p>
					</Col>
				</Row>
			</Container>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	bottom: 0;
	width: 40%;
	text-align: center;
	font-size: 0.7rem;
	color: #bdbdbd;

	ul {
		display: block;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	@media only screen and (max-width: 480px) {
		bottom: 0;
		width: 85%;
		text-align: center;
		font-size: 0.6rem;

	}
`;
