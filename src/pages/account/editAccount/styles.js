import styled from "styled-components";

const Container = styled.div`
  .modal {
    position: absolute;
    bottom: 10%;
    left: 38%;
    width: 20rem;
    height: 30rem;
    z-index: 999;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    padding: 35px 20px;
  }

  .modal-top {
    display: flex;
    justify-content: space-between;
  }

  .modal-title {
    font-size: 1.5rem;
    color: black;
    font-weight: 600;
    margin-left: 36%;
  }

  .close {
    font-size: 1.5em;
    svg {
      color: #dedede;
    }
  }

  .modal-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
    cursor: pointer;
    input[type="file"] {
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }

  .profile {
    position: absolute;
    font-size: 6em;
  }

  .camera {
    width: 32px;
    height: 32px;
    background-color: #999999;
    border-radius: 50%;
    font-size: 1.2em;
    position: absolute;
    right: 36%;
    margin-top: 7%;
    svg {
      color: white;
      position: absolute;
      left: 21%;
      top: 21%;
    }
  }
`;

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17%;

  .user-password {
    background-color: #e7f0fe;
  }

  input {
    outline: none;
    border-radius: 0%;
    border: 1px solid #e0e0e0;
    height: 2.5rem;
    padding-left: 15px;
  }

  .user-name {
    display: flex;
    flex-direction: column;
    margin-top: 8%;
    margin-bottom: 7%;
    span {
      color: black;
      font-size: 14px;
      margin-bottom: 2%;
    }
  }

  button {
    background-color: #1239cd;
    color: white;
    height: 2.5rem;
  }
`;

export { Container, UserForm };
