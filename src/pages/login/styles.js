import styled from "styled-components";
import { containerStyle } from "../../styles/styleConstants";

const Container = styled.div`
  ${containerStyle}
  display: grid;
  place-items: center;
  padding: 0.75rem 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  input[type="text"],
  input[type="password"] {
    padding: 0.75rem 1rem;
    border: 1px solid lightgray;
    outline: none;
  }

  input[type="password"] {
    border-top: none;
    margin-bottom: 1rem;
  }

  input[type="submit"] {
    padding: 0.75rem 1rem;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    border: 1px solid #27397d;
  }
`;

export { Container, Form };
