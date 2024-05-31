import host from ".";

const CommitteeMemberActions = {
    getAll: async () => {
        try {
            const response = await host.get('api/CommitteeMember');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (committeeMemberData) => {
        try {
            const response = await host.put('api/CommitteeMember', committeeMemberData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (committeeMemberData) => {
        try {
            const response = await host.post('api/CommitteeMember', committeeMemberData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    delete: async (committeeMemberId) => {
        try {
            const response = await host.delete('api/CommitteeMember/' + committeeMemberId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default CommitteeMemberActions;