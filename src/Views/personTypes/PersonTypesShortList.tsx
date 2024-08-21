
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import  { containerStyle} from "../../config";
import { useFetchPersonTypes } from "../../hooks/PersonTypesHooks";
import { PersonTypes } from "../../types/personTypes";

const PersonTypesList = () => {
  const nav = useNavigate();
  const { data, status, isSuccess } = useFetchPersonTypes();
console.log("datos: ",data);
   if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;
  
// const nav = useNavigate();
// const [data,setData] = useState<PersonTypes[]>([]);
// const[isLoading,setIsLoading]=useState<boolean>(true);
// const[error,setError]=useState<any>(null);

// useEffect(()=>{
//   const fetchData= async()=>{
//     try{
//       const response = await fetcher(`${Config.baseApiUrl}/api/PersonTypes/GetList`);
//       setData(response);
//       setIsLoading(false);
      
//     }catch(error){  
//       setError(error);
//       setIsLoading(false);
//     }
//   };
//   console.log("datos: " , data);
//   fetchData();
 
// },[]); 

// if(isLoading) return <div>Loading...</div>;
// if(error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <div style={containerStyle}>
            <table className="table table-hover">
            <thead>
            <tr>
                <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
            {data && Array.isArray(data) &&
                data.map((h: PersonTypes) => (
                <tr key={h.id} onClick={() => nav(`/personTypes/${h.id}`)}>
                    <td>{h.name}</td>
                </tr>
                ))} 
            
            </tbody>
        
        </table>
        </div>
        <Link className="btn btn-primary" to="/personTypes/add">
        Agregar
      </Link>
    </div>
  );
};

export default PersonTypesList;
