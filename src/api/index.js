import RegisterApi from './registerApi';
import login from './login';
import session from './session';

[
    login,
    session
].forEach(item => {
    const { modelName, data } = item;
    RegisterApi.parseRouter(modelName, data);
});
export default RegisterApi;
