import qs from 'qs';
import NativeAPI from '@/axios/api'

export function toBackApp() {
  window.location.href = NativeAPI.TO_BACK_APP;
}
export function toCompleteMission(data: { url: string; bountyQuantity: number; id: number; verify: string; verifyStr: string; iosPid: string; androidPid: string; fromSource: string }) {
  const params = qs.stringify({
    bountyQuantity: data.bountyQuantity,
    id: data.id,
    fromSource: data.fromSource,
    verify: data.verify,
    verifyStr: data.verifyStr,
    androidPid: data.androidPid,
    iosPid: data.iosPid,
  })
  window.location.href = `${data.url}?${params}`;
}
