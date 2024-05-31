import host from ".";

const CommitteeActions = {
    getCommitteeInfo: async (committeId) => {
        try {
            const response = await host.get('api/Committee/' + committeId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getCommitteeMembers: async (committeId) => {
        try {
            const response = await host.get('api/CommitteeMember/committee/' + committeId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getAll: async () => {
        try {
            const response = await host.get('api/Committee');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (committeeData) => {
        try {
            const response = await host.put('api/Committee', committeeData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (committeeData) => {
        try {
            const response = await host.post('api/Committee', committeeData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (committeeId) => {
        try {
            const response = await host.delete('api/Committee/' + committeeId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default CommitteeActions;