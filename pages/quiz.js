import React, { useEffect, useState } from "react";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";

import db from "../db.json";

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Tela de resultados:</Widget.Header>

      <Widget.Content>
        <p>
          Você acertou{" "}
          {results.reduce((somatorioAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatorioAtual + 1;
            }
            return somatorioAtual;
          }, 0)}{" "}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li>
              #0{index + 1} Resultado: {result === true ? "Acertou" : "Errou"}{" "}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit }) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorret = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsFormSubmited(true);
            setTimeout(() => {
              onSubmit();
              setIsFormSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isFormSubmited && isCorret && <p>Você acertou!</p>}
          {isFormSubmited && !isCorret && <p>Você errou!</p>}
        </form>

        {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.RESULT);
  const [results, setResults] = useState([true, false, true]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setScreenState(screenStates.QUIZ);
  //   }, 1 * 1000);
  // }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            question={question}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

export default QuizPage;
