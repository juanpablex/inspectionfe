import { useNavigate } from "react-router-dom";
import { States } from "../types/states";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchStates=()=>{
    return useQuery<States[],AxiosError>("states",()=>
        axios.get(`${Config.baseApiUrl}/api/States/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchState=(id: number)=>{
    return useQuery<States,AxiosError>(["states",id],()=>
    axios.get(`${Config.baseApiUrl}/api/States/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddStates = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, States>(
      (h) => axios.post(`${Config.baseApiUrl}/api/States/Add`, h),
      {
        onSuccess: (_,states) => {
          queryClient.invalidateQueries("states");
          if(states.modal?.includes("edit")){
            nav(`/${states.modal}`);
          }else{
            if(states.modal!=""){
              var goto = states.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/states");
            }
          }
        },
      }
    );
  };

  const useUpdateStates = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, States>(
      (h) => axios.post(`${Config.baseApiUrl}/api/States/Update`, h),
      {
        onSuccess: (_, states) => {
          queryClient.invalidateQueries("states");
          nav(`/states/${states.id}`);
        },
      }
    );
   
  };
  
  const useDeleteStates = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, States>(
      (h) => axios.post(`${Config.baseApiUrl}/api/States/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("states");
          nav("/states");
        },
      }
    );
    
   
    
  };

export {
    useFetchStates,
    useFetchState,
    useAddStates,
    useUpdateStates,
    useDeleteStates
};
