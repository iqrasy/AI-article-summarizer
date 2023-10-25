// import React from "react";
import Header from "./Header";
import Main from "./Main";
import styled from "styled-components";
import GlobalStyles from "./Globalstyle";
import Footer from "./Footer";

const App = () => {
	return (
		<>
			<main>
				<GlobalStyles />
				<Mains>
					<Apps>
						<Header />
						<Main />
					</Apps>
				</Mains>
				<Foot>
					<Footer />
				</Foot>
			</main>
		</>
	);
};

export default App;

const Mains = styled.div`
	width: 100vw;
	min-height: 100vh;
	position: fixed;
	display: flex;
	justify-content: center;

	&:before {
		position: absolute;
		content: "";
		z-index: 2;
		width: 100%;
		height: 100%;
		top: 0;
	}

	&:after {
		content: "";
		background-image: url("/src/assets/grid.svg");
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.4;
		filter: invert(1);
	}
`;

const Apps = styled.div`
	width: 70%;
	max-width: 90%;
	z-index: 10;
	align-items: center;
	flex-direction: column;
	display: flex;
`;

const Foot = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
