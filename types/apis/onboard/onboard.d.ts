interface VerifyPanRequest {
	entity_id: string;
	entity_type: 1;
	name: string;
	dob: string;
	consent: 'y' | 'n';
}

interface VerifyPanResponse extends GetProfileResponse {
	message?: string;
	name_as_per_pan_match: boolean;
	date_of_birth_match: boolean;
}

interface SendAadhaarOtpRequest {
	entity_id: string;
	entity_type: 2;
}

interface SendAadhaarOtpResponse {
	message: string;
	ref_id: string;
}

interface VerifyAadhaarOtpRequest {
	entity_id: string;
	otp: string;
	ref_id: string;
}

interface VerifyAadhaarOtpResponse extends GetProfileResponse {}
