import { useEffect, useRef } from "react";
import earth from "../assets/earth.png";
import styled from "styled-components";

const BottomLeft = () => {
	const textRef = useRef(null);

	useEffect(() => {
		const charset = "01#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const rows = 8;
		const cols = 40;
		const interval = setInterval(() => {
			if (textRef.current) {
				let newText = "";
				for (let r = 0; r < rows; r++) {
					let line = "";
					for (let c = 0; c < cols; c++) {
						line += charset[Math.floor(Math.random() * charset.length)];
					}
					newText += line + "\n";
				}
				textRef.current.innerText = newText;
			}
		}, 300);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<ImageContainer>
				<EarthContainer>
					<EarthImage src={earth} />
				</EarthContainer>
				<HackerContainer>
					<AnimatedText ref={textRef} />
				</HackerContainer>
				<IconContainer>
					<p>✧</p>
					<p>✦</p>
					<p>✧</p>
					<p>✧</p>
				</IconContainer>
			</ImageContainer>
		</>
	);
};

export default BottomLeft;

const ImageContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

const HackerContainer = styled.div`
	width: 300px;
	height: 130px;
	border: 1px solid #a9a9a9;
	border-radius: 10px;
	color: #a9a9a9;
	font-family: "Courier New", monospace;
	font-weight: bold;
	font-size: 13px;
	overflow: hidden;
	white-space: pre;
`;

const AnimatedText = styled.div`
	height: 100%;
	width: 100%;
	line-height: 1.2;
	user-select: none;
	white-space: pre;
	text-align: center;
	opacity: 0.8;
`;

const EarthContainer = styled.div`
	border: solid #a9a9a9 1px;
	border-radius: 10px;
	padding: 10px;
`;

const EarthImage = styled.img`
	display: inline-block;
	height: 100px;
	overflow: hidden;
	animation: spin 6s linear infinite;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;

	p {
		color: #a9a9a9;
		font-size: 30px;
	}
`;
