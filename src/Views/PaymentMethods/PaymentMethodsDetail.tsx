
import { Link, useParams } from "react-router-dom";
import {  useFetchPaymentMethod,useDeletePaymentMethods } from "../../hooks/PaymentMethodsHooks";
import ApiStatus from "../../apiStatus";
import PaymentMethodsList from "./PaymentMethodsList";

const PaymentMethodsDetail = () => {
  const { id} = useParams();

  const tableName="PaymentMethods";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataPaymentMethods, status: statusPaymentMethods, isSuccess:isSuccessPaymentMethods } = useFetchPaymentMethod(entityId);
  const deleteEntityMutation = useDeletePaymentMethods();

  if (!isSuccessPaymentMethods) return <ApiStatus status={statusPaymentMethods} />;

  if (!dataPaymentMethods) return <div>PaymentMethod not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Marcas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <PaymentMethodsList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row">
          <h3 className="col-12">{dataPaymentMethods.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/paymentMethods/edit/${dataPaymentMethods.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataPaymentMethods);
              }}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsDetail;
