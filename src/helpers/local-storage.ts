export const checkIsLogged = () => {
  if (localStorage.getItem('is-logged')) {
    return localStorage.getItem('is-logged') === 'true';
  }
  return false;
}
