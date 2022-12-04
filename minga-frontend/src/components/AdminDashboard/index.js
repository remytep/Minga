import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList, UserCreate, UserEdit } from "./users";
import { PostList, PostCreate, PostEdit } from "./posts";
import authProvider from '../auth/authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminDashboard = () => (
    <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
    </Admin>
);

export default AdminDashboard;