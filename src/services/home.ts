import axios, { PostData } from "@/axios";
import API from "@/axios/api";

export function fetchSalesData(): Promise<PostData> {
  return axios.post(API.SALES_DATA, {})
}
