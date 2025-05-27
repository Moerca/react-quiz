import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import BGImage from './images/Background.gif';

// Globale Styles
export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    margin: 2px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    box-sizing: border-box;
    font-family: 'Jersey 15', sans-serif;
  }
`;

// Wrapper mit Layout
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin-top: 10px;
  }

  h1 {
    font-family: 'Jersey 15', cursive;
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 10px;

    background: linear-gradient(180deg, #fffcf2, #87f1ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;

    text-shadow: 0 0 5px #ffffff, 0 0 10px #87f1ff, 0 0 20px #87f1ff;
  }
`;

// Sanfte "hoch-und-runter" Animation für Buchstaben
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

// Pastell Regenbogenfarben (leicht und weich)
const pastelRainbow = [
  "#fbc7c7", // rosa
  "#fbe7c7", // hellorange
  "#f6fbc7", // hellgelb
  "#dffbc7", // hellgrün
  "#c7fbe5", // türkis
  "#c7d9fb", // hellblau
  "#e7c7fb", // flieder
];

// Hilfsfunktion: Farbe basierend auf Index ausgeben
const getPastelColor = (index: number) => pastelRainbow[index % pastelRainbow.length];

// Animation für einzelnen Buchstaben mit Versatz
export const AnimatedLetter = styled.span<{ index: number; animatedIndex: number }>`
  display: inline-block;
  animation: ${bounce} 0.6s ease-in-out infinite;
  animation-delay: ${({ index, animatedIndex }) => `${(index - animatedIndex) * 0.1}s`};

  color: ${({ index, animatedIndex }) => {
    const diff = Math.abs(index - animatedIndex);
    if (diff > 1) return "transparent"; // nur Buchstaben +1/-1 zeigen Farbe, andere transparent
    // Farbe ändert sich beim hüpfen: Mittelpunkt bunt, nebendran leichter Farbton
    return diff === 0
      ? getPastelColor(index)  // mittlerer Buchstabe Farbe 1
      : getPastelColor(index + 1); // nebendran Farbe 2
  }};

  filter: drop-shadow(0 0 4px rgba(255 255 255 / 0.7));
  transition: color 0.3s ease;
`;

export const Button = styled.button`
  cursor: pointer;
  background: linear-gradient(135deg, #fbc7c7, #c7fbe5);
  border: 4px solid #c7fbe5;
  box-shadow: 0px 6px 0px #a5d6c8;
  border-radius: 4px; // statt 15px → kantiger
  height: 50px;
  margin: 20px 0;
  padding: 0 40px;

  color:rgb(15, 43, 91);
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.15s ease-in-out;

 &:hover {
  background: linear-gradient(135deg, #fbc7c7, #c7fbe5);

  box-shadow:
    0 0 0 2px #fff,
    0 0 6px 3px #c7fbe5,
    0 0 10px 5px #fbc7c7;
  transform: translateY(-2px) scale(1.03);
}

  &:active {
    box-shadow: none;
    transform: translateY(4px);
  }
`;
