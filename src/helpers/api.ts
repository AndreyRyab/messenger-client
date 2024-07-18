
import axios from 'axios';
import { GET_USER } from '../constants/end-points';
import { IUser } from '../types';

export interface IApiParams {
  endPoint: string;
  data?: IUser;
}

export const api = async (params: IApiParams): Promise<any> => {
  const { endPoint = '', data } = params;

  const method = endPoint === GET_USER ? 'GET' : 'POST';

  try {
    const result = axios.request(
      {
        url: endPoint,
        baseURL: import.meta.env.VITE_API_URL,
        method,
        data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return result;
  } catch (error) {
    return error;
  }
}
