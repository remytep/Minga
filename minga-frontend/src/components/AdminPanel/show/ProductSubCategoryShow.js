import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ArrayField, SingleFieldList, WithRecord } from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";

const ProductSubCategoryShow = (props) => {
  const navigate = useNavigate();
  return (
    <ShowGuesser title={<ProductSubCategoryTitle />} {...props}>
      <FieldGuesser source={"name"} />
      <WithRecord
        label="thumbnail"
        render={(record) => (
          <img
            className="thumbnail"
            src={`${process.env.REACT_APP_UPLOADS}/${record.thumbnail}`}
          />
        )
        }
      />
      <WithRecord
        label="Products"
        render={(record) =>
          record.products.length === 0 ? (
            <span>No products found</span>
          ) : (
            <ArrayField source="products">
              <SingleFieldList linkType={false}>
                <WithRecord
                  label="Products"
                  render={(record) =>
                    record &&
                    <Chip
                      label={record.name}
                      onClick={() => navigate(`/admin/products/%2Fapi%2Fproducts%2F${record.slug}/edit`)}
                    />}
                />
              </SingleFieldList>
            </ArrayField>
          )
        }
      />
    </ShowGuesser>
  );
}
export default ProductSubCategoryShow;
