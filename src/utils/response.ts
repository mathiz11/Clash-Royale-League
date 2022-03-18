export type ReqResponse<T> = {
  ok: boolean;
  data?: T;
  message?: string;
};

export function getMessageFromErrorCode(error: string) {
  switch (error) {
    case "auth/user-not-found":
      return "Votre email et/ou mot de passe sont incorrects.";
    case "auth/wrong-password":
      return "Votre email et/ou mot de passe sont incorrects.";
    default:
      return "Un problème est survenu, veuillez contacter l'administrateur du site.";
  }
}
