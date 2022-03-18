import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { getMessageFromErrorCode, ReqResponse } from "../utils/response";

export type User = {
  email: string;
};

function signIn(email: string, password: string): Promise<ReqResponse> {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => ({ok: true, data: userCredential.user}))
    .catch((error) => ({ok: false, message: getMessageFromErrorCode(error.code)}))
}

function logOut(): Promise<ReqResponse> {
  const auth = getAuth();
  return auth.signOut()
    .then(() => ({ok: true}))
    .catch((error) => ({ok: false, message: getMessageFromErrorCode(error.code)}))
}

function isAuth(): boolean {
  const auth = getAuth()
  console.log(auth.currentUser)
  return !!auth.currentUser
}

const authService = {
  signIn,
  isAuth,
  logOut
};

export default authService;
