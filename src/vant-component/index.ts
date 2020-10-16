/* eslint-disable */
import { Button, NavBar, Icon, List, Cell, Field, RadioGroup, Radio, Uploader, Image as VanImage, TreeSelect} from "vant";

export default function (app: any) {
  app.use(Button).use(NavBar).use(Icon).use(List).use(Cell).use(Field).use(RadioGroup).use(Radio).use(Uploader).use(VanImage).use(TreeSelect);
}