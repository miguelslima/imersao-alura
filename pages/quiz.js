import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #ff0000;
  margin: 30px;
`;

export default function Quiz() {
  return (
    <Container>
      <Link href="/">
        <a>Voltar</a>
      </Link>
      <Title>Quiz</Title>
    </Container>
  );
}
