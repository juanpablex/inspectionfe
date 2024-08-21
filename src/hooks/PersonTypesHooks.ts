import { useNavigate } from "react-router-dom";
import { PersonTypes } from "../types/personTypes";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";





const useFetchPersonTypes=()=>{
    //console.log("stop here");
    return useQuery<PersonTypes[],AxiosError>("personTypes",()=>
        axios.get(`${Config.baseApiUrl}/api/PersonTypes/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchPersonType=(id: number)=>{
    return useQuery<PersonTypes,AxiosError>(["personTypes",id],()=>
    axios.get(`${Config.baseApiUrl}/api/PersonTypes/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddPersonTypes = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, PersonTypes>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PersonTypes/Add`, h),
      {
        onSuccess: (_,personTypes) => {
          queryClient.invalidateQueries("personTypes");
          if(personTypes.modal?.includes("edit")){
            nav(`/${personTypes.modal}`);
          }else{
            if(personTypes.modal!=""){
              var goto = personTypes.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/personTypes");
            }
          }
        },
      }
    );
  };

  const useUpdatePersonTypes = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, PersonTypes>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PersonTypes/Update`, h),
      {
        onSuccess: (_, personTypes) => {
          queryClient.invalidateQueries("personTypes");
          nav(`/personTypes/${personTypes.id}`);
        },
      }
    );
   
  };
  
  const useDeletePersonTypes = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, PersonTypes>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PersonTypes/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("personTypes");
          nav("/personTypes");
        },
      }
    );
    
   
    
  };

export {
    useFetchPersonTypes,
    useFetchPersonType,
    useAddPersonTypes,
    useUpdatePersonTypes,
    useDeletePersonTypes
};
