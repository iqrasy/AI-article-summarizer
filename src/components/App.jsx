// import React from "react";
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
		opacity: 1;
		filter: invert(1);
	}
`;

const Apps = styled.div`
	z-index: 10;
`;
