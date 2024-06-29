import { defineStore } from 'pinia';
import { ref } from 'vue';

import { api } from '../helpers/api';

import { FAILED, IN_PROGRESS, SUCCESS } from '../constants/status';
import { GET_USER, LOGIN, LOGOUT, SIGNUP } from '../constants/end-points';

import { IUser } from '../types';

import { handleError, setIsLogged } from './helpers';

import { IError } from './types';

interface IUserState {
  email: string | null,
  _id: string | null,
  isAuthenticated: boolean,
  loadingStatus: string,
}

const initialState: IUserState = {
  email: null,
  _id: null,
  isAuthenticated: false,
  loadingStatus: SUCCESS,
};

export const useUserStore = defineStore('users', () => {
  const user = ref<IUserState>(initialState);

  async function signup(userData: IUser) {
    user.value.loadingStatus = IN_PROGRESS;

    try {
      const { data } = await api({
        endPoint: SIGNUP,
        data: userData,
      });

      setIsLogged();
      user.value.loadingStatus = SUCCESS;
      user.value.isAuthenticated = true;
      user.value.email = data.email;
      user.value._id = data._id;
    } catch (error) {
      user.value.loadingStatus = FAILED;

      handleError(error as IError);
    }
  };

  async function login(userData: IUser) {
    user.value.loadingStatus = IN_PROGRESS;

    const { email } = userData;
    try {
      await api({
        endPoint: LOGIN,
        data: userData,
      });

      setIsLogged();
      user.value.loadingStatus = SUCCESS;
      user.value.isAuthenticated = true;
      user.value.email = email;
    } catch (error) {
      user.value.loadingStatus = FAILED;

      setIsLogged(false);
      user.value.isAuthenticated = false;

      handleError(error as IError);
    }
  };

  async function getUser() {
    user.value.loadingStatus = IN_PROGRESS;
    
    try {
      const { data } = await api({ endPoint: GET_USER });
      
      user.value.loadingStatus = SUCCESS;
      user.value.isAuthenticated = true;
      user.value.email = data.email;
      user.value._id = data._id;

      localStorage.setItem('user', data.email);
    } catch (error) {
      user.value.loadingStatus = FAILED;

      user.value.isAuthenticated = false;
      user.value.email = null;

      handleError(error as IError);
    }
  };

  async function logout() {
    user.value.loadingStatus = IN_PROGRESS;

    try {
      await api({ endPoint: LOGOUT });
    } catch (error) {
      user.value.loadingStatus = FAILED;

      handleError(error as IError);
    } finally {
      user.value.loadingStatus = SUCCESS;
      user.value.email = null;
      user.value._id = null;
      user.value.isAuthenticated = false;
      localStorage.clear();
    }
  };

  return {
    user,
    signup,
    login,
    getUser,
    logout,
  };
});
