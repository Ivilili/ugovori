import { apiRequest } from "./Api";

interface ContractProps {
  kupac?: any;
  broj_ugovora: string;
  datum_akontacije: any;
  rok_isporuke?: any;
  status: string;
}

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

export const createNewContract = async (data:ContractProps) => {
  return apiRequest<any, any>(
    "post",
    `ugovori`,
    data
  );
};

export const updateNewContract = async (id: string, status: string) => {
  return apiRequest<any, any>(
    "put",
    `ugovori/${id}`,
   { status: status }
  );
};

export const getContractProducts = async (id: string) => {
  return apiRequest<any, any>(
    "get",
    `ugovori/${id}/artikli`
  );
};

