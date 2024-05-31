import host from ".";

const UniversityActions = {
    getAll: async () => {
        try {
            const response = await host.get('api/University');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (universityData) => {
        try {
            const response = await host.put('api/University', universityData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (universityData) => {
        try {
            const response = await host.post('api/University', universityData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (universityId) => {
        try {
            const response = await host.delete('api/University/' + universityId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default UniversityActions;