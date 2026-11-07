/* eslint-disable  @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';

import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { Email, Password } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

const USER_TEST = {
  email: 'dev1@example.com',
  password: '123123',
  userId: 100087408,
};

export const authUser = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'auth.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const fixtures = auth;
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

// Fonction utilitaire pour générer toutes les fixtures
export const generateAllFixtures = async (httpConnection: HttpConnection) => {
  await authUser(httpConnection);
};
