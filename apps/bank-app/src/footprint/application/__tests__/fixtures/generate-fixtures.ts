/* eslint-disable  @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';

import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { HouseholdVO, ICreateFootprintCommand } from '@clean-rn/footprint/domain';
import { FootprintMapper } from '@clean-rn/footprint/infrastructure';
import { Email, Password } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

const USER_WITH_NO_FOOTPRINT = {
  email: 'user3@example.com',
  password: '123123',
  userId: 100258141,
};

const USER_WITH_FOOTPRINT2024 = {
  email: 'dev1@example.com',
  password: '123123',
  userId: 100087408,
};

export const authUser = async (httpConnection: HttpConnection, userTest = USER_WITH_FOOTPRINT2024) => {
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

export const getFootprintEmpty = async (
  httpConnection: HttpConnection,
  userTest = USER_WITH_NO_FOOTPRINT,
) => {
  const fixtureFilePath = path.join(__dirname, 'get-footprint-empty.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);
  // Faire l'appel GET pour récupérer
  const response = await fetch(
    `${httpConnection.baseUrl}/app/footprint`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getFootprint2025 = async (
  httpConnection: HttpConnection,
  userTest = USER_WITH_FOOTPRINT2024,
) => {
  const fixtureFilePath = path.join(__dirname, 'get-footprint-2025.json');
  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);
  // Faire l'appel GET pour récupérer
  const response = await fetch(
    `${httpConnection.baseUrl}/app/footprint`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const createFootprintEmpty = async (
  httpConnection: HttpConnection,
  userTest = USER_WITH_NO_FOOTPRINT,
) => {
  const fixtureFilePath = path.join(__dirname, 'create-footprint-empty.json');

  // Auth user test
  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  // Prepare data
  const householdVO = await HouseholdVO.create({
    adultNumber: 2,
    childNumber: 1,
  });

  const createCommand: ICreateFootprintCommand = {
    userId: userTest.userId.toString(), // Utiliser un ID valide
    household: householdVO,
  };

  // fetch API
  const response = await fetch(
    `${httpConnection.baseUrl}/app/footprint`,
    httpConnection.options(IHttpVerb.POST, FootprintMapper.toDto(createCommand)),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const createFootprintExists = async (
  httpConnection: HttpConnection,
  userTest = USER_WITH_FOOTPRINT2024,
) => {
  const fixtureFilePath = path.join(__dirname, 'create-footprint-exists.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);
  // Préparer les données pour createFootprint
  const householdVO = await HouseholdVO.create({
    adultNumber: 2,
    childNumber: 1,
  });

  const createCommand: ICreateFootprintCommand = {
    userId: userTest.userId.toString(), // Utiliser un ID valide
    household: householdVO,
  };

  // Faire l'appel POST pour créer
  const response = await fetch(
    `${httpConnection.baseUrl}/app/footprint`,
    httpConnection.options(IHttpVerb.POST, FootprintMapper.toDto(createCommand)),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};
