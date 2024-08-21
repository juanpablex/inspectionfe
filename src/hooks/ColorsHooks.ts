import { useNavigate } from "react-router-dom";
import { Colors } from "../types/colors";
import {useMutation, useQuery,useQueryClient} from "react-query";
import Config from "../config";
import axios,{AxiosError,AxiosResponse} from "axios";
import Problem from "../types/problem";






const useFetchColors=()=>{
    return useQuery<Colors[],AxiosError>("colors",()=>
        axios.get(`${Config.baseApiUrl}/api/Colors/GetList`).then((resp)=>resp.data["data"])
    );
};

const useFetchColor=(id: number)=>{
    return useQuery<Colors,AxiosError>(["colors",id],()=>
    axios.get(`${Config.baseApiUrl}/api/Colors/GetById/${id}`).then((resp)=>resp.data["data"])
    );
};

const useAddColors = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Colors>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Colors/Add`, h),
      {
        onSuccess: (_,colors) => {
          queryClient.invalidateQueries("colors");
          if(colors.modal?.includes("edit")){
            nav(`/${colors.modal}`);
          }else{
            if(colors.modal!=""){
              var goto = colors.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/colors");
            }
          }
        },
      }
    );
  };

  const useUpdateColors = () => {
 
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Colors>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Colors/Update`, h),
      {
        onSuccess: (_, colors) => {
          queryClient.invalidateQueries("colors");
          nav(`/colors/${colors.id}`);
        },
      }
    );
   
  };
  
  const useDeleteColors = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Colors>(
      (h) => axios.post(`${Config.baseApiUrl}/api/Colors/Delete`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("colors");
          nav("/colors");
        },
      }
    );
    
   
    
  };

export {
    useFetchColors,
    useFetchColor,
    useAddColors,
    useUpdateColors,
    useDeleteColors
};
