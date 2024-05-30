import host from ".";

const GradeActions = {
    getGradesOfNomination: async (nominationId, reportId) => {
        try {
            const response = await host.get('api/Grade/report/' + reportId + '/nomination/' + nominationId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getGradesOfReportOfTeacher: async (reportId, programCommitteeMemberId) => {
        try {
            const response = await host.get('api/Grade/report/' + reportId + '/programCommitteeMember/' + programCommitteeMemberId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    create: async (gradeData) => {
        try {
            console.log(gradeData);
            const response = await host.post('api/Grade', gradeData);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    }
};

export default GradeActions;