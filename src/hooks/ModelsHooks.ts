import { useNavigate } from "react-router-dom";
import { Models } from "../types/models";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchModels=()=>{
    return useQuery<Models[],AxiosError>("models",()=>
        axios.get(`${Config.baseApiUrl}/api/Models/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchModel=(id: number)=>{
    return useQuery<Models,AxiosError>(["models",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Models/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddModels = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Models>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Models/Add`, h),
      {
        onSuccess: (_,models) => {
          queryClient.invalidateQueries("models");
          if(models.modal?.includes("edit")){
            nav(`/${models.modal}`);
          }else{
            if(models.modal!=""){
              var goto = models.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/models");
            }
          }
        },
      }
    );
  };

  const useUpdateModels = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Models>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Models/Update`, h),
      {
        onSuccess: (_, models) => {
          queryClient.invalidateQueries("models");
          nav(`/models/${models.id}`);
        },
      }
    );
   
  };
  
  const useDeleteModels = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Models>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Models/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("models");
          nav("/models");
        },
      }
    );
    
   
    
  };

export {
    useFetchModels,
    useFetchModel,
    useAddModels,
    useUpdateModels,
    useDeleteModels
};
