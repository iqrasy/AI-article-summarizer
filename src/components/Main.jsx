import { useState, useEffect } from "react";
import BeanEater from "../assets/BeanEater.svg";
import { useLazyGetSummaryQuery } from "./FetchApi";
import styled from "styled-components";
import { LuCopy } from "react-icons/lu";
import { BsCheck } from "react-icons/bs";

const Main = () => {
	const [article, setArticle] = useState({ url: "", summary: "" });
	const [allArticles, setAllArticles] = useState([]);
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
	const [copied, setCopied] = useState("");

	const isMobile = window.innerWidth <= 768;
	const MAX_CHARACTERS = isMobile ? 40 : 73;

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
		<>
			<div>
				<Header>
					Summarize Articles with
					<Span> OpenAI GPT-4</Span>
				</Header>
				<SubHeading>
					Make your reading easier with QUICK INSIGHTS - an article summarizer
					that turns lengthy articles into clear and concise summaries.
				</SubHeading>
				<History>
					<FormContainer>
						<Form onSubmit={handleSubmit}>
							<div>
								<input
									type="url"
									placeholder="ENTER A URL"
									value={article.url}
									onChange={(e) => {
										setArticle({ ...setArticle, url: e.target.value });
									}}
									required
								/>
							</div>
							<button type="submit" className="btn btn-outline-dark">
								<span>➤</span>
							</button>
						</Form>
						<div>
							<UrlContainer>
								{allArticles.map((item, i) => (
									<div key={i} onClick={() => setArticle(item)}>
										<Urls onClick={() => handleCopy(item.url)}>
											<p>
												{item.url.length > MAX_CHARACTERS
													? `${item.url.slice(0, MAX_CHARACTERS)}...`
													: item.url}
											</p>

											{copied === item.url ? (
												<BsCheck className="check" />
											) : (
												<LuCopy className="copy" />
											)}
										</Urls>
									</div>
								))}
							</UrlContainer>
						</div>
					</FormContainer>
					<div>
						{isFetching ? (
							<Img>
								<img src={BeanEater} alt="infinity loader" />
							</Img>
						) : error ? (
							<Error>
								<p>Oops... Please try again </p>
							</Error>
						) : (
							article.summary && (
								<Summary>
									<h2>
										ARTICLE <span>SUMMARY</span>
									</h2>
									<div>
										<p>{article.summary}</p>
									</div>
								</Summary>
							)
						)}
					</div>
				</History>
			</div>
		</>
	);
};

export default Main;

const Header = styled.h1`
	margin: 0 auto;
	margin-top: 1rem;
	font-weight: 800;
	line-height: 1.15;
	text-align: center;
	font-size: 2.5rem;
	max-width: 70vh;
	color: var(--text-200);
	font-family: "Nippo", sans-serif;
	flex-wrap: wrap;

	@media only screen and (max-width: 480px) {
		font-size: 1.5rem;
		width: 45vh;
	}
`;

const SubHeading = styled.h2`
	padding-top: 1rem;
	font-size: 1rem;
	max-width: 70vh;
	color: var(--text-200);
	text-align: center;
	margin: 0 auto;
	max-width: 36rem;
	font-family: "Quicksand", sans-serif;
	flex-wrap: wrap;

	@media only screen and (max-width: 480px) {
		font-size: 0.8em;
		width: 39vh;
	}
`;

const Span = styled.span`
	background: linear-gradient(90deg, var(--primary-100), var(--primary-200));
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
`;

const FormContainer = styled.div`
	box-shadow: rgb(142, 142, 142) 0px 2px 2px -7px,
		rgb(139, 139, 139) 0px 4px 10px -7px;

	@media only screen and (max-width: 480px) {
		width: 40vh;
	}
`;

const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 3rem;
	position: relative;

	button {
		position: absolute;
		height: 1.9rem;
		border: none;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #bdbdbd;
	}

	div {
		width: 80vh;
		border: solid 1px var(--bg-400);
		border-radius: 0.6rem;
	}

	input {
		border: none;
		outline: none;
		width: 77vh;
		padding: 0.4rem;
		margin: 0.4rem 1rem;
		background-color: transparent;
		color: var(--text-200);
	}

	@media only screen and (max-width: 480px) {
		margin-top: 1rem;

		button {
			height: 1.9rem;
			color: var(--accent-200);
		}

		div {
			width: 36vh;
		}

		input {
			font-size: 0.6rem;
			width: 35vh;
			padding: 0rem;
			margin: 0.4rem 0rem;
		}
	}
`;

const Summary = styled.div`
	color: var(--text-200);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 70vh;
	margin-top: 2rem;
	flex-wrap: wrap;

	p {
		height: 35vh;
		width: 69vh;
		margin-bottom: 2rem;
		overflow-y: scroll;
		padding: 2rem;
		flex-wrap: wrap;
		line-height: 2;
	}

	h2 {
		margin-bottom: 2rem;
	}

	span {
		background: linear-gradient(90deg, var(--primary-100), var(--primary-200));
		background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}

	@media only screen and (max-width: 480px) {
		width: 37vh;

		h2 {
			font-size: 1rem;
		}

		p {
			height: 35vh;
			width: 39vh;
			padding: 0.5rem 0rem;
			flex-wrap: wrap;
			line-height: 2.3;
			font-size: 0.8rem;
		}
	}
`;

const History = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const UrlContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	z-index: 10;
	box-shadow: rgb(142, 142, 142) 0px 2px 2px -7px,
		rgb(139, 139, 139) 0px 4px 10px -7px;
	border-radius: 0.5rem;

	p {
		margin: 0 auto;
		margin: 0.4rem 1rem;
		width: 75vh;
		color: var(--primary-200);
		font-size: 0.9rem;
	}

	@media only screen and (max-width: 480px) {
		p {
			margin: 0rem;
			width: 29vh;
			font-size: 0.6rem;
		}
	}
`;

const Urls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin: 0.2rem;
	width: 80vh;
	cursor: pointer;
	color: rgb(199, 192, 239);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	.copy,
	.check {
		color: var(--text-200);
	}

	@media only screen and (max-width: 480px) {
		width: 38vh;
		padding: 0.6rem;
	}
`;

const Img = styled.div`
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
