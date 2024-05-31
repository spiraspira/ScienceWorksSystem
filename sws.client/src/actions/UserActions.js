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

    loginAdmin: async (login, password) => {
        try {
            const response = login === 'admin' && password === 'admin';

            const someToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzExMjAwNSwiaWF0IjoxNzE3MTEyMDA1fQ.9q3YsB6jeWXMj5txJa5xqjWjOyBXukwYyNcSGd_zrmw';

            if (response === true) {
                localStorage.setItem('token', someToken);
                sessionStorage.setItem('token', someToken);
                localStorage.setItem('isAdmin', 'true');
                sessionStorage.setItem('isAdmin', 'true');
                window.location.href = '/';
            }
            else {
                throw new Error('Неправильный логин или пароль!');
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    logoutAdmin: async () => {
        try {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            sessionStorage.removeItem('isAdmin');
            window.location.href = '/login/admin';
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка!');
        }
    },

    getAll: async () => {
        try {
            const response = await host.get('api/user');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (userData) => {
        try {
            const response = await host.put('api/user', userData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (userData) => {
        try {
            const response = await host.post('api/user', userData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (userId) => {
        try {
            const response = await host.delete('api/user/' + userId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default UserActions;