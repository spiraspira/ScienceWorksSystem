import host from ".";

const UserActions = {
    login: async (login, password) => {
        try {
            const response = await host.post('api/User/login?login=' + login + '&password=' + password);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                sessionStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                sessionStorage.setItem('role', response.data.role);
                localStorage.setItem('userId', response.data.userId);
                sessionStorage.setItem('userId', response.data.userId);
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

    logout: async () => {
        try {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('role');
            localStorage.removeItem('userId');
            sessionStorage.removeItem('userId');
            window.location.href = '/login';
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка!');
        }
    },

    getUserData: async () => {
        try {
            const userId = localStorage.getItem('userId');

            const response = await host.get('api/User/' + userId);

            if (response.data.id) {
                return response.data;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default UserActions;