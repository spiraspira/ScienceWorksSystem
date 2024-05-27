import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContestActions from '../actions/ContestActions';
import CommitteeActions from '../actions/CommitteeActions';

const ContestInfoSection = () => {
    const { contestId } = useParams();
    const [contestData, setContestData] = useState({});
    const [organizationCommitteeData, setOrganizationCommitteeData] = useState({});
    const [programCommitteeData, setProgramCommitteeData] = useState({});
    const [organizationCommitteeMembers, setOrganizationCommitteeMembers] = useState([]);
    const [programCommitteeMembers, setProgramCommitteeMembers] = useState([]);
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contestInfo = await ContestActions.getContestInfo(contestId);
                setContestData(contestInfo);

                const organizationCommitteeId = contestInfo.organizationCommitteeId;
                const programCommitteeId = contestInfo.programCommitteeId;

                const organizationCommitteeInfo = await CommitteeActions.getCommitteeInfo(organizationCommitteeId);
                setOrganizationCommitteeData(organizationCommitteeInfo);

                const programCommitteeInfo = await CommitteeActions.getCommitteeInfo(programCommitteeId);
                setProgramCommitteeData(programCommitteeInfo);

                const organizationCommitteeMembersData = await CommitteeActions.getCommitteeMembers(organizationCommitteeId);
                setOrganizationCommitteeMembers(organizationCommitteeMembersData);

                const programCommitteeMembersData = await CommitteeActions.getCommitteeMembers(programCommitteeId);
                setProgramCommitteeMembers(programCommitteeMembersData);

                const nominationsData = await ContestActions.getContestNominations(contestId);
                setNominations(nominationsData);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, [contestId]);

    return (
        <Box>
            <ToastContainer />
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        {contestData.name || 'Loading...'}
                    </Typography>
                    <Typography variant="body1">
                        {contestData.description || 'Loading...'}
                    </Typography>
                    <Typography variant="body2">
                        Первый тур: с {contestData.dateStart?.substring(0, 10) || 'Loading...'} по {contestData.dateStartSecondTour?.substring(0, 10) || 'Loading...'}
                    </Typography>
                    <Typography variant="body2">
                        Второй тур: с {contestData.dateStartSecondTour?.substring(0, 10) || 'Loading...'} по {contestData.dateEnd?.substring(0, 10) || 'Loading...'}
                    </Typography>
                    <Typography variant="body2">
                        Приглашенный преподаватель: {contestData.invitedTeacher?.user?.name || 'Loading...'}
                    </Typography>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="organization-committee-content"
                            id="organization-committee-header"
                        >
                            <Typography variant="h5">Организационный комитет</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Глава: {organizationCommitteeData.teacher?.user?.name || 'Loading...'}
                            </Typography>
                            <Typography>
                                Члены:
                                {organizationCommitteeMembers.map((member, index) => (
                                    <Typography key={index}>
                                        {member.teacher?.user?.name || 'Loading...'}
                                    </Typography>
                                ))}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="program-committee-content"
                            id="program-committee-header"
                        >
                            <Typography variant="h5">Программный комитет</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Глава: {programCommitteeData.teacher?.user?.name || 'Loading...'}
                            </Typography>
                            <Typography>
                                Члены:
                                {programCommitteeMembers.map((member, index) => (
                                    <Typography key={index}>
                                        {member.teacher?.user?.name || 'Loading...'}
                                    </Typography>
                                ))}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="program-committee-content"
                            id="program-committee-header"
                        >
                            <Typography variant="h5">Номинации</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {nominations.map((nomination, index) => (
                                    <Typography key={index}>
                                        {nomination.name || 'Loading...'}
                                    </Typography>
                                ))}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ContestInfoSection;