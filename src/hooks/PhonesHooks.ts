import { useNavigate } from "react-router-dom";
import { Phones } from "../types/phones";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchPhones=()=>{
    return useQuery<Phones[],AxiosError>("phones",()=>
        axios.get(`${Config.baseApiUrl}/api/Phones/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchPhone=(id: number)=>{
    return useQuery<Phones,AxiosError>(["phones",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Phones/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddPhones = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Phones>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Phones/Add`, h),
      {
        onSuccess: (_,phones) => {
          queryClient.invalidateQueries("phones");
         
            nav(`/people/${phones.personId}`);
          
        },
      }
    );
  };

  const useUpdatePhones = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Phones>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Phones/Update`, h),
      {
        onSuccess: (_, phones) => {
          queryClient.invalidateQueries("phones");
          nav(`/people/${phones.personId}`);
        },
      }
    );
   
  };
  
  const useDeletePhones = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Phones>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Phones/Delete`, h),
      {
        onSuccess: (_,phones) => {
          queryClient.invalidateQueries("phones");
          nav(`/people/${phones.personId}`);
        },
      }
    );
    
   
    
  };

export {
    useFetchPhones,
    useFetchPhone,
    useAddPhones,
    useUpdatePhones,
    useDeletePhones
};
