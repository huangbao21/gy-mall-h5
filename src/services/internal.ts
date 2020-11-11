import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchStaffList(data: { current: number; size: number; customerRank: number }): Promise<PostData> {
  return axios.post(API.STAFF_LIST, data)
}
export function addStaff(data: { mobile: string; rank: number }): Promise<PostData> {
  return axios.post(API.ADD_STAFF, data);
}
export function updateStaff(data: { id: number; param: string }): Promise<PostData> {
  return axios.post(API.UPDATE_STAFF, data)
}
export function fetchJobList(): Promise<PostData> {
  return axios.post(API.JOB_LIST, {})
}
export function updateJob(data: { id: number; ration: number; name: string }): Promise<PostData> {
  return axios.post(API.UPDATE_JOB, data)
}
export function addJob(data: { name: string; ration: number }): Promise<PostData> {
  return axios.post(API.ADD_JOB, data)
}
