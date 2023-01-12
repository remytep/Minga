import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";

const OrderItemCreate = (props) => (
  <CreateGuesser {...props}>
    <ReferenceInput source="orderNumber" reference="orders">
      <AutocompleteInput fullWidth validate={required()} />
    </ReferenceInput>
    <ReferenceInput source="sku" reference="skus">
      <AutocompleteInput fullWidth validate={required()} />
    </ReferenceInput>
  </CreateGuesser>
);
export default OrderItemCreate;
