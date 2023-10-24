// import logo from "../assets/logo.svg";
import styled from "styled-components";
import { RiTreeLine } from "react-icons/ri";

const Header = () => {
	return (
		<Headers>
			<Nav className="navbar navbar-light bg-light">
				<div>
					<RiTreeLine style={{ color: "#d5cfcf", fontSize: "1.5rem" }} />
					<h5>SUMMX</h5>
				</div>
				<button
					className="btn btn-outline-light"
					type="button"
					onClick={() => {
						window.open("https://github.com/iqrasy");
					}}
				>
					Github
				</button>
			</Nav>
		</Headers>
	);
};

export default Header;

const Headers = styled.header`
	width: 100%;
	justify-content: center;
	align-items: flex-start;
`;

const Nav = styled.nav`
	background-color: transparent !important;
	width: 100%;
	margin-bottom: 3rem;
	padding-top: 1rem;

	button {
		cursor: pointer;
	}

	h5 {
		margin-left: 0.5rem;
		margin-top: 0.5rem;
		color: #d5cfcf;
	}

	div {
		display: flex;
		align-items: center;
	}
`;
