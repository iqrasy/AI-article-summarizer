import { useState, useEffect } from "react";
import { loader } from "../assets";
import { useLazyGetSummaryQuery } from "./Article";
import styled from "styled-components";
import { LuCopy } from "react-icons/lu";
import { BsCheck } from "react-icons/bs";

const Demo = () => {
	const [article, setArticle] = useState({ url: "", summary: "" });
	const [allArticles, setAllArticles] = useState([]);
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
	const [copied, setCopied] = useState("");

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
		<section>
			<Hone>
				Summarize Articles with
				<Span> OpenAI GPT-4</Span>
			</Hone>
			<Htwo>
				Simplify your reading with SUMMX, an article sumarizer that transforms
				lengthy artices into clear and concise summaries
			</Htwo>
			<History>
				<Form onSubmit={handleSubmit}>
					<div>
						<input
							type="url"
							placeholder="Enter a URL"
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
					<His>
						<h3></h3>
						{allArticles.map((item, i) => (
							<div key={i} onClick={() => setArticle(item)}>
								<Url onClick={() => handleCopy(item.url)} style={{}}>
									{copied === item.url ? (
										<BsCheck
											style={{
												marginRight: ".7rem",
												color: "white",
												fontSize: "1.5rem",
											}}
										/>
									) : (
										<LuCopy style={{ marginRight: ".7rem", color: "white" }} />
									)}

									<p>{item.url}</p>
								</Url>
							</div>
						))}
					</His>
					<div>
						{isFetching ? (
							<img src={loader} alt="loader" />
						) : error ? (
							<p>
								That was not supposed to happen, Please try again
								<br />
								<span>{error?.data?.error}</span>
							</p>
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
				</div>
			</History>
		</section>
	);
};

export default Demo;

const Hone = styled.h1`
	margin: 0 auto;
	margin-top: 1rem;
	font-weight: 800;
	line-height: 1.15;
	text-align: center;
	font-size: 3rem;
	color: #bdbdbd;
`;

const Htwo = styled.h2`
	padding-top: 1rem;
	font-size: 1rem;
	color: #c1bebe;
	text-align: center;
	margin: 0 auto;
	max-width: 36rem;
`;

const Span = styled.span`
	background: linear-gradient(90deg, #ef497b, #c50471, #ef497b);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
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
		width: 50rem;
		box-shadow: rgb(142, 142, 142) 0px 5px 5px -5px,
			rgb(139, 139, 139) 0px 10px 20px -5px;
		border: solid 1px grey !important;
		border-radius: 0.6rem;
	}

	input {
		border: none;
		width: 44rem;
		padding: 0.4rem;
		margin: 0.4rem 2.5rem;
		background-color: transparent;
		color: #bdbdbd;
	}
`;

const Summary = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	color: #bdbdbd;

	h2 {
		margin-bottom: 2rem;
	}

	p {
		height: 20rem;
		width: 40rem;
		overflow-y: scroll;
	}

	span {
		background: linear-gradient(10deg, #ef497b, #c50471, #ef497b);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
`;

const History = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow-y: auto;
	width: 70rem;
`;

const His = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;

	p {
		margin: 0 auto;
		width: 60rem;
		max-width: 70rem;
		height: auto;
		overflow-y: auto;
		/* color: #bdbdbd; */
		color: #e782a0;
	}
`;

const Url = styled.div`
	display: flex;
	padding: 0.5rem;
	margin: 0.2rem;
	width: 50rem;
	cursor: pointer;
	color: rgb(199, 192, 239);
	box-shadow: rgb(142, 142, 142) 0px 2px 2px -7px,
		rgb(139, 139, 139) 0px 4px 10px -7px;
	border-radius: 0.5rem;
`;
