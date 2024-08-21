import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchPaymentMethods } from "../../hooks/PaymentMethodsHooks";
import { PaymentMethods } from "../../types/paymentMethods";

const PaymentMethodsList = () => {
  const nav = useNavigate();
  const { data: dataPaymentMethods, status:statusPaymentMethods, isSuccess:isSuccessPaymentMethods } = useFetchPaymentMethods();

   if (!isSuccessPaymentMethods) return <ApiStatus status={statusPaymentMethods}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Metodos de Pago
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
            <tbody >
            {dataPaymentMethods &&
            dataPaymentMethods.map((h: PaymentMethods) => (
              <tr key={h.id} onClick={() => nav(`/paymentMethods/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/paymentMethods/add">
        Agregar
      </Link>
    </div>
  );
};

export default PaymentMethodsList;
