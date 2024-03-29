import qs from 'qs';
import NativeAPI from '@/axios/api'

export function toBackApp() {
  window.location.href = NativeAPI.TO_BACK_APP;
}
export function callPayOrder(data: { recordId: string; sdk: string; money: string; sign: string }) {
  const params = qs.stringify({
    recordId: data.recordId,
    sdk: data.sdk,
    money: data.money,
    sign: data.sign
  })
  window.location.href = `${NativeAPI.CALL_PAY_ORDER}?${params}`;
}
export function toCompleteMission(data: { url: string; bountyQuantity: number; id: number; verify: string; verifyStr: string; iosPid: string; androidPid: string; fromSource: string; userId: number }) {
  const params = qs.stringify({
    bountyQuantity: data.bountyQuantity,
    id: data.id,
    fromSource: data.fromSource,
    verify: data.verify,
    verifyStr: data.verifyStr,
    androidPid: data.androidPid,
    iosPid: data.iosPid,
    userId: data.userId
  })
  window.location.href = `${data.url}?${params}`;
}
