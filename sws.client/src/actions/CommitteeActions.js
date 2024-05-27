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
};

export default CommitteeActions;