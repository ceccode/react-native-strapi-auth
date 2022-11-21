import * as React from 'react';

import { getToken, saveToken, removeToken } from './../secure-storage';
import { doLogin, doSigunp, fetchLoggedInUser, updateUser } from './../services/auth';

const AuthenticationStateContext = React.createContext();
const AuthenticationDispatchContext = React.createContext();

function authenticationReducer(prevState, action) {
  console.log('authenticationReducer:action.type -> ', action.type);
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        user: action.user,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        user: null,
      };
    case 'UPDATE_USER':
      return {
        ...prevState,
        isSignout: false,
        user: action.user,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthenticationProvider({ children }) {
  const [state, dispatch] = React.useReducer(authenticationReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, user;

      try {
        userToken = await getToken('userToken');
      } catch (e) {
        console.error(e);
      }

      try {
        // After restoring token, we may need to validate it in production apps
        user = await fetchLoggedInUser(userToken);
      } catch (e) {
        //user may not more exist or token is invalid/expired
        console.error(e);
        dispatch({ type: 'SIGN_OUT', token: userToken });
      }

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, user });
    };

    bootstrapAsync();
  }, []);

  const actions = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const res = await doLogin(data.username, data.password);
          if (res.error) {
            throw res.error;
          }
          const token = res.jwt;
          const user = res.user;
          dispatch({ type: 'SIGN_IN', token, user });
          await saveToken(token);
        } catch (e) {
          console.error(e);
          await removeToken();
          dispatch({ type: 'SIGN_OUT' });
        }
      },
      signUp: async (data) => {
        try {
          dispatch({ type: 'SIGN_OUT' });
          const res = await doSigunp(data);
          if (res.error) {
            throw res.error;
          }
          console.log(res);
          const token = res.jwt;
          const user = res.user;
          dispatch({ type: 'SIGN_IN', token, user });
          await saveToken(token);
        } catch (e) {
          console.error(e);
        }
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
        await removeToken();
      },
      updateUser: async (data) => {
        try {
          const user = await updateUser(data.userId, data.token, data.userData);
          dispatch({ type: 'UPDATE_USER', user });
        } catch (e) {
          console.error(e);
          dispatch({ type: 'SIGN_OUT' });
        }
      },
    }),
    [state, dispatch]
  );

  return (
    <AuthenticationStateContext.Provider value={{ ...state, ...actions }}>
      <AuthenticationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
}

function useAuthenticationState() {
  const context = React.useContext(AuthenticationStateContext);
  if (context === undefined) {
    throw new Error('useAuthenticationState must be used within a AuthenticationProvider');
  }
  return context;
}

function useAuthenticationDispatch() {
  const context = React.useContext(AuthenticationDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthenticationDispatch must be used within a AuthenticationProvider');
  }
  return context;
}

export { AuthenticationProvider, useAuthenticationState, useAuthenticationDispatch };
