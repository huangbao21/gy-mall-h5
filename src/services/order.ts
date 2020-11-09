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
export function cacelOrder(data: { id: number }): Promise<PostData> {
  return axios.post(API.CANCEL_ORDER, data)
}
export function receiptOrder(data: { id: number }): Promise<PostData> {
  return axios.post(API.RECEIPT_ORDER, data);
}
export function deliverOrder(data: { id: number; sn: string }): Promise<PostData> {
  return axios.post(API.order_deliver, data);
}
export function createOrder(data: { addressId: number; quantity: number; skuId: number; agencyId: number }): Promise<PostData> {
  return axios.post(API.CREATE_ORDER, data);
}
