export const url = "https://us-central1-hydra-express.cloudfunctions.net/app"


export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
