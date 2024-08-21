import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchProduct, useUpdateProducts } from "../../hooks/ProductsHooks";
import ValidationSummary from "../../ValidationSummary";
import ProductsForm from "./ProductsForm";

const ProductsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a people id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchProduct(entityId);
  const updateEntityMutation = useUpdateProducts();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <ProductsForm
        entity={data}
        submitted={(product) => {
          updateEntityMutation.mutate(product);
        } } parent={`products/edit/${id}`}      />
    </>
  );
};

export default ProductsEdit;
