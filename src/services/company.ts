import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchApplyCompanyList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.CAN_APPLY_COMPANY, data)
}
export function fetchAppliedRecords(data: { auditStatus: number; current: number; size: number }) {
  return axios.post(API.APPLIED_LIST, data)
}
export function fetchCompanyGoodsListOnline(data: { agencyId: number; current: number; size: number; descOrders?: string[]; categoryIds?: number[]; name?: string }) {
  return axios.post(API.COMPANY_GOODS_LIST_ONLINE, data)
}
export function applyAgency(data: { id: number }): Promise<PostData> {
  return axios.post(API.APPLY_AGENCY, data)
}
