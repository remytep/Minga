import { FieldGuesser, ListGuesser } from "@api-platform/admin";

const UserList = () => (
    <ListGuesser>
        <FieldGuesser source="email" />
        <FieldGuesser source="roles" />
    </ListGuesser>
)
export default UserList;