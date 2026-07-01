let authTermsAccepted = false;

export const markAuthTermsAccepted = (): void => {
  authTermsAccepted = true;
};

export const consumeAuthTermsAccepted = (): boolean => {
  const accepted = authTermsAccepted;
  authTermsAccepted = false;
  return accepted;
};
