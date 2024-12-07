// Mock responses
const mockSendOTPResponse: SendOTPResponse = {
	message: 'OTP sent successfully',
};

const mockVerifyOTPResponse: VerifyOTPResponse = {
	message: 'OTP verified successfully',
	refresh_token: 'mock_refresh_token',
	access_token: 'mock_access_token',
};

const mockSendAadhaarOtpResponse: SendAadhaarOtpResponse = {
	message: 'Aadhaar OTP sent successfully',
	ref_id: 'mock_ref_id',
};

const mockVerifyAadhaarOtpResponse: VerifyAadhaarOtpResponse = {
	id: 'mock_user_id',
	email: 'mock@example.com',
	name: 'Mock User',
	onboarded: true,
	kyc_complete: true,
	kyc_pan: true,
	kyc_uidai: true,
};

const mockVerifyPanResponse: VerifyPanResponse = {
	entity_id: 'mock_entity_id',
	entity_type: 1,
	name: 'Mock Name',
	dob: '1990-01-01',
	consent: 'y',
	entity_name: 'Mock Entity Name',
	internal_id: 'mock_internal_id',
	name_as_per_pan_match: true,
	date_of_birth_match: true,
};

const mockCreatePanResponse = {
	message: 'PAN record created successfully',
};

// Mock implementations
export const sendOTP = async (
	phone_number: string
): Promise<SendOTPResponse> => {
	// Mock implementation always returns the same response
	return mockSendOTPResponse;
};

export const verifyOTP = async ({
	phoneNumber,
	otp,
}: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
	// Mock implementation always returns the same response
	return mockVerifyOTPResponse;
};

export const sendAadhaarOtp = async (
	data: SendAadhaarOtpRequest
): Promise<SendAadhaarOtpResponse> => {
	// Mock implementation always returns the same response
	return mockSendAadhaarOtpResponse;
};

export const verifyAadhaarOtp = async (
	data: VerifyAadhaarOtpRequest
): Promise<VerifyAadhaarOtpResponse> => {
	// Mock implementation always returns the same response
	return mockVerifyAadhaarOtpResponse;
};

export const verifyPan = async (
	data: VerifyPanRequest
): Promise<VerifyPanResponse> => {
	// Mock implementation always returns the same response
	return mockVerifyPanResponse;
};

export const createPan = async (data: CreatePanRequest) => {
	// Mock implementation always returns the same response
	return mockCreatePanResponse;
};

export const getProfile = async (): Promise<GetProfileResponse> => {
	// Mock implementation always returns the same response
	return {
		id: 'mock_user_id',
		email: 'mock@example.com',
		name: 'Mock User',
		onboarded: true,
		kyc_complete: true,
		kyc_pan: true,
		kyc_uidai: true,
	};
};

export const updateProfile = async ({
	id,
	email,
	name,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
	// Mock implementation always returns the same response
	return {
		id,
		email,
		name,
		onboarded: true,
		kyc_complete: true,
		kyc_pan: true,
		kyc_uidai: true,
	};
};
