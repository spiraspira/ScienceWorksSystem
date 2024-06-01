import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import ContestActions from '../actions/ContestActions';
import CommitteeActions from '../actions/CommitteeActions';
import ReportActions from '../actions/ReportActions';

const ContestInfoSection = ({ contestData }) => {
    const { contestId } = useParams();
    const [organizationCommitteeData, setOrganizationCommitteeData] = useState({});
    const [programCommitteeData, setProgramCommitteeData] = useState({});
    const [organizationCommitteeMembers, setOrganizationCommitteeMembers] = useState([]);
    const [programCommitteeMembers, setProgramCommitteeMembers] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [allReports, setAllReports] = useState([]);
    const [winner, setWinner] = useState(null);

    const downloadReport = (file) => {
        if (file) {
            const binaryData = atob(file);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);

            for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.docx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const updateNominationWinners = async (nominations) => {
        const updatedNominations = [...nominations];
        for (const [index, nomination] of updatedNominations.entries()) {
            const winningReportId = await ReportActions.getWinnerOfNomination(nomination.id);
            updatedNominations[index].winner = winningReportId;
        }
        setNominations(updatedNominations);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!contestData.id) {
                    return;
                }

                const organizationCommitteeId = contestData.organizationCommitteeId;
                const programCommitteeId = contestData.programCommitteeId;

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

                const allReportsData = await ReportActions.getAllReportsOfContest(contestId);
                setAllReports(allReportsData);

                if (contestData.dateEnd < new Date().toISOString()) {
                    const winnerData = await ReportActions.getWinnerOfContest(contestData.id);
                    setWinner(winnerData);
                    await updateNominationWinners(nominationsData);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, [contestId, contestData]);

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
                    {winner && (
                        <Typography variant="body2">
                            Победитель: {winner.name || 'Loading...'} (Автор: {winner.team?.student?.user?.name || 'Loading...'})
                        </Typography>
                    )}
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
                                        {nomination.name || 'Loading...'} {'Победитель: ' + nomination.winner?.team?.student?.user?.name || 'Loading...'}
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
                            <Typography variant="h5">Работы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {allReports.map((model, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography>
                                            "{model.name || 'Loading...'}" (автор: {model.team?.student?.user?.name || 'Loading...'}, закрепленный преподаватель: {model.team?.teacher?.user?.name || 'Loading...'})
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => downloadReport(model.file)}
                                            startIcon={<DownloadIcon />}
                                        >
                                        </Button>
                                    </div>
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