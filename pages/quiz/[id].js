import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split("___");
  
  const dbExterno = await fetch(
    `https://${projectName}.${githubUser}.vercel.app/api/db`
  )
    .then((respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        return respostaDoServidor.json();
      }

      throw new Error("Falha ao converter os dados");
    })
    .then((repostaConvertidaEmObjeto) => {
      return repostaConvertidaEmObjeto;
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(dbExterno);

  return {
    props: {
      dbExterno,
    },
  };
}
