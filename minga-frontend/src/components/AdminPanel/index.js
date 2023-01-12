import React, { useContext, useEffect, useState } from "react";
import {
  fetchHydra as baseFetchHydra,
  HydraAdmin,
  hydraDataProvider as baseHydraDataProvider,
} from "@api-platform/admin";

import * as create from "./create";
import * as edit from "./edit";
import * as list from "./list";
import * as show from "./show";
import { Resource } from "react-admin";
import { dataProvider } from "./config";
import { MyLayout } from "./Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { CustomRoutes } from 'react-admin';
import StripeCouponCreate from "./create/StripeCouponCreate";
import StripeCouponList from "./list/StripeCouponList";
import StripeCouponEdit from "./edit/StripeCouponEdit";
import StripeCouponShow from "./show/StripeCouponShow";

const AdminPanel = () =>
// const { user, loaded, logout } = useContext(AuthContext);

// //if there is a user which is not an admin or a guest, then navigate to home page
// if (loaded &&
//   (!user || (user && !user.roles.includes("ROLE_ADMIN")))
// ) {
//   return (
//     <Navigate to="/" />
//   )
// }

(
  <HydraAdmin
    layout={MyLayout}
    dataProvider={dataProvider()}
    basename="/admin/panel"
    entrypoint={process.env.REACT_APP_ENTRYPOINT}
  >
    <Resource
      name={"products"}
      create={create.ProductCreate}
      list={list.ProductList}
      edit={edit.ProductEdit}
      show={show.ProductShow}
      recordRepresentation="name"
    />
    <Resource
      name={"product_categories"}
      create={create.ProductCategoryCreate}
      list={list.ProductCategoryList}
      edit={edit.ProductCategoryEdit}
      show={show.ProductCategoryShow}
      recordRepresentation="name"
    />
    <Resource
      name={"product_sub_categories"}
      create={create.ProductSubCategoryCreate}
      list={list.ProductSubCategoryList}
      edit={edit.ProductSubCategoryEdit}
      show={show.ProductSubCategoryShow}
      recordRepresentation="name"
    />
    <Resource
      name={"product_options"}
      create={create.ProductOptionCreate}
      list={list.ProductOptionList}
      edit={edit.ProductOptionEdit}
      recordRepresentation="name"
    />
    <Resource
      name={"product_option_values"}
      list={list.ProductOptionValueList}
      create={create.ProductOptionValueCreate}
      show={show.ProductOptionValueShow}
      edit={edit.ProductOptionValueEdit}
      recordRepresentation="value"
    />
    <Resource
      name={"skus"}
      list={list.SkuList}
      create={create.SkuCreate}
      show={show.SkuShow}
      edit={edit.SkuEdit}
      recordRepresentation="referenceNumber"
    />
    <Resource
      name={"sku_values"}
      list={list.SkuValueList}
      create={create.SkuValueCreate}
      edit={edit.SkuValueEdit}
      show={show.SkuValueShow}
    />
    <Resource name={"users"} list={list.UserList} create={create.UserCreate} />
    <Resource
      name={"orders"}
      list={list.OrderList}
      create={create.OrderCreate}
      edit={edit.OrderEdit}
      show={show.OrderShow}
      recordRepresentation="orderNumber"
    />
    <Resource
      name={"order_items"}
      list={list.OrderItemList}
      create={create.OrderItemCreate}
      edit={edit.OrderItemEdit}
      show={show.OrderItemShow}
    />
    <Resource
      name={"users"}
      list={list.UserList}
      create={create.UserCreate}
    />
    <CustomRoutes>
      <Route path="/coupon/">
        <Route index element={<StripeCouponList />} />
        <Route path="create" element={<StripeCouponCreate />} />
        <Route path="edit/:id" element={<StripeCouponEdit />} />
        <Route path="show/:id" element={<StripeCouponShow />} />
      </Route>
      <Route path="/profile" />
    </CustomRoutes>
  </HydraAdmin>
);

export default AdminPanel;
