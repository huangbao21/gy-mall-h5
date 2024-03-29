import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function uploadFile(file: FormData): Promise<PostData> {
  return axios.post(API.UPLOAD_FILE, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function fetchGoodsList(data: { current: number; size: number; status?: number }): Promise<PostData> {
  return axios.post(API.GOODS_LIST, data);
}
