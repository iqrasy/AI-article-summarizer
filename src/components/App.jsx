import Header from "./Header";
import Main from "./Main";
import styled from "styled-components";
import GlobalStyles from "./Globalstyle";
import Footer from "./Footer";

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<Header />
			<Mains>
				<Apps>
					<Main />
				</Apps>
			</Mains>
			<Footer />
		</div>
	);
};

export default App;

const Mains = styled.div`
	display: flex;
	justify-content: center;

	&:after {
		content: "";
		background-image: url("/src/assets/grid.svg");
		z-index: -10;
		position: fixed;
		width: 100%;
		height: 100vh;
		opacity: 1;
		filter: invert(1);
	}

	@media only screen and (max-width: 480px) {
		height: 100svh;
	}
`;

const Apps = styled.div`
	z-index: 10;
`;
