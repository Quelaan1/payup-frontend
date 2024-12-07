import { Promotion } from '../../components/promotions/promotions';

interface GetPromotionsResponse {
	BaseResponse;
	promotions: Promotion[];
}

interface GetPromotionsRequest {}
