import axios, { PostData } from '@/axios';
import API from '@/axios/api';

// export function findQuqlification(data: { param: string }): Promise<PostData> {
//   return axios.post(API.DISCERN_QUQLIFICATION, data);
// }

export function findQuqlification(data: object): Promise<PostData> {
  return axios.post(API.DISCERN_QUQLIFICATION, data);
}

export function saveQuqlification(data: object): Promise<PostData> {
  return axios.post(API.KEEP_QUQLIFICATION, data);
}
