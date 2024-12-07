export const parseProfileData = (profileData: UpdateProfileResponse) => {
  return {
    user_id: profileData.user_id,
    id: profileData.profile.id,
    email: profileData.profile.email,
    phone_number: profileData.profile.phone_number,
    name: profileData.profile.name,
    onboarded: profileData.profile.onboarded,
    kyc_complete: profileData.profile.kyc_complete,
    kyc_pan: profileData.profile.kyc_pan,
    kyc_uidai: profileData.profile.kyc_uidai,
  };
};
