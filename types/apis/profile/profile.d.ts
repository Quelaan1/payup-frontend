interface Profile {
	id: string;
	email: string;
	name: string;
	onboarded: boolean;
	kyc_complete: boolean;
	kyc_pan: boolean;
	kyc_uidai: boolean;
}

interface GetProfileResponse {
	user_id: string;
	profile: Profile;
}

interface UpdateProfileResponse extends GetProfileResponse {}

interface UpdateProfileRequest extends Profile {}
