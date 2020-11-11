/* eslint-disable @typescript-eslint/no-explicit-any  */

import { ref } from 'vue';
export default function useDropmenu() {
  const sortOption = ref<any[]>([]);
  const goodsOption = ref<any[]>([]);
  const categoryOption = ref<any[]>([]);

  sortOption.value = [
    {
      text: "智能排序",
      value: -1,
    },
    {
      text: "销量最高",
      value: "pp.sales_volume",
    },
    {
      text: "库存最高",
      value: "pps.quantity",
    },
    {
      text: "价格由高至低",
      value: "price",
    },
  ]
  goodsOption.value = [
    {
      text: "全部",
      value: -1,
    },
    {
      text: "待审核",
      value: 1,
    },
    {
      text: "已上架",
      value: 2,
    },
    {
      text: "已下架",
      value: 3,
    },
  ]
  categoryOption.value = [
    {
      text: "全部品类",
      value: -1,
    },
  ]
  return {
    sortOption,
    goodsOption,
    categoryOption
  }
}
