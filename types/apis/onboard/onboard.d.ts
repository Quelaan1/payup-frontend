interface VerifyPanRequest {
  entity_id: string;
  entity_type: 1;
}

interface VerifyPanResponse extends VerifyPanRequest {
  message?: string;
  entity_name: string;
  internal_id: string;
}

interface CreatePanRequest extends VerifyPanResponse {}
