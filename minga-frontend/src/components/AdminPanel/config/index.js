import React, { useContext, useEffect, useState } from "react";
import {
    fetchHydra as baseFetchHydra,
    HydraAdmin,
    hydraDataProvider as baseHydraDataProvider,
    useIntrospection,
    ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { Navigate, useNavigate, Route, useLocation } from "react-router-dom";

const getHeaders = () => localStorage.getItem("jwtoken") ? {
    "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
} : {};

const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
        ...options,
        headers: getHeaders,
    });


const apiDocumentationParser = () => async () => {
    try {

        return await parseHydraDocumentation(process.env.REACT_APP_ENTRYPOINT, { headers: getHeaders });
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

export const dataProvider = (setRedirectToLogin) => baseHydraDataProvider({
    entrypoint: process.env.REACT_APP_ENTRYPOINT,
    httpClient: fetchHydra,
    apiDocumentationParser: apiDocumentationParser(setRedirectToLogin),
});

export const RedirectToLogin = () => {
    const introspect = useIntrospection();

    if (localStorage.getItem("jwtoken")) {
        introspect();
        return <></>;
    }
    return <Navigate to="/" />;
};