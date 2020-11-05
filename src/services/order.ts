import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchOrderSupplierList(data: { current: number; size: number; orderStatus?: number; productName?: string }): Promise<PostData> {
  return axios.post(API.ORDER_SUPPLIER, data);
}
export function queryOrderDetail(data: { id: number }): Promise<PostData> {
  return axios.post(API.ORDER_VIEW, data);
}
export function fetchOrderAgentList(data: { current: number; size: number; orderStatus?: number; productName?: string }): Promise<PostData> {
  return axios.post(API.ORDER_AGENT, data);
}
export function queryAgentOrderDetail(data: { id: number }): Promise<PostData> {
  return axios.post(API.AGENT_ORDER_VIEW, data);
}
export function fetchOrderCustomerList(data: { current: number; size: number; orderStatus?: number; productName?: string }): Promise<PostData> {
  return axios.post(API.ORDER_CUSTOMER, data);
}
export function queryCustomerOrderDetail(data: { id: number }): Promise<PostData> {
  return axios.post(API.CUSTOMER_ORDER_VIEW, data);
}
export function queryLogistics(data: { id: number }): Promise<PostData> {
  return axios.post(API.QUERY_LOGISTICS, data);
}
