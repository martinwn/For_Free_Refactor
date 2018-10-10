import React, { Component } from "react";
import styled, { css } from "styled-components";

const LoginWrapper = styled.section`
  width: 350px;
`;

const LoginHeader = styled.h1`
  font-size: 2.4rem;
  letter-spacing: 0.08em;
  color: #ff2f21;
  text-align: center;

  ${props =>
    props.hide &&
    css`
      display: none;
    `};
`;

const LoginKicker = styled.p`
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const LoginButton = styled.button`
  font-family: Ubuntu, sans-serif;

  cursor: pointer;
  width: 100%;
  border: solid 2px #e2281b;
  color: #fff;
  background: #ff665b;
  border-radius: 20px;
  padding: 7px;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  transition: background-color ease-in-out 150ms;

  :hover {
    background-color: #ff2f21;
  }

  ${props =>
    props.hide &&
    css`
      display: none;
    `};
`;

const StyledLoginForm = styled.form`
  display: none;

  ${props =>
    props.show &&
    css`
      display: flex;
      flex-direction: column;
    `};
`;

const LoginInput = styled.input`
  font-size: 1.1rem;
  font-family: Ubuntu, sans-serif;
  padding: 7px;
  border: solid 2px #e2281b;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 5px;
  margin: 6px 0;
  box-sizing: border-box;
  transition: border-top-color ease-in-out 150ms,
    border-bottom-color ease-in-out 150ms;
  background: #fff !important;

  :focus {
    border-top-color: #e2281b;
    border-bottom-color: #e2281b;
  }

  ${props =>
    props.error &&
    css`
      border-color: black !important;
    `};
`;

const LoginSubmitButton = styled.button`
  font-family: Ubuntu, sans-serif;
  cursor: pointer;
  width: 100%;
  border: solid 2px #e2281b;
  color: black;
  background: #fff;
  border-radius: 20px;
  padding: 7px;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  transition: background-color ease-in-out 150ms;
  margin-top: 8px;

  :hover {
    background-color: #ff665b;
  }

  ${props =>
    props.disabled &&
    css`
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      border-color: rgba(0, 0, 0, 0.3);
      cursor: default;
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    `};
`;

const Error = styled.span`
  margin: 3px 0;
  font-size: 0.8rem;
  color: #e2281b;
  line-height: 0;
`;

class IntroLoginForm extends Component {
  render() {
    const {
      email,
      password,
      errors,
      show,
      isEnabled,
      handleShow,
      handleChange,
      handleLogin
    } = this.props;
    return (
      <LoginWrapper>
        <LoginHeader hide={show}>For Free</LoginHeader>
        <LoginKicker>Already Have an Account?</LoginKicker>
        <LoginButton name="loginShow" onClick={handleShow} hide={show}>
          Log In
        </LoginButton>
        <StyledLoginForm show={show}>
          <Error>{errors.email}</Error>
          <LoginInput
            autoComplete="off"
            name="loginEmail"
            type="text"
            error={errors.email}
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
          <Error>{errors.password}</Error>
          <LoginInput
            name="loginPassword"
            type="password"
            error={errors.password}
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
          />
          <LoginSubmitButton
            type="button"
            disabled={!isEnabled}
            onClick={handleLogin}
          >
            Login
          </LoginSubmitButton>
        </StyledLoginForm>
      </LoginWrapper>
    );
  }
}

export default IntroLoginForm;
