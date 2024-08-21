import { useNavigate } from "react-router-dom";
import { People } from "../types/people";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchPeople=()=>{
    return useQuery<People[],AxiosError>("people",()=>
        axios.get(`${Config.baseApiUrl}/api/People/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchPerson=(id: number)=>{
    return useQuery<People,AxiosError>(["people",id],()=>
    axios.get(`${Config.baseApiUrl}/api/People/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddPeople = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, People>(
      (h) => axios.post(`${Config.baseApiUrl}/api/People/Add`, h),
      {
        onSuccess: (_) => {
          queryClient.invalidateQueries("people");
         
              nav("/people");
            
        },
      }
    );
  };

  const useUpdatePeople = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, People>(
      (h) => axios.post(`${Config.baseApiUrl}/api/People/Update`, h),
      {
        onSuccess: (_, people) => {
          queryClient.invalidateQueries("people");
          nav(`/people/${people.id}`);
        },
      }
    );
   
  };
  
  const useDeletePeople = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, People>(
      (h) => axios.post(`${Config.baseApiUrl}/api/People/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("people");
          nav("/people");
        },
      }
    );
    
   
    
  };

export {
    useFetchPeople,
    useFetchPerson,
    useAddPeople,
    useUpdatePeople,
    useDeletePeople
};
