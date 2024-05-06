import * as LocalAuthentication from 'expo-local-authentication';

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
	} = options;

	if (checkSecurityLevel) {
		const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
		if (securityLevel === 0) {
			if (setError) {
				setError(errorMessages.noSecurity);
			}
			if (failureRoute) router.replace(failureRoute.securityLevelZero);
			return false;
		}
	}

	const result = await LocalAuthentication.authenticateAsync({
		promptMessage: 'Login with Biometrics',
	});

	if (result.success) {
		if (setUnlocked) {
			dispatch(setUnlocked(true));
		}
		if (setAppLocked) {
			dispatch(setAppLocked(true));
		}
		router.replace(successRoute);
		return true;
	} else {
		if (setError) {
			setError(errorMessages.authenticationFailed);
		}
		if (failureRoute) router.replace(failureRoute.default);
		return false;
	}
}
