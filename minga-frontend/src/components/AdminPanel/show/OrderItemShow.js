import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ReferenceField } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const OrderItemShow = (props) => (
  <ShowGuesser title={<ProductCategoryTitle />} {...props}>
    <ReferenceField source="orderNumber" reference="orders" />
    <ReferenceField source="sku" reference="skus" />
    <FieldGuesser source="quantity" reference="skus" />
  </ShowGuesser>
);
export default OrderItemShow;
