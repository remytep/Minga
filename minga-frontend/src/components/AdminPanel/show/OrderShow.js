import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ReferenceArrayField, DateField, WithRecord } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const OrderShow = (props) => (
  <ShowGuesser title={<ProductCategoryTitle />} {...props}>
    <FieldGuesser source={"orderNumber"} />
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
    <FieldGuesser source={"status"} />
    <FieldGuesser source={"total"} />
    <DateField source={"createdAt"} showTime />
    <DateField source={"updatedAt"} showTime />
  </ShowGuesser>
);
export default OrderShow;
