import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
  ReferenceField,
  DateField,
  ReferenceArrayField,
  WithRecord,
} from "react-admin";

const OrderList = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source="orderNumber" />
    <ReferenceField source="user" reference="users" />
    <WithRecord
      label="Order Items"
      render={(record) =>
        record.orderItems.length === 0 ? (
          <span>No order items found</span>
        ) : (
          <ReferenceArrayField source="orderItems" reference="order_items" />
        )
      }
    />
    <FieldGuesser source="status" />
    <FieldGuesser source="total" />
    <DateField source="createdAt" showTime />
    <DateField source="updatedAt" showTime />
  </ListGuesser>
);
export default OrderList;
