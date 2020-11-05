import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchOrderSupplierList(data: { current: number; size: number; orderStatus?: number; productName?: string }): Promise<PostData> {
  return axios.post(API.ORDER_SUPPLIER, data);
}
export function queryOrderDetail(data: { id: number }): Promise<PostData> {
  return axios.post(API.ORDER_VIEW, data);
}
export function queryLogistics(data: { id: number }): Promise<PostData> {
  return axios.post(API.QUERY_LOGISTICS, data);
}
