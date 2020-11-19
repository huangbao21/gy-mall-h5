import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export interface AddressInfo {
  tel: string;
  province: string;
  city: string;
  county: string;
  areaCode: string;
  isDeafult: boolean;
  name: string;
  addressDetail: string;
}
export interface AddressInfoServe {
  id?: number;
  byDefault: number;
  cityName: string;
  districtCode: string;
  districtName: string;
  linkman: string;
  mobile: string;
  provinceName: string;
  street: string;
  provinceCode: string;
  cityCode: string;
}
export function fetchAddressList(data: { current: number; size: number }): Promise<PostData> {
  return axios.post(API.ADDRESS_LIST, data)
}
export function saveAddress(data: AddressInfoServe): Promise<PostData> {
  return axios.post(API.SAVE_ADDRESS, data)
}
export function fetchAreaList(): Promise<PostData> {
  return axios.post(API.AREA_LIST, {});
}
export function fetchAddressInfo(data: { id: number }) {
  return axios.post(API.ADDRESS_INFO, data)
}
export function deleteAddress(data: { id: number }): Promise<PostData> {
  return axios.post(API.DELETE_ADDRESS, data)
}
export function setAddressDefault(data: { id: number }): Promise<PostData> {
  return axios.post(API.SET_ADDRESS_DEFAULT, data)
}
export function queryDefaultAddress(): Promise<PostData> {
  return axios.post(API.DEFAULT_ADDRESS, {});
}
export function editAddressInfo(data: AddressInfoServe): Promise<PostData> {
  return axios.post(API.EDIT_ADDRESS_INFO, data)
}
