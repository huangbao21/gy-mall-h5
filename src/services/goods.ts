import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchCategoryList(): Promise<PostData> {
  return axios.post(API.CATEGORY_LIST, {});
}
