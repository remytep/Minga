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
import { dataProvider, MyLayout } from "./config";

const AdminPanel = () => (
  <HydraAdmin
    layout={MyLayout}
    dataProvider={dataProvider()}
    basename="/admin"
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
    <Resource
      name={"users"}
      list={list.UserList}
      create={create.UserCreate}
    />
  </HydraAdmin>
);

export default AdminPanel;
