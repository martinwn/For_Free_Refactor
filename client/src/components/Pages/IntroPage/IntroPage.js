import React, { Component } from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import IntroLoginForm from "./IntroLoginForm/IntroLoginForm";
import IntroRegisterFrom from "./IntroRegisterForm/IntroRegisterForm";
import IntroModal from "./IntroModal/IntroModal";
import AuthService from "../../AuthService/AuthService";
import API from "../../../utils/API";

const HomeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1
  display: flex;
`;

const IntroWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  background-position: center;
  background-size: cover;
  position: relative;
`;

const LoginRegisterWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const IntroHeader = styled.h1`
  font-size: 2rem;
  color: #ff2f21;
  letter-spacing: 0.03em;
`;

const IntroBlurb = styled.p`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.03em;
`;

const IntroFooter = styled.footer`
  width: 100%;
  text-align: center;
  border-top: solid 0.3px rgba(0, 0, 0, 0.3);
`;

class IntroPage extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    loginErrors: {},
    loginShow: false,
    loginIsEnabled: false,

    registerEmail: "",
    registerPassword: "",
    registerRepeatPassword: "",
    registerErrors: {},
    registerShow: false,
    registerIsEnabled: false,

    modalOpen: false,
    modalHeadline: "",
    modalContent: ""
  };
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "loginEmail" || name === "loginPassword") {
          return this.validateLogin();
        }
        this.validateRegister();
      }
    );
  };

  handleLogin = e => {
    e.preventDefault();

    this.Auth.login(this.state.loginEmail, this.state.loginPassword)
      .then(response => {
        this.props.history.replace("/");
      })
      .catch(error => {
        this.setState({
          modalHeadline: "Email or Password Incorrect",
          modalContent: "",
          modalOpen: true
        });
      });
  };

  handleRegister = e => {
    e.preventDefault();

    const query = {
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };

    API.registerUser(query)
      .then(response => {
        this.setState({
          modalHeadline: "You've Successfully Registered!",
          modalContent: "Please try loggin in",
          modalOpen: true,
          registerShow: false,
          loginShow: true
        });
      })
      .catch(error => {
        this.setState({
          modalHeadline: "User Already Exists",
          modalContent: "",
          modalOpen: true
        });
      });
  };

  handleShow = e => {
    const { name } = e.target;
    this.setState({ [name]: true });
  };

  closeModal = e => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <HomeWrapper>
        <ContentWrapper>
          <IntroWrapper>
            <IntroSection>
              <IntroHeader>One's Trash is Another's Treasure</IntroHeader>
              <IntroBlurb>See what's for free in your neighborhood.</IntroBlurb>
              <IntroBlurb>
                Want to get rid of something but don't want it to go to waste?
              </IntroBlurb>
              <IntroBlurb>We help people connect so everybody wins.</IntroBlurb>
            </IntroSection>
          </IntroWrapper>
          <LoginRegisterWrapper>
            <LoginWrapper>
              <IntroLoginForm
                email={this.state.loginEmail}
                password={this.state.loginPassword}
                errors={this.state.loginErrors}
                show={this.state.loginShow}
                isEnabled={this.state.loginIsEnabled}
                handleShow={this.handleShow}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
              />
            </LoginWrapper>
            <Modal
              open={this.state.modalOpen}
              onBackdropClick={this.closeModal}
              children={
                <IntroModal
                  headline={this.state.modalHeadline}
                  content={this.state.modalContent}
                  handleClose={this.closeModal}
                />
              }
            />
            <RegisterWrapper>
              <IntroRegisterFrom
                email={this.state.registerEmail}
                password={this.state.registerPassword}
                repeatPassword={this.state.registerRepeatPassword}
                errors={this.state.registerErrors}
                show={this.state.registerShow}
                isEnabled={this.state.registerIsEnabled}
                handleShow={this.handleShow}
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}
              />
            </RegisterWrapper>
          </LoginRegisterWrapper>
        </ContentWrapper>
        <IntroFooter>
          <p>For Free &copy;</p>
        </IntroFooter>
      </HomeWrapper>
    );
  }

  validateLogin = () => {
    const { loginEmail, loginPassword } = this.state;
    let errors = {};
    if (!loginEmail) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginEmail)) {
      errors.email = "Invalid email address";
    }
    if (!loginPassword) {
      errors.password = "Required";
    } else if (loginPassword.length < 6) {
      errors.password = "Must contain at least 6 characters";
    }

    this.setState({ loginErrors: errors }, () => this.enableLogin());
  };

  enableLogin = () => {
    const { loginErrors } = this.state;
    if (!loginErrors.email && !loginErrors.password) {
      this.setState({ loginIsEnabled: true });
    } else {
      this.setState({ loginIsEnabled: false });
    }
  };

  validateRegister = () => {
    const {
      registerEmail,
      registerPassword,
      registerRepeatPassword
    } = this.state;
    let errors = {};

    if (!registerEmail) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerEmail)
    ) {
      errors.email = "Invalid email address";
    }
    if (!registerPassword || !registerRepeatPassword) {
      errors.password = "Required";
    } else if (
      registerPassword.length < 6 ||
      registerRepeatPassword.length < 6
    ) {
      errors.password = "Must contain at least 6 characters";
    } else if (registerPassword !== registerRepeatPassword) {
      errors.password = "Passwords don't match";
    }

    this.setState({ registerErrors: errors }, () => this.enableRegister());
  };

  enableRegister = () => {
    const { registerErrors } = this.state;
    if (!registerErrors.email && !registerErrors.password) {
      this.setState({ registerIsEnabled: true });
    } else {
      this.setState({ registerIsEnabled: false });
    }
  };
}

export default IntroPage;
