import Navbar from "./Navbar";
import Main from "./ArticleSummary";
import styled from "styled-components";
import GlobalStyles from "./Globalstyle";
import Footer from "./Footer";

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<MainContainer>
				<InnerContainer>
					<Navbar />
					<Main />
				</InnerContainer>
			</MainContainer>
			<Footer />
		</div>
	);
};

export default App;

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const InnerContainer = styled.div`
	background-image: url("/src/assets/grid.svg");
	background-color: #0c1220;
	margin: 0 auto;
	width: 900px;
	height: 1000px;
`;
