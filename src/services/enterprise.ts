import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function findQuqlification(data: any): Promise<PostData> {
  return axios.post(API.DISCERN_QUQLIFICATION, data);
}
