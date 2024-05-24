import host from ".";

const LoginActions = {
    login: async (login, password) => {
        try {
            const response = await host.post('api/User/login?login=' + login + '&password=' + password);
            console.log(response);
            if (response.data) {
                return response.data;
            } else {
                throw new Error('Неправильный логин или пароль!');
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default LoginActions;