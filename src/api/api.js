import axios from '@/libs/axios';
import queryString from 'querystring'

export const Login = data => axios.post('/api/Auth/Login', data);

export const GetTradeInfo = data => axios.get('/api/Statistics/GetTradeInfo', data);

//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

