import React, { useContext } from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import { AuthContext } from "../../contexts/AuthContext";
import {
  ProductCategoryList,
  ProductList,
  ProductOptionList,
  SkuList,
} from "./ListComponents";
import {
  ProductCategoryCreate,
  ProductCreate,
  ProductOptionCreate,
  ProductOptionValueCreate,
  SkuCreate,
  UserCreate,
} from "./CreateComponents";
import { ProductCategoryEdit, ProductEdit } from "./EditComponents";
import { ProductCategoryShow, ProductShow } from "./ShowComponents";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (user) {
    if (user.roles.includes("ROLE_ADMIN")) {
      return (
        <HydraAdmin basename="/admin" entrypoint="http://localhost:8000/api">
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
          {/* <ResourceGuesser name="product_options" list={ProductOptionList} /> */}
          {/* <ResourceGuesser name="product_option_values" create={ProductOptionValueCreate} /> */}
          {/* <ResourceGuesser name="skus" />  */}
        </HydraAdmin>
      );
    } else {
      navigate("/");
    }
  }
};

export default Admin;
