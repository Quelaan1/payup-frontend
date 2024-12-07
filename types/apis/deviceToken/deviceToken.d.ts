interface DeviceTokenCreateRequest {
	device_id: string;
	token: string;
	token_purpose: string;
}

interface DeviceTokenUpdateRequest extends DeviceTokenCreateRequest {}

interface DeviceTokenResponse extends BaseResponse {}

interface DeviceTokenUpdateResponse extends BaseResponse {}
