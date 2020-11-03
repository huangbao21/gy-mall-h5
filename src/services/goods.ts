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
export function fetchGoodsList(data: { current: number; size: number; status?: number; descOrders?: string[]; categoryId?: number; name?: string }): Promise<PostData> {
  return axios.post(API.GOODS_LIST, data);
}
export function allGoodsOnDown(data: { isTrue: number }): Promise<PostData> {
  return axios.post(API.GOODS_ON_DOWN, data)
}
export function batchGoodsOnDown(data: { isTrue: number; idList: any[] }): Promise<PostData> {
  return axios.post(API.GOODS_BATCH_ON_DOWN, data);
}
export function delGood(data: { id: number }): Promise<PostData> {
  return axios.post(API.GOOD_DEL, data);
}
