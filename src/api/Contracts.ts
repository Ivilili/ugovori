import { apiRequest } from "./Api";

export const getAllContracts = async () => {
  return apiRequest<any, any>(
    "get",
    `ugovori`
  );
};

export const getContractById = async (id: string) => {
  return apiRequest<any, any>(
    "get",
    `ugovori/${id}`
  );
};

export const getContractProducts = async (id: string) => {
  return apiRequest<any, any>(
    "get",
    `ugovori/${id}/artikli`
  );
};