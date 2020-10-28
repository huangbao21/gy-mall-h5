import axios, { PostData } from "@/axios";
import API from "@/axios/api";

export function queryConditionList(): Promise<PostData> {
  return axios.post(API.QUERY_CONDITION_TYPE_LIST, {})
}
