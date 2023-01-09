import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
  ReferenceField,
  DateField,
  ReferenceArrayField,
  WithRecord,
} from "react-admin";

const OrderItemList = (props) => (
  <ListGuesser {...props}>
    <ReferenceField source="orderNumber" reference="orders" />
    <ReferenceField source="sku" reference="skus" />
    <FieldGuesser source="quantity" />
  </ListGuesser>
);
export default OrderItemList;
