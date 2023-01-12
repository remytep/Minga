import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ReferenceArrayField, DateField, WithRecord } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const OrderItemShow = (props) => (
  <ShowGuesser title={<ProductCategoryTitle />} {...props}>
    <FieldGuesser source="orderNumber" reference="orders" />
    <FieldGuesser source="sku" reference="skus" />
  </ShowGuesser>
);
export default OrderItemShow;
