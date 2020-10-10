import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchMissionList(data: { current: number, size: number, token: string }): Promise<PostData> {
  return axios.post(API.MISSION_LIST, data);
}