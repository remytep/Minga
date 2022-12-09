import React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import {
  ProductCategoryList,
  ProductList,
  ProductOptionList,
} from "./ListComponents";
import {
  ProductCategoryCreate,
  ProductCreate,
  ProductOptionCreate,
  ProductOptionValueCreate,
  UserCreate,
} from "./CreateComponents";
import { ProductCategoryEdit, ProductEdit } from "./EditComponents";
import { ProductCategoryShow, ProductShow } from "./ShowComponents";

const Admin = () => (
    <HydraAdmin
        basename="/admin"
        entrypoint="http://127.0.0.1:36783/api"
    >
        <ResourceGuesser name="products" create={ProductCreate} list={ProductList} edit={ProductEdit} show={ProductShow} />
        <ResourceGuesser name="product_categories" create={ProductCategoryCreate} list={ProductCategoryList} edit={ProductCategoryEdit} show={ProductCategoryShow} />
        <ResourceGuesser name="product_options" create={ProductOptionCreate} list={ProductOptionList} />
        <ResourceGuesser name="product_option_values" create={ProductOptionValueCreate} />
        <ResourceGuesser name="s_k_us" />
    </HydraAdmin>
);

export default Admin;
