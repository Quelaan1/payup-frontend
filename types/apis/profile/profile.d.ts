interface Profile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  phone_number: string;
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

interface UpdateProfileRequest extends Partial<Profile> {}
