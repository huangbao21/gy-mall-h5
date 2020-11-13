import axios, { PostData } from '@/axios';
import API from '@/axios/api';

// 营业执照识别
export function discernQualification(data: { param: string }): Promise<PostData> {
  return axios.post(API.DISCERN_QUALIFICATION, data);
}

// 保存资质信息
export function saveQuqlification(data: object): Promise<PostData> {
  return axios.post(API.KEEP_QUQLIFICATION, data);
}

// 查询审核
export function queryQualification(): Promise<PostData> {
  return axios.post(API.FIND_QUALIFICATION, {});
}
// 修改资质信息
export function modifyQualification(data: object): Promise<PostData> {
  return axios.post(API.MODIFY_QUALIFICATION, data);
}
