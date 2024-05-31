import host from ".";

const NominationActions = {
    getAll: async () => {
        try {
            const response = await host.get('api/Nomination');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (nominationData) => {
        try {
            const response = await host.put('api/Nomination', nominationData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (nominationData) => {
        try {
            const response = await host.post('api/Nomination', nominationData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (nominationId) => {
        try {
            const response = await host.delete('api/Nomination/' + nominationId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default NominationActions;