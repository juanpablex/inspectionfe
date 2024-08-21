import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchBrand, useUpdateBrands } from "../../hooks/BrandsHooks";
import ValidationSummary from "../../ValidationSummary";
import BrandsForm from "./BrandsForm";

const BrandsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a brand id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchBrand(entityId);
  const updateEntityMutation = useUpdateBrands();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <BrandsForm
        entity={data}
        submitted={(brand) => {
          updateEntityMutation.mutate(brand);
        } } parent={null}      />
    </>
  );
};

export default BrandsEdit;
