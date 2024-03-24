import { apiRequest } from "./Api";

export const getAllContracts = async () => {
  return apiRequest<any, any>(
    "get",
    `ugovori`
  );
};