import { FunctionComponent, useState } from 'react';
import * as Api from '../../../Api/Api';
import "./Auth.sass";
import { Navigate } from "react-router-dom";

export const Form: FunctionComponent = (props) => {
    return (<section className='Form'>
        {props.children}
    </section>);
}

interface DataInterface {
    username: string; 
    password: string; 
    email: string;
}

export const Auth: FunctionComponent = () => {
    const [registerForm, setRegisterForm] = useState<Boolean>(false);
    const [data, setData] = useState<DataInterface>({username: '', password: '', email: ''});
    const [status, setStatus] = useState<object | number>();

    const Login = async () => setStatus(await Api.Login(data.username, data.password));
    const Register = async () => setStatus(await Api.Register(data.username, data.password, data.email));

    const handleSubmit = () => {
        if(data.username.length > 4 && data.password.length >= 7)
            registerForm ? Register() : Login()
    }

    return (<div className='Auth'>
        {localStorage.getItem('token') ? <Navigate replace to="/beerlist" /> : null}
        <Form>
            <span className='title'>{registerForm ? 'Zarejestruj się' :'Zaloguj się'}</span>
            <span>Login</span>
            <input type='text' className={status === 404 || (registerForm && status === 409) ? 'bad_input' : ''} onInput={(e: React.FormEvent<HTMLInputElement>) => {
                data.username = e.currentTarget.value;
                setData(data);
                setStatus(undefined);
            }} />

            {registerForm ? <div><span>Email</span><input type='text' className={status === 404 || (registerForm && status === 409) ? 'bad_input' : ''} onInput={(e: React.FormEvent<HTMLInputElement>) => {
                data.email = e.currentTarget.value;
                setData(data);
                setStatus(undefined);
            }} /></div> : null}

            <span>Password</span>
            <input type='password' className={status === 404 || (registerForm && status === 409) ? 'bad_input' : ''} onInput={(e: React.FormEvent<HTMLInputElement>) => {
                data.password = e.currentTarget.value;
                setData(data);
                setStatus(undefined);
            }} />
            <input 
                type='button' 
                onClick={handleSubmit}
                value={registerForm ? 'Zarejestruj się' : 'Zaloguj się'} 
                className='submit' />
            <input onClick={() => {setStatus(undefined); setRegisterForm(!registerForm)}} type='button' value={registerForm ? 'Masz konto? Zaloguj się!' : 'Nie masz konta? Zarejestruj się!'} className='register' />
        </Form>
    </div>);
}