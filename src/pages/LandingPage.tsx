import React from "react";
import styled from "styled-components";

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: white;
  color: #764ba2;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LandingPage: React.FC = () => {
  return (
    <LandingContainer>
      <Title>환영합니다!</Title>
      <Subtitle>당신의 새로운 여정이 여기서 시작됩니다.</Subtitle>
      <Button>시작하기</Button>
    </LandingContainer>
  );
};

export default LandingPage;
