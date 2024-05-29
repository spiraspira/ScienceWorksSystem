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
};

export default TeamActions;