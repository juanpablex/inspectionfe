import { useNavigate } from "react-router-dom";
import { Products } from "../types/products";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchProducts=()=>{
    return useQuery<Products[],AxiosError>("products",()=>
        axios.get(`${Config.baseApiUrl}/api/Products/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchProduct=(id: number)=>{
    return useQuery<Products,AxiosError>(["products",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Products/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddProducts = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Products>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Products/Add`, h),
      {
        onSuccess: (_,products) => {
          queryClient.invalidateQueries("products");
          if(products.modal?.includes("add")){
            console.log("add: ",products);
            nav(`/products/${products.id}`);
          }else{
            if(products.modal!="products"){
              console.log("not empty: ",products);
              nav(`/${products.modal}/add?modal=${products.modal}`);
            }else{
              console.log("empty: ",products);
              nav("/products");
            }
          }
        },
      }
    );
  };

  const useUpdateProducts = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Products>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Products/Update`, h),
      {
        onSuccess: (_, products) => {
          queryClient.invalidateQueries("products");
          nav(`/products/${products.id}`);
        },
      }
    );
   
  };
  
  const useDeleteProducts = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Products>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Products/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          nav("/products");
        },
      }
    );
    
   
    
  };

export {
    useFetchProducts,
    useFetchProduct,
    useAddProducts,
    useUpdateProducts,
    useDeleteProducts
};
