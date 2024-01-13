import styled from "styled-components";
import { RiTreeLine } from "react-icons/ri";

const Header = () => {
	return (
		<Headers>
			<Nav>
				<div>
					<h5>QUICK INSIGHTS</h5>
					<RiTreeLine className="tree" />
				</div>
			</Nav>
		</Headers>
	);
};

export default Header;

const Headers = styled.header`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const Nav = styled.nav`
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

	.tree {
		color: white;
		font-size: 1.5rem;
		margin-left: 0.4rem;
		margin-bottom: 0.2rem;
	}

	@media only screen and (max-width: 480px) {
		h5 {
			font-size: 0.8rem;
		}

		.tree {
			font-size: 1rem;
			margin-left: 0.4rem;
			margin-bottom: 0.4rem;
		}
	}
`;
