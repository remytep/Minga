import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { PasswordInput } from "react-admin";

const UserCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="email" fullWidth required />
        <PasswordInput source="password" fullWidth required />
    </CreateGuesser>
);
export default UserCreate;