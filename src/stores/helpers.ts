import { IError } from './types';

export const setIsLogged = (isLogged = true) => {
  localStorage.setItem('is-logged', isLogged ? 'true' : '');
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
    throw new Error('Something went wrong');
  }
}
