import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";

const OrderItemEdit = (props) => (
  <EditGuesser {...props}>
    <ReferenceInput source="orderNumber" reference="orders">
      <AutocompleteInput fullWidth validate={required()} />
    </ReferenceInput>
    <ReferenceInput source="sku" reference="skus">
      <AutocompleteInput fullWidth validate={required()} />
    </ReferenceInput>
    <InputGuesser source="quantity" fullWidth validate={required()} />
  </EditGuesser>
);
export default OrderItemEdit;
