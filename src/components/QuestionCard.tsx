import React from "react";
//Types
import { AnswerObject } from "../App";
//Styles
import {Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Probs = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const questionCard: React.FC<Probs> = ({
    question,
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions
}) => ( 
    <Wrapper>
        <p className="number">
        Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}}/>
    <div>
        {answers.map(answer => (
            <ButtonWrapper 
            key={answer}
            correct={userAnswer?.correctAnswer === answer }
            userClicked={userAnswer?.answer === answer}
            >
                <button disabled={!!userAnswer} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                </button>
            </ButtonWrapper>
        ))}
    </div>
    
    </Wrapper>
    

);

export default questionCard;