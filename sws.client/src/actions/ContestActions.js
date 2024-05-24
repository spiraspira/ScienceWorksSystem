import host from ".";

const ContestActions = {
    getActiveContestsOfStudent: async () => {
        try {
            const studentId = localStorage.getItem('userId');

            if (!studentId) {
                throw new Error('Студент не авторизован!');
            }

            const response = await host.get('api/Contest/active/student/' + studentId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default ContestActions;