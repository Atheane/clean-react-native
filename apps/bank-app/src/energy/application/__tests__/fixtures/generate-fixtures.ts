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

export const getSensors = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-sensors.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/sensor`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getMeasurementTemperature = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-measurement-temperature.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/sensor/temperature`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getMeasurementHumidity = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-measurement-humidity.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/sensor/relativeHumidity`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getMeasurementCO2 = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-measurement-co2-error404.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/sensor/co2`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getPriceComfort = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-price-comfort.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/core/comfort-price?period=BASELINE`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getRewards = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-rewards.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/reward/stats`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const getQuiz = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'get-quiz.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/quiz`,
    httpConnection.options(IHttpVerb.GET),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const checkAnswerFailed = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'check-answer-failed.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/quiz/answer`,
    httpConnection.options(IHttpVerb.POST, {
      quizId: 92885687,
      answerIdx: 0,
    }),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

export const checkAnswerSuccess = async (httpConnection: HttpConnection, userTest = USER_TEST) => {
  const fixtureFilePath = path.join(__dirname, 'check-answer-success.json');

  const authApi = AuthApi.getInstance(httpConnection);
  const auth = await authApi.login({
    email: new Email(userTest.email),
    password: new Password(userTest.password),
  });
  httpConnection.attachBearerToken(auth.accessToken);

  const response = await fetch(
    `${httpConnection.baseUrl}/app/energy-app/quiz/answer`,
    httpConnection.options(IHttpVerb.POST, {
      quizId: 92885687,
      answerIdx: 2,
    }),
  );
  const fixtures = await response.json();
  fs.writeFileSync(fixtureFilePath, JSON.stringify(fixtures, null, 2));
};

// Fonction utilitaire pour générer toutes les fixtures
export const generateAllFixtures = async (httpConnection: HttpConnection) => {
  await authUser(httpConnection);
  await getRewards(httpConnection);
  await getSensors(httpConnection);
  await getMeasurementTemperature(httpConnection);
  await getMeasurementHumidity(httpConnection);
  await getMeasurementCO2(httpConnection);
  await getPriceComfort(httpConnection);
  await getQuiz(httpConnection);
  await checkAnswerFailed(httpConnection);
  await checkAnswerSuccess(httpConnection);
};
