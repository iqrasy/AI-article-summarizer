import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "./FetchApi";
import styled from "styled-components";
import { LuCopy } from "react-icons/lu";
import { BsCheck } from "react-icons/bs";
import BottomLeft from "./BottomLeft";
import creation from "../assets/creation.png";

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

	return (
		<MainContainer>
			<GridContainer>
				<div style={{ gridArea: " 1 / 1 / 2 / 2" }}>
					<HeaderContainer>
						<Header>
							Hello, what would you like me to summarize for you today
						</Header>
					</HeaderContainer>
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
				</div>
				<ImageContainer>
					<BottomLeft />
				</ImageContainer>
				{copied === article.url ? (
					<BsCheck className="check" />
				) : (
					<LuCopy className="copy" onClick={() => handleCopy(article.url)} />
				)}
			</GridContainer>
			<WaveImageContainer>
				<SummaryContainer>
					{error && (
						<Error>
							<p>The server presented itself with an error, please try again</p>
						</Error>
					)}
					{isFetching && (
						<LoadingContainer>
							<p>Please hold while I summarize this for you</p>
						</LoadingContainer>
					)}

					<Summary>{article.summary}</Summary>
				</SummaryContainer>
				<CreationImage src={creation} />
			</WaveImageContainer>
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
	width: 500px;
	margin: 10px;
`;

const HeaderContainer = styled.div`
	height: 250px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: start;
	text-align: start;
	border: solid #a0b9c0 1px;
	padding: 20px;
	border-radius: 10px;
`;

const Header = styled.h1`
	font-family: "ppneuebit-bold";
	font-size: 45px;
	color: #d4e0e7;
	margin: 0 auto;
	font-weight: 800;
	line-height: 0.9;
	flex-wrap: wrap;
	opacity: 0.6;
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: solid #a0b9c0 1px;
	border-radius: 20px;
	padding: 7px 20px;
	width: 100%;
	margin: 20px 0px;
`;

const Input = styled.input`
	border: none;
	outline: none;
	background-color: transparent;
	color: #a0b9c0;
	font-size: 20px;
	width: 300px;
	font-family: "ppneuebit-bold";
`;

const SubmitButton = styled.button`
	border: none;
	background-color: transparent;
	color: #a0b9c0;
`;

const SummaryContainer = styled.div`
	width: 100%;
	height: auto;
	color: #a0b9c0;
	font-family: "ppneuebit-bold";
	border: solid #a0b9c0 1px;
	border-radius: 0.6rem;
	padding: 7px 20px;
`;

const Summary = styled.div`
	height: 700px;
	overflow-y: scroll;
	flex-wrap: wrap;
	line-height: 1.2;
	font-size: 25px;
	padding: 10px 0px;
	scrollbar-color: #a0b9c0;
	scrollbar-width: thin;
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const Error = styled.div`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 2rem;
	width: 50vh;
`;

const ImageContainer = styled.div`
	border-radius: 0.6rem;
	padding: 7px 10px;
	margin: 20px 0px;
`;

const WaveImageContainer = styled.div`
	width: 390px;
	margin: 10px;
	/* border: solid red 1px; */
`;

const CreationImage = styled.img`
	border-radius: 10px;
	margin: 10px 0;
	width: 100%;
`;
