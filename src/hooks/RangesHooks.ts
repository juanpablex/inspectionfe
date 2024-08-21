import { useNavigate } from "react-router-dom";
import { Ranges } from "../types/ranges";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchRanges=()=>{
    return useQuery<Ranges[],AxiosError>("ranges",()=>
        axios.get(`${Config.baseApiUrl}/api/Ranges/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchRange=(id: number)=>{
    return useQuery<Ranges,AxiosError>(["ranges",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Ranges/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddRanges = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Ranges>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Ranges/Add`, h),
      {
        onSuccess: (_,ranges) => {
          queryClient.invalidateQueries("ranges");
          if(ranges.modal?.includes("edit")){
            nav(`/${ranges.modal}`);
          }else{
            if(ranges.modal!=""){
              var goto = ranges.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/ranges");
            }
          }
        },
      }
    );
  };

  const useUpdateRanges = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Ranges>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Ranges/Update`, h),
      {
        onSuccess: (_, ranges) => {
          queryClient.invalidateQueries("ranges");
          nav(`/ranges/${ranges.id}`);
        },
      }
    );
   
  };
  
  const useDeleteRanges = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Ranges>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Ranges/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("ranges");
          nav("/ranges");
        },
      }
    );
    
   
    
  };

export {
    useFetchRanges,
    useFetchRange,
    useAddRanges,
    useUpdateRanges,
    useDeleteRanges
};
