import React, { useEffect, useState } from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { AutocompleteInput, FormDataConsumer, ImageField, ImageInput, ReferenceInput } from "react-admin";
import { required } from 'react-admin';
import axios from "axios";

const SkuCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" validate={required()} />
        </ReferenceInput>
        <ImageInput source="thumbnail" fullWidth >
            <ImageField source="src" title="title" validate={required()} />
        </ImageInput>
        <InputGuesser source="price" fullWidth validate={required()} />
        <InputGuesser source="stock" fullWidth validate={required()} />
        <InputGuesser source="referenceNumber" fullWidth validate={required()} />
    </CreateGuesser>
)

export default SkuCreate;