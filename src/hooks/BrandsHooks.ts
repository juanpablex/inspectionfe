import { useNavigate } from "react-router-dom";
import { Brands } from "../types/brands";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchBrands=()=>{
    return useQuery<Brands[],AxiosError>("brands",()=>
        axios.get(`${Config.baseApiUrl}/api/Brands/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchBrand=(id: number)=>{
    return useQuery<Brands,AxiosError>(["brands",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Brands/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddBrands = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Brands>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Brands/Add`, h),
      {
        onSuccess: (_,brands) => {
          queryClient.invalidateQueries("brands");
          if(brands.modal?.includes("edit")){
            nav(`/${brands.modal}`);
          }else{
            if(brands.modal!=""){
              var goto = brands.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/brands");
            }
           
          }
        },
      }
    );
  };

  const useUpdateBrands = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Brands>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Brands/Update`, h),
      {
        onSuccess: (_, brands) => {
          queryClient.invalidateQueries("brands");
          nav(`/brands/${brands.id}`);
        },
      }
    );
   
  };
  
  const useDeleteBrands = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Brands>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Brands/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("brands");
          nav("/brands");
        },
      }
    );
    
   
    
  };

export {
    useFetchBrands,
    useFetchBrand,
    useAddBrands,
    useUpdateBrands,
    useDeleteBrands
};
