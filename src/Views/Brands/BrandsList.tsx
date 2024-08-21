import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchBrands } from "../../hooks/BrandsHooks";
import { Brands } from "../../types/brands";

const BrandsList = () => {
  const nav = useNavigate();
  const { data: dataBrands, status:statusBrands, isSuccess:isSuccessBrands } = useFetchBrands();

   if (!isSuccessBrands) return <ApiStatus status={statusBrands}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Marcas
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
            {dataBrands &&
            dataBrands.map((h: Brands) => (
              <tr key={h.id} onClick={() => nav(`/brands/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/brands/add">
        Agregar
      </Link>
    </div>
  );
};

export default BrandsList;
