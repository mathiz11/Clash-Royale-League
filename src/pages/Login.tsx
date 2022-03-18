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
  Image,
  Input,
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import { NextPage } from "next";
import { loginSchema, LoginValues } from "../utils/form";
import styles from "../styles/login.module.css";
import authService from "../services/authService";
import { ACTIONS, useStore } from "../components/Store";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const initialValues: LoginValues = {email: "", password: ""};
  const [, dispatch] = useStore();
  const router = useRouter();

  function signIn(values: FormikValues) {
    setLoading(true);
    authService.signIn(values.email, values.password).then((response) => {
      if (response.ok) {
        dispatch({
          type: ACTIONS.SIGN_IN,
          payload: {user: response.data},
        });
        setLoading(false);
        router.push("/");
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
          <Alert status="error" className={styles.pt}>
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
          <Image src="cr-logo.png" alt="Logo Clash Royale" width={320}/>
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
              <FormControl className={styles.pt} isInvalid={!!errors.email}>
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
              <FormControl className={styles.pt} isInvalid={!!errors.password}>
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
                  className={styles.pt}
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
