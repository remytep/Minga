import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
  ReferenceField,
  DateField,
  ReferenceArrayField,
  ArrayField,
  SingleFieldList,
  WithRecord,
  FunctionField,
} from "react-admin";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

const OrderList = (props) => {
  const navigate = useNavigate();
  return (
    <ListGuesser {...props}>
      <FieldGuesser source="orderNumber" />
      <ReferenceField source="user.@id" reference="users" />
      {/*     <WithRecord
      label="Order Items"
      render={(record) =>
        record.orderItems.length === 0 ? (
          <span>No order items found</span>
        ) : (
          <ReferenceArrayField source="orderItems" reference="order_items" />
          )
      }
    /> */}
      <ArrayField source="orderItems">
        <FunctionField
          render={(record) =>
            record.orderItems.length === 0 && <p>No order items found</p>
          }
        />
        <SingleFieldList linkType={false}>
          <WithRecord
            render={(record) =>
              record && (
                <Chip
                  label={record.sku.referenceNumber}
                  onClick={() => {
                    console.log(record)
                    navigate(
                      `/admin/panel/order_items/%2Fapi%2Forder_items%2F${record.id}/show`
                    );
                  }}
                />
              )
            }
          />
        </SingleFieldList>
      </ArrayField>
      <FieldGuesser source="status" />
      <WithRecord
        label="ID Stripe"
        render={(record) =>
          typeof record.stripeCustomerId !== "undefined" ? (
            <span>{record.stripeCustomerId}</span>
          ) : <span>null</span>
        }
      />
      <WithRecord
        label="Tracking "
        render={(record) =>
          typeof record.idEasypostTracking !== "undefined" ? (
            <span>{record.idEasypostTracking}</span>
          ) : <span>null</span>
        }
      />
      <FieldGuesser source="totalAmount" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </ListGuesser>
  );
};
export default OrderList;
