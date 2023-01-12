import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";

const OrderCreate = (props) => (
  <CreateGuesser {...props}>
    <InputGuesser source="orderNumber" fullWidth validate={required()} />
    <ReferenceInput source="user" reference="users">
      <AutocompleteInput optionText="email" fullWidth validate={required()} />
    </ReferenceInput>
  </CreateGuesser>
);
export default OrderCreate;
