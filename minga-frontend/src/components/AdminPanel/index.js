import React, { useContext, useEffect, useState } from "react";
import {
    fetchHydra as baseFetchHydra,
    HydraAdmin,
    hydraDataProvider as baseHydraDataProvider,
} from "@api-platform/admin";
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
import { CustomRoutes, Resource } from "react-admin";
import { ENTRYPOINT } from "../../config";
import { dataProvider } from "./config";
import { MyLayout } from "./config";

const AdminPanel = () => (
    <HydraAdmin
        layout={MyLayout}
        dataProvider={dataProvider()}
        basename="/admin"
        entrypoint={ENTRYPOINT}>
        <Resource
            name={"products"}
            create={ProductCreate}
            list={ProductList}
            edit={ProductEdit}
            show={ProductShow}
            recordRepresentation="name"
        />
        <Resource
            name={"product_categories"}
            create={ProductCategoryCreate}
            list={ProductCategoryList}
            edit={ProductCategoryEdit}
            show={ProductCategoryShow}
            recordRepresentation="name"
        />
        <Resource
            name={"product_options"}
            create={ProductOptionCreate}
            list={ProductOptionList}
        />
        <Resource
            name={"product_option_values"}
            create={ProductOptionValueCreate}
        />
        <Resource name={"skus"} />
        <Resource name={"sku_values"} />
        <Resource name={"users"} create={UserCreate} />
    </HydraAdmin>
);


export default AdminPanel;