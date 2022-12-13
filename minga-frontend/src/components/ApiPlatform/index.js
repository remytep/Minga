import React, { useContext, useEffect, useState } from "react";
import {
  fetchHydra as baseFetchHydra,
  HydraAdmin,
  hydraDataProvider as baseHydraDataProvider,
  useIntrospection,
  ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
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
import { Navigate, useNavigate, Route, useLocation } from "react-router-dom";
import { CustomRoutes } from "react-admin";
import { ENTRYPOINT } from "../../config";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const location = useLocation().pathname;
  // console.log(location)
  const getHeaders = () => localStorage.getItem("jwtoken") ? {
    "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
  } : {};

  const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
      ...options,
      headers: getHeaders,
    });

  const RedirectToLogin = () => {
    const introspect = useIntrospection();

    if (localStorage.getItem("jwtoken")) {
      introspect();
      return <></>;
    }
    return <Navigate to="/" />;
  };

  const apiDocumentationParser = (setRedirectToLogin) => async () => {
    try {
      setRedirectToLogin(false);

      return await parseHydraDocumentation(ENTRYPOINT, { headers: getHeaders });
    } catch (result) {
      const { api, response, status } = result;
      if (status !== 401 || !response) {
        throw result;
      }

      // Prevent infinite loop if the token is expired
      localStorage.removeItem("jwtoken");

      return {
        api,
        response,
        status,
      };
    }
  };


  const dataProvider = (setRedirectToLogin) => baseHydraDataProvider({
    entrypoint: ENTRYPOINT,
    httpClient: fetchHydra,
    apiDocumentationParser: apiDocumentationParser(setRedirectToLogin),
  });


  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (user) {
    if (user.roles.includes("ROLE_ADMIN")) {
      return (
        <HydraAdmin
          dataProvider={dataProvider(setRedirectToLogin)}
          basename="/admin"
          entrypoint={ENTRYPOINT}>
          <CustomRoutes>
            {redirectToLogin ? <Route path="/" element={<RedirectToLogin />} /> : null}
          </CustomRoutes>
          <ResourceGuesser
            name="products"
          // create={ProductCreate}
          // list={ProductList}
          // edit={ProductEdit}
          // show={ProductShow}
          />
          <ResourceGuesser
            name="product_categories"
          // create={ProductCategoryCreate}
          // list={ProductCategoryList}
          // edit={ProductCategoryEdit}
          // show={ProductCategoryShow}
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
