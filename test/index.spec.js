/**
 * @jest-environment jsdom
 */

import * as auth from '../src/lib/firebase-service.js';
import login from '../src/Views/login';
import register from '../src/Views/register';

// test login
describe('login', () => {
  test('is a function', () => {
    expect(typeof login).toBe('function');
  });
  test('btnLogin exists', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('#btnLogin');
    expect(haveAButton).not.toBe(undefined);
  });
  test('register "btn" exists', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.createAccount');
    expect(haveAButton).not.toBe(undefined);
  });
  test('after click on "btn" register, it calls function navigateTo', () => {
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(login(navigateTo));
    const btnRegister = DOM.querySelector('.createAccount');
    btnRegister.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
  });
  test('after click on "btn" register call function navigateTo with /register ', () => {
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(login(navigateTo));
    const btnRegister = DOM.querySelector('.createAccount');
    btnRegister.click();
    expect(navigateTo).toHaveBeenLastCalledWith('/register');
  });
});

describe('Button login', () => {
  test('Test of click button login signIn', () => {
    // eslint-disable-next-line max-len
    jest.spyOn(auth, 'signInWithEmailAndPassword').mockImplementation(() => Promise.resolve({ email: 'ejemplo@ejemplo.com' }));
    const DOM = document.createElement('div');
    DOM.append(login());
    const email = DOM.querySelector('#txtEmail');
    const password = DOM.querySelector('#txtPassword');
    email.value = 'ejemplo@ejemplo.com';
    password.value = '123456';

    const buttonlogin = DOM.querySelector('#btnLogin');
    buttonlogin.click();
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line max-len
    expect(auth.signInWithEmailAndPassword).toHaveBeenLastCalledWith('ejemplo@ejemplo.com', '123456');
    setTimeout((done) => {
      const navigateTo = jest.fn();
      DOM.append(register(navigateTo));
      expect(navigateTo).toHaveBeenLastCalledWith('/post');
      done();
    }, 0);
  });
});
