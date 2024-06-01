import host from ".";

const ReportActions = {
    getAllReportsOfContest: async (contestId) => {
        try {
            const response = await host.get('api/Report/contest/' + contestId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getReportOfUser: async (userId, contestId) => {
        try {
            const response = await host.get('api/Report/student/' + userId + '/contest/' + contestId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    update: async (reportData) => {
        try {
            const response = await host.put('api/Report', reportData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (reportData) => {
        try {
            const response = await host.post('api/Report', reportData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getWinnerOfContest: async (contestId) => {
        try {
            const response = await host.get('api/Report/winner/contest/' + contestId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getWinnerOfNomination: async (nominationId) => {
        try {
            const response = await host.get('api/Report/winner/nomination/' + nominationId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default ReportActions;