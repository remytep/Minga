import { FieldGuesser, ListGuesser } from "@api-platform/admin";

const UserList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source="email" />
        <FieldGuesser source="roles" />
    </ListGuesser>
)
export default UserList;