const localStorageKey = 'mybit_accepted_terms_of_service';

export const getUserAcceptedTermsOfService = () => {
  if(window && window.localStorage){
    return window.localStorage.getItem(localStorageKey);
  }

  return false;
}

export const setUserAcceptedTermsOfService = () => {
  if(window && window.localStorage){
    window.localStorage.setItem(localStorageKey, true);
  }
}
