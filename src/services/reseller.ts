import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchAgencyApplyList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.AGENCY_APPLY_LIST, data);
}
export function auditAgencyApply(data: { auditStatus: number; id: number }): Promise<PostData> {
  return axios.post(API.AUDIT_AGENCY_APPLY, data);
}
export function saveCommissionSetting(data: { sellNumber: number; ration: number }): Promise<PostData> {
  return axios.post(API.SAVE_COMMISSION_SETTING, data)
}
export function fetchCommissionSettingList(): Promise<PostData> {
  return axios.post(API.COMMISSION_SETTING_LIST, {});
}
export function fetchCommissionLimit(data: { ration?: number; sellNumber?: number }): Promise<PostData> {
  return axios.post(API.COMMISSION_LIMIT_AREA, data)
}
export function queryAgencyAndSales(): Promise<PostData> {
  return axios.post(API.QUERY_AGENCY_SALES, {})
}
