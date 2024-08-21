import { useNavigate } from "react-router-dom";
import { Contracts } from "../types/contracts";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchContracts=()=>{
    return useQuery<Contracts[],AxiosError>("contracts",()=>
        axios.get(`${Config.baseApiUrl}/api/Contracts/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchContract=(id: number)=>{
    return useQuery<Contracts,AxiosError>(["contracts",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Contracts/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddContracts = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Contracts>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Contracts/Add`, h),
      {
        onSuccess: (_,contracts) => {
          queryClient.invalidateQueries("contracts");
          if(contracts.modal!=""&& contracts.modal!="contracts"){
            var goto = contracts.modal;
            nav(`/${goto}/add?modal=${goto}`);
          }else{
            nav("/contracts");
          }
        },
      }
    );
  };

  const useUpdateContracts = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Contracts>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Contracts/Update`, h),
      {
        onSuccess: (_, contracts) => {
          queryClient.invalidateQueries("contracts");
          nav(`/contracts/${contracts.id}`);
        },
      }
    );
   
  };
  
  const useDeleteContracts = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Contracts>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Contracts/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("contracts");
          nav("/contracts");
        },
      }
    );
    
   
    
  };

export {
    useFetchContracts,
    useFetchContract,
    useAddContracts,
    useUpdateContracts,
    useDeleteContracts
};
