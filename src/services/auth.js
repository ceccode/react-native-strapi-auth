import { API_URL } from '@env';

const fetchLoggedInUser = async (token) => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

const updateUser = async (userId, token, updatedUserData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });

  const data = await response.json();
  return data;
};

const doLogin = async (identifier, password) => {
  const value = {
    identifier,
    password,
  };

  const response = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  const data = await response.json();
  return data;
};

const forgotPass = async (email) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return data;
};

const resetPass = async ({ password, passwordConfirmation, code }) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      passwordConfirmation,
      code,
    }),
  });
  const data = await response.json();
  return data;
};

const doSigunp = async (user) => {
  const response = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export { doLogin, doSigunp, forgotPass, resetPass, fetchLoggedInUser, updateUser };
