import styled from "styled-components";

const Navbar = () => {
	return (
		<NavbarContainer>
			<Nav>
				<Header>THE GIST</Header>
			</Nav>
		</NavbarContainer>
	);
};

export default Navbar;

const NavbarContainer = styled.div`
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 10px;
	opacity: 0.6;
`;

const Nav = styled.nav`
	width: 100%;
	border: solid #a0b9c0 1px;
	padding: 15px;
	border-radius: 10px;
`;

const Header = styled.h1`
	font-family: "ppneuebit-bold";
	color: #d4e0e7;
	font-size: 50px;
`;
