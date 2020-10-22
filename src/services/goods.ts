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
export function fetchGoodsList(data: { current: number; size: number; status?: number }): Promise<PostData> {
  debugger
  return axios.post(API.GOODS_LIST, data);
}
