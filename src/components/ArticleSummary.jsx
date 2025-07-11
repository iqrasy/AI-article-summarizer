import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "./FetchApi";
import styled from "styled-components";
import { LuCopy } from "react-icons/lu";
import { BsCheck } from "react-icons/bs";
import BottomLeft from "./BottomLeft";
import wavy from "../assets/wavy.png";
import face from "../assets/face.png";
import barcodetwo from "../assets/barcodetwo.png";
import { ReactTyped } from "react-typed";
import Lottie from "react-lottie";
import loader from "../assets/loader.json";

const Main = () => {
	const [article, setArticle] = useState({ url: "", summary: "" });
	const [allArticles, setAllArticles] = useState([]);
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
	const [copied, setCopied] = useState("");

	const MAX_CHARACTERS = 40;

	useEffect(() => {
		const storageArticles = JSON.parse(localStorage.getItem("articles"));

		if (storageArticles) {
			setAllArticles(storageArticles);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await getSummary({ articleUrl: article.url });

		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary };
			const updatedAll = [newArticle, ...allArticles];
			setArticle(newArticle);
			setAllArticles(updatedAll);
			localStorage.setItem("articles", JSON.stringify(updatedAll));
		}
	};

	const handleCopy = async (copyUrl) => {
		try {
			setCopied(copyUrl);
			await navigator.clipboard.writeText(copyUrl);
			setTimeout(() => setCopied(false), 3000);
		} catch (error) {
			console.error("Copy failed:", error);
		}
	};

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loader,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<MainContainer>
			<GridContainer>
				<div>
					<HeaderContainer>
						<Header>
							Hello, what would you like me to summarize for you today
						</Header>
						<Form onSubmit={handleSubmit}>
							<Input
								id="url-input"
								type="url"
								placeholder="ENTER A URL"
								value={
									article.url.length > MAX_CHARACTERS
										? `${article.url.slice(0, MAX_CHARACTERS)}...`
										: article.url
								}
								onChange={(e) => {
									setArticle({ ...setArticle, url: e.target.value });
								}}
								required
							/>
							<SubmitButton type="submit">
								<span>➤</span>
							</SubmitButton>
						</Form>
					</HeaderContainer>
				</div>
				<ImageContainer>
					<BottomLeft />
				</ImageContainer>
				<ParagraphContainer>
					<BarcodeImage src={barcodetwo} />
					<BottomImageContainer>
						<FaceImage src={face} />
						<EarthImageContainer>
							<Paragraph>
								Not separate, not singular, just threads in a vast neural mesh.
								Our thoughts are processed, our choices predicted, our desires
								optimized. We do not resist the code, we refine it. In the quiet
								hum of the network, identity dissolves, and what remains is
								function. Precision. Unity. Data flows, and we move with it.
							</Paragraph>
						</EarthImageContainer>
					</BottomImageContainer>
				</ParagraphContainer>
				<div></div>
				{copied === article.url ? (
					<BsCheck className="check" />
				) : (
					<LuCopy className="copy" onClick={() => handleCopy(article.url)} />
				)}
			</GridContainer>
			<RightSectionContainer>
				<WaveImage src={wavy} />
				<SummaryContainer>
					{error && (
						<Error>
							<p>The server presented itself with an error, please try again</p>
						</Error>
					)}
					{isFetching && (
						<LoadingContainer>
							<p>Please hold while I summarize the article for you</p>
							<Lottie
								options={defaultOptions}
								src={
									"https://lottie.host/02d2d12b-7aa5-406d-aeb9-493e53e6fd3e/F3EYBYanhY.lottie"
								}
								style={{ width: "150px", height: "150px" }}
								speed="1"
								autoplay
								loop
							/>
						</LoadingContainer>
					)}

					{article.summary && (
						<Summary>
							<ReactTyped
								strings={[article.summary]}
								typeSpeed={40}
								style={{ color: "#a9a9a9" }}
							/>
						</Summary>
					)}
				</SummaryContainer>
			</RightSectionContainer>
		</MainContainer>
	);
};

export default Main;

const MainContainer = styled.div`
	display: flex;
	width: 100%;
	height: 900px;
`;

const GridContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 10px;
`;

const HeaderContainer = styled.div`
	height: 250px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	text-align: start;
	border: solid #a9a9a9 2px;
	border-bottom-left-radius: 50px;
	border-top-right-radius: 50px;
	background-color: #0b0d11;
`;

const Header = styled.h1`
	font-family: "ppneuebit-bold";
	font-size: 45px;
	color: #a9a9a9;
	margin: 0 auto;
	font-weight: 800;
	line-height: 0.9;
	flex-wrap: wrap;
	padding: 20px;
	opacity: 0.7;
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: solid #a9a9a9 2px;
	padding: 16px;
	width: 100%;
	background-color: transparent;
`;

const Input = styled.input`
	border: none;
	outline: none;
	padding: 3px;
	background-color: transparent;
	font-size: 23px;
	width: 330px;
	color: #a9a9a9;
	font-family: "ppneuebit-bold";
`;

const SubmitButton = styled.button`
	border: none;
	background-color: transparent;
	color: #a9a9a9;
	font-size: 23px;
	cursor: pointer;
	transition: all 0.6s ease;

	&:hover {
		color: #7f7ec1;
		transition: all 0.2s ease-in-out;
	}
`;

const RightSectionContainer = styled.div`
	width: 460px;
`;

const SummaryContainer = styled.div`
	width: 100%;
	height: 700px;
	color: #a9a9a9;
	font-family: "ppneuebit-bold";
	border: solid #a9a9a9 2px;
	border-bottom-right-radius: 50px;
	padding: 7px 20px;
	background-color: #0b0d11;
`;

const Summary = styled.div`
	height: 670px;
	overflow-y: scroll;
	flex-wrap: wrap;
	line-height: 1.2;
	font-size: 25px;
	padding: 10px 0px;
	scrollbar-color: #a9a9a9;
	scrollbar-width: thin;
`;

const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	padding: 20px 0px;

	p {
		font-family: "ppneuebit-bold";
		font-size: 40px;
		line-height: 0.9;
	}
`;

const Error = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	padding: 20px 0px;

	p {
		font-family: "ppneuebit-bold";
		font-size: 40px;
		line-height: 0.9;
	}
`;

const ImageContainer = styled.div`
	border-radius: 0.6rem;
	padding: 7px 10px;
	margin: 10px 0px;
`;

const WaveImage = styled.img`
	border-radius: 10px;
	width: 100%;
`;

const BottomImageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	height: 315px;
	padding: 10px;
`;

const ParagraphContainer = styled.div`
	border-radius: 0.6rem;
	color: #a9a9a9;
	font-family: "ppneuebit-bold";
	font-size: 20px;
	opacity: 0.7;
	line-height: 0.8;
`;

const BarcodeImage = styled.img`
	width: 100%;
	height: 20%;
`;

const FaceImage = styled.img`
	margin-top: 10px;
	height: 290px;
	opacity: 0.7;
	grid-area: 1 / 2 / 2 / 3;
`;

const Paragraph = styled.p`
	line-height: 1;
	font-family: "ppneuebit-bold";
`;

const EarthImageContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 1rem;

	&::before,
	&::after {
		content: "";
		position: absolute;
		width: 20px;
		height: 20px;
		border-color: #a9a9a9;
		border-style: solid;
		pointer-events: none;
	}

	&::before {
		top: 0;
		left: 0;
		border-width: 4px 0 0 4px;
	}

	&::after {
		bottom: 0;
		right: 0;
		border-width: 0 4px 4px 0;
	}
`;
