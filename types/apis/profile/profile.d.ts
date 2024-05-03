interface GetProfileResponse {
	id: string;
	email: string;
	name: string;
	onboarded: boolean;
	kyc_complete: boolean;
	kyc_pan: boolean;
	kyc_uidai: boolean;
}

interface UpdateProfileResponse extends GetProfileResponse {}

interface UpdateProfileRequest extends GetProfileResponse {}
