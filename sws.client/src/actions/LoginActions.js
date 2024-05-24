import host from ".";

const LoginActions = {
    login: async (login, password) => {
        try {
            const response = await host.post('api/User/login?login=' + login + '&password=' + password);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                sessionStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                sessionStorage.setItem('role', response.data.role);
                window.location.href = '/';
            }
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Неправильный логин или пароль!');
            } else {
                throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
            }
        }
    },
};

export default LoginActions;