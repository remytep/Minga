import { AUTH_LOGIN } from 'react-admin';
import { createBrowserHistory } from '@remix-run/router';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('http://127.0.0.1:37153/api', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        // auth for user
        if (username === 'user' && password === 'password') {
            localStorage.setItem('role', 'user');
            localStorage.removeItem('not_authenticated');
            return Promise.resolve();
        }

        // auth for admin
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('role', 'admin');
            localStorage.removeItem('not_authenticated');
            return Promise.resolve();
        }
        localStorage.setItem('not_authenticated', true);
        return Promise.reject();

        // return fetch(request)
        //     .then(response => {
        //         if (response.status < 200 || response.status >= 300) {
        //             throw new Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        //     .then(({ token }) => {
        //         localStorage.setItem('token', token);
        //     });
    }
    return Promise.resolve();
}