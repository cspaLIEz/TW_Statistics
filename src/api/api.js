import axios from '@/libs/axios';

export const apitest = data => axios.post('/article/lists', data);

export const Login = data => axios.post('/user/ulogin', data);

export const SaveProgram = data => axios.post('/program/saveprogram', data);

export const Getrellist = data => axios.post('http://47.95.201.45:8080/mzfb/release/getrellist', data);
export const organizationList = data => axios.post('/organ/getorganinfolist', data);
//登录
// export const Login = data => axios.post('/api/auth/login', data);
//注册
// export const Register = data => axios.post('/api/auth/register', data);

