import host from ".";

const StudentActions = {
    getAll: async () => {
        try {
            const response = await host.get('api/Student');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (studentData) => {
        try {
            const response = await host.put('api/Student', studentData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (studentData) => {
        try {
            const response = await host.post('api/Student', studentData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (studentId) => {
        try {
            const response = await host.delete('api/Student/' + studentId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default StudentActions;