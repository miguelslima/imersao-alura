import React from "react";

export default function QuizDaGaleraPage() {
  return <div>Desafio</div>;
}

export async function getServerSideProps(context) {
  const dbExterno = await fetch(
    "https://aluraquiz-css.omariosouto.vercel.app/api/db"
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
    props: {},
  };
}
