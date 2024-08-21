import { useAddColors } from "../../hooks/ColorsHooks";
import { Colors } from "../../types/colors";
import ValidationSummary from "../../ValidationSummary";
import ColorsForm from "./ColorsForm";

const ColorsAdd = () => {
  const addColorsMutation = useAddColors();

  const colors: Colors = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addColorsMutation.isError && (
        <ValidationSummary error={addColorsMutation.error} />
      )}
      <ColorsForm
        entity={colors}
        submitted={(colors) => addColorsMutation.mutate(colors)}
        parent = {colors.modal}
      />
    </>
  );
};

export default ColorsAdd;
