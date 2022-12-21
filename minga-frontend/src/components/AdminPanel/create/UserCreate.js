import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { PasswordInput, required } from "react-admin";

const UserCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="email" fullWidth validate={required()} />
        <PasswordInput source="password" fullWidth validate={required()} />
    </CreateGuesser>
);
export default UserCreate;