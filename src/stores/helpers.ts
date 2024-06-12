import { IError } from './types';

export const setIsLogged = (isLogged = true) => {
  localStorage.setItem('isLogged', isLogged ? 'true' : '');
}

export const handleError = (error: IError) => {
  if (error.response?.data.validation) {
    throw new Error(error.response?.data.validation.body.message);
  }

  if (error.response) {
    throw new Error(error.response.data.message);
  }

  if (error.message) {
    throw new Error(error.message);
  }

  else {
    throw new Error('Что-то пошло не так');
  }
}
