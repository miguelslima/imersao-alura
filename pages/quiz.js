import React from "react";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";

import db from "../db.json";
import { func } from "prop-types";

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, totalQuestions, questionIndex }) {
  const questionId = `question__${questionIndex}`;

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

        <form action="">
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input id={alternativeId} type="radio" name={questionId} />
                {alternative}
              </Widget.Topic>
            );
          })}
        </form>

        {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}

        <Button>Confirmar</Button>
      </Widget.Content>
    </Widget>
  );
}

function QuizPage() {
  const totalQuestions = db.questions.length;
  const questionIndex = 0;
  const question = db.questions[questionIndex];

  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />
        <QuestionWidget
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          question={question}
        />
        <LoadingWidget />
      </QuizContainer>
    </QuizBackground>
  );
}

export default QuizPage;
