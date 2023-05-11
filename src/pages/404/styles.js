import styled from "styled-components";

export const PageNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  font-size: 2rem;
  h1 {
    font-size: 10rem;
    color: #ff0000;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
    font-weight: bold;
    line-height: 1.2;
    text-shadow: 1px 1px 1px #000000;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  h2 {
    font-size: 2rem;
    color: #000000;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
    font-weight: bold;
    line-height: 1.2;
    text-shadow: 1px 1px 1px #000000;
  }
`;
