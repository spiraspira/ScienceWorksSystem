import host from ".";

const ReviewActions = {
    getReviewsOfReport: async (reportId) => {
        try {
            const response = await host.get('api/Review/report/' + reportId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getReviewsOfReportOfTeacher: async (reportId, userId) => {
        try {
            const response = await host.get('api/Review/report/' + reportId + '/teacher/' + userId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (reviewData) => {
        try {
            const response = await host.post('api/Review/', reviewData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    }
};

export default ReviewActions;