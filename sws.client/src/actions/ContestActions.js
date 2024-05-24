import host from ".";

const ContestActions = {
    getActiveContestsOfStudent: async () => {
        try {
            const studentId = localStorage.getItem('userId');

            const response = await host.get('api/Contest/active/student/' + studentId);

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
};

export default ContestActions;