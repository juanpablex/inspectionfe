import { useAddRanges } from "../../hooks/RangesHooks";
import { Ranges } from "../../types/ranges";
import ValidationSummary from "../../ValidationSummary";
import RangesForm from "./RangesForm";

const RangesAdd = () => {
  const addRangesMutation = useAddRanges();

  const ranges: Ranges = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addRangesMutation.isError && (
        <ValidationSummary error={addRangesMutation.error} />
      )}
      <RangesForm
        entity={ranges}
        submitted={(ranges) => addRangesMutation.mutate(ranges)}
        parent={ranges.modal}
      />
    </>
  );
};

export default RangesAdd;
