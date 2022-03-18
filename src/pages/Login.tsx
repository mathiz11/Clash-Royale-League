import {
  Alert,
  AlertIcon,
  Button,
  Center,
  CloseButton,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import "../styles/Login.css"
import authService from "../services/authService";
import { ACTIONS, useStore } from "../components/Store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginValues } from "../utils/form";
import logo from "../images/cr-logo.png"

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const initialValues: LoginValues = {email: "", password: ""};
  const [, dispatch] = useStore();
  const navigate = useNavigate();

  function signIn(values: FormikValues) {
    setLoading(true);
    authService.signIn(values.email, values.password).then((response) => {
      if (response.ok) {
        dispatch({
          type: ACTIONS.SIGN_IN,
          payload: {user: response.data},
        });
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        setErrorMessage(response.message);
      }
    });
  }

  return (
    <main>
      <Container pt={10}>
        {errorMessage && (
          <Alert status="error" className="pt">
            <AlertIcon/>
            {errorMessage}
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setErrorMessage(undefined)}
            />
          </Alert>
        )}
        <Center>
          <img src={logo} alt="Logo Clash Royale" width={320}/>
        </Center>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={signIn}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({values, setFieldValue, errors}) => (
            <Form>
              <FormControl className="pt" isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                />
                {!!errors.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl className="pt" isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                />
                {!!errors.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <Center>
                <Button
                  className="pt"
                  type="submit"
                  colorScheme={"blue"}
                  isLoading={loading}
                >
                  Connexion
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
};

export default Login;
