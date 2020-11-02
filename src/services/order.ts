import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchOrderSupplierList(data: { current: number; size: number; orderStatus?: number }): Promise<PostData> {
  return axios.post(API.ORDER_SUPPLIER, data);
}
