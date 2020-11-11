import axios, { PostData } from '@/axios';
import API from '@/axios/api';

// 营业执照识别
export function findQuqlification(data: { param: string }): Promise<PostData> {
  return axios.post(API.DISCERN_QUQLIFICATION, data);
}

// 保存资质信息
export function saveQuqlification(data: object): Promise<PostData> {
  return axios.post(API.KEEP_QUQLIFICATION, data);
}

// 查询审核
export function submitQuqlification(): Promise<PostData> {
  return axios.post(API.SUBMIT_AUDIT, {});
}
// 修改资质信息
export function modifyQuqlification(data: object): Promise<PostData> {
  return axios.post(API.MODIFY_QUALIFICATION, data);
}
