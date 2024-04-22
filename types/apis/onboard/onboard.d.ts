interface VerifyPanRequest {
  entity_id: string;
  entity_type: 1;
}

interface VerifyPanResponse extends PanVerifyRequest {
  message: string;
  entity_name: string;
  internal_id: string;
}

interface CreatePanRequest {
  entity_id: string;
  entity_type: 1;
  entity_name: string;
  internal_id: string;
}
