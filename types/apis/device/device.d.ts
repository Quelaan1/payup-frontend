interface Device {
	user_id: string;
	device_id: string;
	device_type: string;
	last_used?: Date;
	created_at?: Date;
	updated_at?: Date;
}

interface DeviceRegistrationRequest {
	device_id: string;
	device_type: string;
}

interface DeviceRegistrationResponse extends BaseResponse {}

interface DeviceListResponse extends BaseResponse {
	Devices: Device[];
}

interface DeviceDeleteRequest {
	user_id: string;
	device_id: string;
}

class DeviceDeleteResponse extends BaseResponse {}
