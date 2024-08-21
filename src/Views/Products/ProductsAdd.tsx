import { useLocation } from "react-router-dom";
import { useAddProducts } from "../../hooks/ProductsHooks";
import { Products } from "../../types/products";
import ValidationSummary from "../../ValidationSummary";
import ProductsForm from "./ProductsForm";

const ProductsAdd = () => {
  const addProductsMutation = useAddProducts();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const modal = params.get('modal');
  const products: Products = {
    id:0,
    name: "",
    supplier:"",
    brandId:0,
    colorId:0,
    modelId:0,
    chasis:"",
    modal:""
  };

  return (
    <>
      {addProductsMutation.isError && (
        <ValidationSummary error={addProductsMutation.error} />
      )}
      <ProductsForm
        entity={products}
        submitted={(product) => addProductsMutation.mutate(product)}
        parent={modal}
      />
    </>
  );
};

export default ProductsAdd;
