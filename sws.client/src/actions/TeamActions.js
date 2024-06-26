import host from ".";

const TeamActions = {
    getTeamsOfStudent: async (userId) => {
        try {
            const response = await host.get('api/Team/student/' + userId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getAll: async () => {
        try {
            const response = await host.get('api/Team');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (teamData) => {
        try {
            const response = await host.put('api/Team', teamData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (teamData) => {
        try {
            const response = await host.post('api/Team', teamData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (teamId) => {
        try {
            const response = await host.delete('api/Team/' + teamId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default TeamActions;