import React, { useContext, useEffect, useState } from "react";
import {
    fetchHydra as baseFetchHydra,
    HydraAdmin,
    hydraDataProvider as baseHydraDataProvider,
    useIntrospection,
    ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { AuthContext } from "../../../contexts/AuthContext";
import { Navigate, useNavigate, Route, useLocation } from "react-router-dom";
import { Layout } from 'react-admin';
import { ReactQueryDevtools } from 'react-query/devtools';

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

export const MyLayout = props => (
    <>
        <Layout {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

export const myDataProvider = {
    ...dataProvider,
    update: (resource, params) => {
        if (resource !== 'posts') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }

        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `picture` sent property, with `src` and `title` attributes.
         */

        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`,
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.update(resource, {
                    data: {
                        ...params.data,
                        pictures: [
                            ...transformedNewPictures,
                            ...formerPictures,
                        ],
                    },
                })
            );
    },
};