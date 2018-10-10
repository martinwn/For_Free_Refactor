import React, { Component } from "react";
import styled, { css } from "styled-components";

const RegisterWrapper = styled.section`
  min-width: 350px;
`;

const RegisterKicker = styled.p`
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const RegisterButton = styled.button`
  cursor: pointer;
  width: 100%;
  border: solid 2px #e2281b;
  color: black;
  background: #fff;
  border-radius: 20px;
  padding: 7px;
  font-size: 1.1rem;
  font-family: Ubuntu, sans-serif;

  letter-spacing: 0.05rem;
  transition: background-color ease-in-out 150ms;

  :hover {
    background-color: #ff665b;
  }

  ${props =>
    props.hide &&
    css`
      display: none;
    `};
`;

const StyledRegisterForm = styled.form`
  display: none;

  ${props =>
    props.show &&
    css`
      display: flex;
      flex-direction: column;
    `};
`;

const RegisterInput = styled.input`
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

const RegisterSubmitButton = styled.button`
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
    props.disabled &&
    css`
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

class IntroRegisterForm extends Component {
  render() {
    const {
      email,
      password,
      repeatPassword,
      errors,
      show,
      isEnabled,
      handleShow,
      handleChange,
      handleRegister
    } = this.props;

    return (
      <RegisterWrapper>
        <RegisterKicker>Haven't Registered?</RegisterKicker>
        <RegisterButton name="registerShow" onClick={handleShow} hide={show}>
          Sign Up
        </RegisterButton>
        <StyledRegisterForm show={show}>
          <Error>{errors.email}</Error>
          <RegisterInput
            autoComplete="off"
            name="registerEmail"
            type="text"
            placeholder="Enter Email"
            error={errors.email}
            value={email}
            onChange={handleChange}
          />
          <Error>{errors.password}</Error>
          <RegisterInput
            name="registerPassword"
            type="password"
            placeholder="Enter Password"
            error={errors.password}
            value={password}
            onChange={handleChange}
          />
          <RegisterInput
            name="registerRepeatPassword"
            type="password"
            placeholder="Retype Password"
            error={errors.password}
            value={repeatPassword}
            onChange={handleChange}
          />
          <RegisterSubmitButton
            onClick={handleRegister}
            type="button"
            disabled={!isEnabled}
          >
            Register
          </RegisterSubmitButton>
        </StyledRegisterForm>
      </RegisterWrapper>
    );
  }
}

export default IntroRegisterForm;
