import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function fetchMissionList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.MISSION_LIST, data);
}
export function fetchBounty(): Promise<PostData> {
  return axios.post(API.BOUNTY_NUM, {})
}
export function fetchBountyList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.BOUNTY_LIST, data)
}
export function saveMission(data: { bountyQuantity: number; id: number; verify: string; verifyStr: string }): Promise<PostData> {
  return axios.post(API.MISSION_SAVE, data);
}
export function fetchBountyAndRank(): Promise<PostData> {
  return axios.post(API.BOUNTY_RANK, {})
}
export function updateTransfer(data: { amount: number; zone: string }): Promise<PostData> {
  return axios.post(API.UPDATE_TRANSFER, data)
}
