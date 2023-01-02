import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ArrayField, SingleFieldList, WithRecord } from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";
import Chip from '@mui/material/Chip';

const ProductSubCategoryShow = (props) => (
  <ShowGuesser title={<ProductSubCategoryTitle />} {...props}>
    <FieldGuesser source={"name"} />
    <WithRecord
      label="thumbnail"
      render={(record) => (
        <img
          className="thumbnail"
          src={`${process.env.REACT_APP_UPLOADS}/${record.thumbnail}`}
        />
      )}
    />
    <WithRecord
      label="Products"
      render={(record) =>
        record.products.length === 0 ? (
          <span>No products found</span>
        ) : (
          <ArrayField source="products">
            <SingleFieldList>
              <WithRecord
                label="Products"
                render={(record) =>
                  record &&
                  <Chip
                    label={record.name}
                    onClick={() => window.location.href = `/admin/products/%2Fapi%2Fproducts%2F${record.slug}/edit`}
                  />}
              />
            </SingleFieldList>
          </ArrayField>
        )
      }
    />
  </ShowGuesser>
);
export default ProductSubCategoryShow;
