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
import { Document, Packer, Paragraph, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

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

    const generateContestReport = async () => {
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        text: contestData.name,
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: contestData.description,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: `First Round: ${contestData.dateStart?.substring(0, 10)} to ${contestData.dateStartSecondTour?.substring(0, 10)}`,
                    }),
                    new Paragraph({
                        text: `Second Round: ${contestData.dateStartSecondTour?.substring(0, 10)} to ${contestData.dateEnd?.substring(0, 10)}`,
                    }),
                    new Paragraph({
                        text: `Invited Teacher: ${contestData.invitedTeacher?.user?.name || 'N/A'}`,
                    }),
                    new Paragraph({
                        text: `Winner: ${winner ? `${winner.name} (Author: ${winner.team?.student?.user?.name || 'N/A'})` : 'N/A'}`,
                    }),
                    new Paragraph({ text: "\n" }),

                    new Paragraph({
                        text: "Organization Committee",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        text: `Chair: ${organizationCommitteeData.teacher?.user?.name || 'N/A'}`,
                    }),
                    new Paragraph({
                        text: "Members:",
                    }),
                    ...organizationCommitteeMembers.map(member =>
                        new Paragraph({ text: member.teacher?.user?.name || 'Loading...' })
                    ),
                    new Paragraph({ text: "\n" }),

                    new Paragraph({
                        text: "Program Committee",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        text: `Chair: ${programCommitteeData.teacher?.user?.name || 'N/A'}`,
                    }),
                    new Paragraph({
                        text: "Members:",
                    }),
                    ...programCommitteeMembers.map(member =>
                        new Paragraph({ text: member.teacher?.user?.name || 'Loading...' })
                    ),
                    new Paragraph({ text: "\n" }),

                    new Paragraph({
                        text: "Nominations",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    ...nominations.map(nomination =>
                        new Paragraph({ text: `${nomination.name} (Winner: ${nomination.winner?.team?.student?.user?.name || 'N/A'})` })
                    ),
                    new Paragraph({ text: "\n" }),

                    new Paragraph({
                        text: "Reports",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    ...allReports.map(report =>
                        new Paragraph({ text: `"${report.name || 'Loading...'}" (Author: ${report.team?.student?.user?.name || 'N/A'}, Assigned Teacher: ${report.team?.teacher?.user?.name || 'N/A'})` })
                    ),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            FileSaver.saveAs(blob, `${contestData.name}_Report.docx`);
        }).catch(err => {
            console.error("Error generating report:", err);
        });
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
        <Box className="contest-info-container">
            <ToastContainer />
            <Card className="contest-info-card">
                <CardContent className="contest-info-content">
                    {/* Header Section */}
                    <Box className="contest-header-section">
                        <Typography variant="h5" className="contest-title">
                            {contestData.name || 'Loading...'}
                        </Typography>
                        <Typography variant="body1" className="contest-description">
                            {contestData.description || 'Loading...'}
                        </Typography>

                        <Box className="contest-dates-grid">
                            <Typography variant="body2" className="contest-date">
                                <strong>First Round:</strong> {contestData.dateStart?.substring(0, 10) || 'N/A'} to {contestData.dateStartSecondTour?.substring(0, 10) || 'N/A'}
                            </Typography>
                            <Typography variant="body2" className="contest-date">
                                <strong>Second Round:</strong> {contestData.dateStartSecondTour?.substring(0, 10) || 'N/A'} to {contestData.dateEnd?.substring(0, 10) || 'N/A'}
                            </Typography>
                            <Typography variant="body2" className="contest-date">
                                <strong>Invited Teacher:</strong> {contestData.invitedTeacher?.user?.name || 'N/A'}
                            </Typography>
                            {winner && (
                                <Typography variant="body2" className="contest-date">
                                    <strong>Winner:</strong> {winner.name || 'N/A'} (Author: {winner.team?.student?.user?.name || 'N/A'})
                                </Typography>
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={generateContestReport}
                            startIcon={<DownloadIcon />}
                            className="export-report-btn"
                        >
                            Export Contest Report
                        </Button>
                    </Box>

                    {/* Committees Section */}
                    <Box className="section-container">
                        <Accordion className="contest-accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                                <Typography className="accordion-title">
                                    Organization Committee
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="accordion-details">
                                <Typography className="committee-chair">
                                    <strong>Chair:</strong> {organizationCommitteeData.teacher?.user?.name || 'N/A'}
                                </Typography>
                                <Typography className="committee-members-title">
                                    Members:
                                </Typography>
                                {organizationCommitteeMembers.map((member, index) => (
                                    <Typography key={index} className="committee-member">
                                        • {member.teacher?.user?.name || 'N/A'}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Committees Section */}
                    <Box className="section-container">
                        <Accordion className="contest-accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                                <Typography className="accordion-title">
                                    Program Committee
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="accordion-details">
                                <Typography className="committee-chair">
                                    <strong>Chair:</strong> {programCommitteeData.teacher?.user?.name || 'N/A'}
                                </Typography>
                                <Typography className="committee-members-title">
                                    Members:
                                </Typography>
                                {programCommitteeMembers.map((member, index) => (
                                    <Typography key={index} className="committee-member">
                                        • {member.teacher?.user?.name || 'N/A'}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Nominations Section */}
                    <Box className="section-container">
                        <Accordion className="contest-accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                                <Typography className="accordion-title">
                                    Nominations
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="accordion-details">
                                {nominations.map((nomination, index) => (
                                    <Box key={index} className="nomination-item">
                                        <Typography className="nomination-name">
                                            {nomination.name || 'N/A'}
                                        </Typography>
                                        <Typography className="nomination-winner">
                                            Winner: {nomination.winner?.team?.student?.user?.name || 'Not selected'}
                                        </Typography>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Reports Section */}
                    <Box className="section-container">
                        <Accordion className="contest-accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                                <Typography className="accordion-title">
                                    Submitted Reports
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="reports-accordion-details">
                                {allReports.map((model, index) => (
                                    <Box key={index} className="report-item">
                                        <Box>
                                            <Typography className="report-name">
                                                "{model.name || 'Untitled'}"
                                            </Typography>
                                            <Typography className="report-meta">
                                                Author: {model.team?.student?.user?.name || 'N/A'} •
                                                Teacher: {model.team?.teacher?.user?.name || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => downloadReport(model.file)}
                                            startIcon={<DownloadIcon />}
                                            className="download-report-btn"
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ContestInfoSection;