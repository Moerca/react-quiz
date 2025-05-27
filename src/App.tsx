import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionState, Difficulty } from './API';
import { GlobalStyle, Wrapper, AnimatedLetter, Button } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // Für Animation: aktueller "springender" Buchstabenindex
  const [animatedIndex, setAnimatedIndex] = useState(0);

  // Animation Loop (alle 600ms Index erhöhen)
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setAnimatedIndex(prev => (prev + 1) % 7); // Word length
      }, 600);
      return () => clearInterval(interval);
    } else {
      setAnimatedIndex(0);
    }
  }, [gameOver]);

  // Start Quiz
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // Antwort prüfen
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  // Nächste Frage
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  // H1 Text splitten und Buchstaben animiert darstellen
  const title = "GAME QUIZ";
  const letters = title.split("");

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1 aria-label={title} role="heading">
          {letters.map((char, i) => (
            <AnimatedLetter
              key={i}
              index={i}
              animatedIndex={animatedIndex}
              aria-hidden="true"
            >
              {char}
            </AnimatedLetter>
          ))}
        </h1>

        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <Button className="start" onClick={startTrivia}>Start</Button>
        )}

        {!gameOver && <p className="score">Score: {score}</p>}

        {loading && <p>Loading Questions ...</p>}

        {!loading && !gameOver && questions.length > 0 && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
          <Button className="next" onClick={nextQuestion}>Next Question</Button>
        )}
      </Wrapper>
    </>
  );
};

export default App;
