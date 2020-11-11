import axios, { PostData } from "@/axios";
import API from "@/axios/api";

export function queryConditionList(): Promise<PostData> {
  return axios.post(API.QUERY_CONDITION_TYPE_LIST, {})
}
export function saveCondition(data: { type: number; conditionValue: string }): Promise<PostData> {
  return axios.post(API.SAVE_CONDITION, data)
}
export function saveRatio(data: { staffRatio: number; agencyRatio: number }): Promise<PostData> {
  return axios.post(API.SAVE_RATIO, data)
}
export function queryCondition(): Promise<PostData> {
  return axios.post(API.QUERY_CONDITION, {})
}
export function queryRatio(): Promise<PostData> {
  return axios.post(API.QUERY_RATIO, {})
}
