import host from ".";

const ContestActions = {
    getActiveContestsOfStudent: async () => {
        try {
            //const studentId = localStorage.getItem('userId');

            //const response = await host.get('api/Contest/active/student/' + studentId);
            const response = await host.get('api/Contest/active');

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getFinishedContestsOfStudent: async () => {
        try {
            const studentId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/finished/student/' + studentId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestsOfInvitedTeacher: async () => {
        try {
            const teacherId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/teacher/invited/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestsOfOrganizationCommitteeMember: async () => {
        try {
            const teacherId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/teacher/organization/member/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestsOfProgramCommitteeMember: async () => {
        try {
            const teacherId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/teacher/program/member/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestsOfOrganizationCommitteeHead: async () => {
        try {
            const teacherId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/teacher/organization/head/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestsOfProgramCommitteeHead: async () => {
        try {
            const teacherId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/teacher/program/head/' + teacherId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestInfo: async (contestId) => {
        try {
            const response = await host.get('api/Contest/' + contestId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },

    getContestNominations: async (contestId) => {
        try {
            const response = await host.get('api/Nomination/contest/' + contestId);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Ошибка сервера!');
        }
    },
};

export default ContestActions;