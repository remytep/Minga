import {
    useRecordContext
} from "react-admin";

export const ProductCategoryTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Category : {record.name}</span>;
};

export const ProductTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Product : {record.name}</span>;
};