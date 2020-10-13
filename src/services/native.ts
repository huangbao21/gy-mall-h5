import NativeAPI from '@/axios/api'

export function toBackApp() {
  window.location.href = NativeAPI.TO_BACK_APP;
}
