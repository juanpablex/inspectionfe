import { useNavigate } from "react-router-dom";
import { PaymentMethods } from "../types/paymentMethods";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchPaymentMethods=()=>{
    return useQuery<PaymentMethods[],AxiosError>("paymentMethods",()=>
        axios.get(`${Config.baseApiUrl}/api/PaymentMethods/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchPaymentMethod=(id: number)=>{
    return useQuery<PaymentMethods,AxiosError>(["paymentMethods",id],()=>
    axios.get(`${Config.baseApiUrl}/api/PaymentMethods/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddPaymentMethods = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, PaymentMethods>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PaymentMethods/Add`, h),
      {
        onSuccess: (_) => {
          queryClient.invalidateQueries("models");
         
              nav("/paymentMethods");
            
        },
      }
    );
  };

  const useUpdatePaymentMethods = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, PaymentMethods>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PaymentMethods/Update`, h),
      {
        onSuccess: (_, paymentMethods) => {
          queryClient.invalidateQueries("paymentMethods");
          nav(`/paymentMethods/${paymentMethods.id}`);
        },
      }
    );
   
  };
  
  const useDeletePaymentMethods = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, PaymentMethods>(
      (h) => axios.post(`${Config.baseApiUrl}/api/PaymentMethods/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("paymentMethods");
          nav("/paymentMethods");
        },
      }
    );
    
   
    
  };

export {
    useFetchPaymentMethods,
    useFetchPaymentMethod,
    useAddPaymentMethods,
    useUpdatePaymentMethods,
    useDeletePaymentMethods
};
