import host from ".";

const TeacherActions = {
    getAll: async () => {
        try {
            const response = await host.get('api/Teacher');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (teacherData) => {
        try {
            const response = await host.put('api/Teacher', teacherData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (teacherData) => {
        try {
            const response = await host.post('api/Teacher', teacherData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (teacherId) => {
        try {
            const response = await host.delete('api/Teacher/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default TeacherActions;