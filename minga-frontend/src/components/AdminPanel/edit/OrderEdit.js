import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";

const transform = (data) => {
  console.log(data);
  return {
    ...data,
    user: `${data.user["@id"]}`,
  };
};

const OrderEdit = (props) => (
  <EditGuesser {...props} transform={transform}>
    <InputGuesser source="orderNumber" fullWidth validate={required()} />
    <ReferenceInput source="user.@id" reference="users">
      <AutocompleteInput optionText="email" fullWidth validate={required()} />
    </ReferenceInput>
    <InputGuesser source="status" fullWidth validate={required()} />
  </EditGuesser>
);
export default OrderEdit;
