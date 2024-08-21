import { useAddBrands } from "../../hooks/BrandsHooks";
import { Brands } from "../../types/brands";
import ValidationSummary from "../../ValidationSummary";
import BrandsForm from "./BrandsForm";

const BrandsAdd = () => {
  const addBrandsMutation = useAddBrands();

  const brands: Brands = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addBrandsMutation.isError && (
        <ValidationSummary error={addBrandsMutation.error} />
      )}
      <BrandsForm
        entity={brands}
        submitted={(brands) => addBrandsMutation.mutate(brands)}
        parent = {brands.modal}
      />
    </>
  );
};

export default BrandsAdd;
