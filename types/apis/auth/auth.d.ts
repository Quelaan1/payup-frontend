interface SendOTPResponse {
	BaseResponse;
}

interface SendOTPRequest {
	phoneNumber: string;
}

interface VerifyOTPRequest {
	phoneNumber: string;
	otp: string;
}

interface VerifyOTPResponse {
	BaseResponse;
	refresh_token: string;
	access_token: string;
}

// types/authentication.ts

interface AuthenticationOptions {
	dispatch: Function;
	setUnlocked?: (unlocked: boolean) => void;
	setAppLocked?: (locked: boolean) => void;
	setError?: (message: string) => void;
	router: {
		replace: (path: string) => void;
	};
	successRoute?: string;
	failureRoute?: {
		securityLevelZero: string;
		default: string;
	};
	errorMessages: {
		noSecurity: string;
		authenticationFailed: string;
	};
	checkSecurityLevel?: boolean;
}
