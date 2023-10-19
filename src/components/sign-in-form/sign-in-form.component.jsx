import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  signInWithEmailPassword,
} from "../../utils/firebase/firebase.utils";

import { SigninButtonsContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        console.log(error);
        alert("Email or Password is incorrect!");
      } else {
        console.log(error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleEmailPasswordSignIn}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <SigninButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={handleGoogleSignIn}
          >
            Sign In With Google
          </Button>
        </SigninButtonsContainer>
      </form>
    </div>
  );
};

export default SignInForm;