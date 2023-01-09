import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";

const OrderEdit = (props) => (
  <EditGuesser {...props}>
    <InputGuesser source="orderNumber" fullWidth validate={required()} />
    <ReferenceInput source="user" reference="users">
      <AutocompleteInput optionText="email" fullWidth validate={required()} />
    </ReferenceInput>
    <InputGuesser source="status" fullWidth validate={required()} />
  </EditGuesser>
);
export default OrderEdit;
