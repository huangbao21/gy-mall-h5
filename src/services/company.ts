import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchApplyCompanyList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.CAN_APPLY_COMPANY, data)
}
export function fetchAppliedRecords(data: { auditStatus: number; current: number; size: number }) {
  return axios.post(API.APPLIED_LIST, data)
}
