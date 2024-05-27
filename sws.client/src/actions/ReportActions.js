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
};

export default ReportActions;