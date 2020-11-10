import axios, { PostData } from "@/axios";
import API from "@/axios/api";

export function fetchSalesData(): Promise<PostData> {
  return axios.post(API.SALES_DATA, {})
}
export function transferMoney(data: { transferMoney: number }): Promise<PostData> {
  return axios.post(API.TRANSFER_MONEY, data)
}
