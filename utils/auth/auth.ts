import * as LocalAuthentication from "expo-local-authentication";

export async function handleBiometricAuthentication(
  options: AuthenticationOptions
): Promise<boolean> {
  const {
    dispatch,
    setUnlocked,
    setAppLocked,
    setError,
    router,
    successRoute,
    failureRoute,
    errorMessages,
    checkSecurityLevel = true,
    currentRoute,
  } = options;

  if (checkSecurityLevel) {
    const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
    if (securityLevel === 0) {
      if (setError) {
        setError(errorMessages.noSecurity);
      }
      if (failureRoute) router.push(failureRoute.securityLevelZero);
      return false;
    }
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login with Biometrics",
  });

  if (result.success) {
    if (setUnlocked) {
      dispatch(setUnlocked(true));
    }

    if (setAppLocked) {
      dispatch(setAppLocked(true));
    }

    successRoute && router.push(successRoute);
    return true;
  } else {
    if (setError) {
      setError(errorMessages.authenticationFailed);
    }

    if (failureRoute && currentRoute && !currentRoute.includes("/auth")) {
      router.push(`${failureRoute.default}?callbackUrl=${currentRoute}`);
    }

    return false;
  }
}
