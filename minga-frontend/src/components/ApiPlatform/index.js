import React, { useContext } from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import { AuthContext } from "../../contexts/AuthContext";
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
import { ENTRYPOINT } from "../../config";

const Admin = () => {
  <HydraAdmin basename="/admin" entrypoint={ENTRYPOINT}>
    <ResourceGuesser
      name="products"
      create={ProductCreate}
      list={ProductList}
      edit={ProductEdit}
      show={ProductShow}
    />
    <ResourceGuesser
      name="product_categories"
      create={ProductCategoryCreate}
      list={ProductCategoryList}
      edit={ProductCategoryEdit}
      show={ProductCategoryShow}
    />
    <ResourceGuesser name="users" create={UserCreate} />
    <ResourceGuesser name="product_options" list={ProductOptionList} />
    <ResourceGuesser
      name="product_option_values"
      create={ProductOptionValueCreate}
    />
    <ResourceGuesser name="skus" />
  </HydraAdmin>;
};

export default Admin;
