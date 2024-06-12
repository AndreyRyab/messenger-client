export const checkIsLogged = () => {
  if (localStorage.getItem('isLogged')) {
    return localStorage.getItem('isLogged') === 'true';
  }
  return false;
}
