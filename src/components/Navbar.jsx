import styled from "styled-components";
import star from "../assets/star.png";

const Navbar = () => {
	return (
		<NavbarContainer>
			<Image src={star} />
			<Header>THE GIST</Header>
		</NavbarContainer>
	);
};

export default Navbar;

const NavbarContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const Header = styled.h1`
	font-family: "Orbitron", sans-serif;
	font-optical-sizing: auto;
	font-style: normal;
	color: #a9a9a9;
	font-size: 100px;
	opacity: 0.7;
`;

const Image = styled.img`
	height: 100px;
	width: 40%;
`;
