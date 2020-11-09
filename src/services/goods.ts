/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { PostData } from '@/axios';
import API from '@/axios/api';

interface GoodsInfo {
  bannerList: object[];
  categoryId: number;
  name: string;
  productSkuList: object[];
  [propName: string]: any;
}

export function fetchCategoryList(): Promise<PostData> {
  return axios.post(API.CATEGORY_LIST, {});
}
export function saveGoods(data: GoodsInfo): Promise<PostData> {
  return axios.post(API.GOODS_SAVE, data)
}
export function fetchGoodsList(data: { current: number; size: number; status?: number; descOrders?: string[]; categoryIds?: number[]; name?: string }): Promise<PostData> {
  return axios.post(API.GOODS_LIST, data);
}
export function fetchAgentGoodsList(data: { current: number; size: number; status?: number; descOrders?: string[]; categoryIds?: number[]; name?: string; supplierId?: number }): Promise<PostData> {
  return axios.post(API.AGENT_GOODS_LIST, data);
}
export function fetchGoodsSelect(data: { current: number; size: number; status?: number; descOrders?: string[]; categoryIds?: number[]; name?: string; supplierId?: number }): Promise<PostData> {
  return axios.post(API.AGENT_GOOD_SELECT, data);
}
export function fetchGoodDetail(data: { id: number }): Promise<PostData> {
  return axios.post(API.GOOD_DETAIL, data);
}
export function fetchCustomerGoodDetail(data: { id: number; agencyId: number }): Promise<PostData> {
  return axios.post(API.CUSTOMER_GOOD_DETAIL, data);
}
export function updateGoods(data: GoodsInfo): Promise<PostData> {
  return axios.post(API.GOODS_UPDATE, data)
}
export function allGoodsOnDown(data: { isTrue: number }): Promise<PostData> {
  return axios.post(API.GOODS_ON_DOWN, data)
}
export function allAgentGoodsOnDown(data: { isTrue: number }): Promise<PostData> {
  return axios.post(API.AGENT_GOODS_ON_DOWN, data)
}
export function batchGoodsOnDown(data: { isTrue: number; idList: any[] }): Promise<PostData> {
  return axios.post(API.GOODS_BATCH_ON_DOWN, data);
}
export function batchAgentGoodsOnDown(data: { isTrue: number; idList: any[] }): Promise<PostData> {
  return axios.post(API.AGENT_GOODS_BATCH_ON_DOWN, data);
}
export function delGood(data: { id: number }): Promise<PostData> {
  return axios.post(API.GOOD_DEL, data);
}
export function delAgentGood(data: { id: number }): Promise<PostData> {
  return axios.post(API.AGENT_GOOD_DEL, data);
}
export function fetchSupplierList(data = { current: 1, size: -1 }): Promise<PostData> {
  return axios.post(API.SUPPLIER_LIST, data);
}
export function stockOrOutGoods(data: { isTrue: number; idList: any[] }): Promise<PostData> {
  return axios.post(API.AGENT_STOCK_BATCH, data);
}
export function fetchCustomerGoodsDetail(data: { id: number }) {
  return axios.post(API.CUSTOMER_GOOD_DETAIL, data)
}
