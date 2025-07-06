import { useEffect, useRef } from "react";
import world from "../assets/world.png";
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
					<EarthImage src={world} />
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
	/* border: solid red 1px; */
	padding: 0 10px;
`;

const HackerContainer = styled.div`
	width: 300px;
	height: 130px;
	border: 3px solid #ff00fe;
	color: #ff00fe;
	font-family: "Courier New", monospace;
	font-weight: bold;
	font-size: 17px;
	padding: 10px;
	overflow: hidden;
	white-space: pre;
`;

const AnimatedText = styled.div`
	height: 100%;
	width: 100%;
	line-height: 1.2;
	user-select: none;
	white-space: pre;
`;

const EarthContainer = styled.div`
	border: solid #ff00fe 3px;
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
		color: #a0b9c0;
		font-size: 30px;
	}
`;
