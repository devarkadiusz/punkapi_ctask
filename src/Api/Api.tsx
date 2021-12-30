const API_URL = 'http://127.0.0.1:8080/api/';

export const Api = async (method: string, url: string, body: string | undefined, auth: boolean = false) => {

    const headers = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': ''
    };
    headers.Authorization = auth ? `${localStorage.getItem('token')}` : ''

    return await fetch(API_URL + url, { 
        method: method,
        headers: headers,
        body: body
     }).then(async response => {
        if(response.status < 400)
            return await response.json();
        else if(response.status === 401)
            return Logout();
        else
            return response.status
    });

}

export const Login = async (login: string, password: string) => {

    const body = JSON.stringify({
        "username": login,
        "password": password
    });

    let response = await Api('POST', 'login', body);

    if(response && response.token)
        localStorage.setItem('token', `Bearer ${response.token}`);
    return response
}

export const Logout = async () => {

    localStorage.removeItem('token');
    return false;

}

export const Register = async (login: string, password: string, email: string) => {

    const body = JSON.stringify({
        "username": login,
        "password": password,
        "email": email
    });

    let response = await Api('POST', 'register', body)

    if(response && response.token)
        localStorage.setItem('token', response.token);
    return response

}

export const FavoriteGetAll = async () => {

    const body = undefined;
    const auth = true;

    return await Api('GET', 'favorite', body, auth);
}

export const FavoriteToggle = async (beerID: number) => {

    const body = JSON.stringify({
        "beerID": beerID
    });
    const auth = true;

    return await Api('PUT', 'favorite', body, auth);

}

export const FavoriteDelete = async (beerID: number) => {

    const body = JSON.stringify({
        "beerID": beerID
    });
    const auth = true;

    return await Api('DELETE', 'favorite', body, auth);

}