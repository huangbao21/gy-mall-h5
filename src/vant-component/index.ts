/* eslint-disable */
import {
  Button,
  NavBar,
  Icon,
  List,
  Cell,
  CountDown,
  Field,
  RadioGroup,
  Radio,
  Uploader,
  Image as VanImage,
  TreeSelect,
  Col,
  Dialog,
  Toast,
  Tab,
  Tabs,
  Search, Lazyload
} from "vant";

export default function (app: any) {
  app
    .use(Button)
    .use(NavBar)
    .use(Icon)
    .use(List)
    .use(Cell)
    .use(CountDown)
    .use(Field)
    .use(RadioGroup)
    .use(Radio)
    .use(Uploader)
    .use(VanImage)
    .use(TreeSelect)
    .use(Col)
    .use(Dialog)
    .use(Toast)
    .use(Tab)
    .use(Tabs)
    .use(Search)
    .use(Lazyload), {
    lazyComponent: true
  };
}
