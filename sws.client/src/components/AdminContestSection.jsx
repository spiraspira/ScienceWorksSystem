import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import CommitteeActions from '../actions/CommitteeActions';
import TeacherActions from '../actions/TeacherActions';

const AdminContestSection = () => {
    const [contests, setContests] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [newContest, setNewContest] = useState({
        name: '',
        description: '',
        dateStart: null,
        dateStartSecondTour: null,
        dateEnd: null,
        organizationCommitteeId: '',
        programCommitteeId: '',
        invitedTeacherId: '',
    });
    const [editingContest, setEditingContest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contestsData = await ContestActions.getAll();
                setContests(contestsData);

                const committeesData = await CommitteeActions.getAll();
                setCommittees(committeesData);

                const teachersData = await TeacherActions.getAll();
                setTeachers(teachersData);
            } catch (error) {
                toast.error('Error fetching data: ' + error.message);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (contestId) => {
        try {
            await ContestActions.delete(contestId);
            setContests(contests.filter((c) => c.id !== contestId));
            toast.success('Contest deleted successfully');
        } catch (error) {
            toast.error('Error deleting contest: ' + error.message);
        }
    };

    const handleCreate = async () => {
        try {
            const newContestData = {
                name: newContest.name,
                description: newContest.description,
                dateStart: new Date(newContest.dateStart).toISOString(),
                dateStartSecondTour: new Date(newContest.dateStartSecondTour).toISOString(),
                dateEnd: new Date(newContest.dateEnd).toISOString(),
                organizationCommitteeId: newContest.organizationCommitteeId,
                programCommitteeId: newContest.programCommitteeId,
                invitedTeacherId: newContest.invitedTeacherId,
            };
            const createdContest = await ContestActions.create(newContestData);
            setContests([...contests, createdContest]);
            setNewContest({
                name: '',
                description: '',
                dateStart: null,
                dateStartSecondTour: null,
                dateEnd: null,
                organizationCommitteeId: '',
                programCommitteeId: '',
                invitedTeacherId: '',
            });
            toast.success('Contest created successfully');
        } catch (error) {
            toast.error('Error creating contest: ' + error.message);
        }
    };

    const handleEdit = (contest) => {
        setEditingContest(contest);
    };

    const handleSave = async (contest) => {
        try {
            contest.dateStart = new Date(contest.dateStart).toISOString();
            contest.dateStartSecondTour = new Date(contest.dateStartSecondTour).toISOString();
            contest.dateEnd = new Date(contest.dateEnd).toISOString();
            const updatedContest = await ContestActions.update(contest);
            setContests(contests.map((c) => (c.id === contest.id ? updatedContest : c)));
            setEditingContest(null);
            toast.success('Contest updated successfully');
        } catch (error) {
            toast.error('Error updating contest: ' + error.message);
        }
    };

    return (
        <Box className="admin-section">
            <ToastContainer />
            <Grid container spacing={2}>
                {contests.map((contest) => (
                    <Grid item xs={12} sm={6} md={4} key={contest.id}>
                        <Box className="university-card">
                            {editingContest?.id === contest.id ? (
                                <>
                                    <TextField
                                        label="Name"
                                        value={editingContest.name}
                                        onChange={(e) => setEditingContest({ ...editingContest, name: e.target.value })}
                                    />
                                    <TextField
                                        label="Description"
                                        value={editingContest.description}
                                        onChange={(e) => setEditingContest({ ...editingContest, description: e.target.value })}
                                    />
                                    <TextField
                                        label="Date Start"
                                        type="datetime-local"
                                        value={editingContest.dateStart}
                                        onChange={(e) => setEditingContest({ ...editingContest, dateStart: e.target.value })}
                                    />
                                    <TextField
                                        label="Date Start Second Tour"
                                        type="datetime-local"
                                        value={editingContest.dateStartSecondTour}
                                        onChange={(e) => setEditingContest({ ...editingContest, dateStartSecondTour: e.target.value })}
                                    />
                                    <TextField
                                        label="Date End"
                                        type="datetime-local"
                                        value={editingContest.dateEnd}
                                        onChange={(e) => setEditingContest({ ...editingContest, dateEnd: e.target.value })}
                                    />
                                    <FormControl>
                                        <InputLabel id="organization-committee-label">Organization Committee</InputLabel>
                                        <Select
                                            labelId="organization-committee-label"
                                            value={editingContest.organizationCommitteeId}
                                            onChange={(e) => setEditingContest({ ...editingContest, organizationCommitteeId: e.target.value })}
                                        >
                                            {committees.map((committee) => (
                                                <MenuItem key={committee.id} value={committee.id}>
                                                    {committee.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel id="program-committee-label">Program Committee</InputLabel>
                                        <Select
                                            labelId="program-committee-label"
                                            value={editingContest.programCommitteeId}
                                            onChange={(e) => setEditingContest({ ...editingContest, programCommitteeId: e.target.value })}
                                        >
                                            {committees.map((committee) => (
                                                <MenuItem key={committee.id} value={committee.id}>
                                                    {committee.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel id="invited-teacher-label">Invited Teacher</InputLabel>
                                        <Select
                                            labelId="invited-teacher-label"
                                            value={editingContest.invitedTeacherId}
                                            onChange={(e) => setEditingContest({ ...editingContest, invitedTeacherId: e.target.value })}
                                        >
                                            {teachers.map((teacher) => (
                                                <MenuItem key={teacher.id} value={teacher.id}>
                                                    {teacher.user?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box className="university-actions">
                                        <IconButton onClick={() => handleSave(editingContest)}>
                                            <Save />
                                        </IconButton>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <h3>{contest.name}</h3>
                                    <p>{contest.description}</p>
                                    <p>Date Start: {new Date(contest.dateStart).toLocaleString()}</p>
                                    <p>Date Start Second Tour: {new Date(contest.dateStartSecondTour).toLocaleString()}</p>
                                    <p>Date End: {new Date(contest.dateEnd).toLocaleString()}</p>
                                    <p>Organization Committee: {committees.find((c) => c.id === contest.organizationCommitteeId)?.name}</p>
                                    <p>Program Committee: {committees.find((c) => c.id === contest.programCommitteeId)?.name}</p>
                                    <p>Invited Teacher: {teachers.find((t) => t.id === contest.invitedTeacherId)?.user?.name}</p>
                                    <Box className="university-actions">
                                        <IconButton onClick={() => handleEdit(contest)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(contest.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Box className="university-form">
                        <h3>Add New Contest</h3>
                        <TextField
                            label="Name"
                            value={newContest.name}
                            onChange={(e) => setNewContest({ ...newContest, name: e.target.value })}
                        />
                        <TextField
                            label="Description"
                            value={newContest.description}
                            onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
                        />
                        <TextField
                            label="Date Start"
                            type="datetime-local"
                            value={newContest.dateStart}
                            onChange={(e) => setNewContest({ ...newContest, dateStart: e.target.value })}
                        />
                        <TextField
                            label="Date Start Second Tour"
                            type="datetime-local"
                            value={newContest.dateStartSecondTour}
                            onChange={(e) => setNewContest({ ...newContest, dateStartSecondTour: e.target.value })}
                        />
                        <TextField
                            label="Date End"
                            type="datetime-local"
                            value={newContest.dateEnd}
                            onChange={(e) => setNewContest({ ...newContest, dateEnd: e.target.value })}
                        />
                        <FormControl>
                            <InputLabel id="organization-committee-label">Organization Committee</InputLabel>
                            <Select
                                labelId="organization-committee-label"
                                value={newContest.organizationCommitteeId}
                                onChange={(e) => setNewContest({ ...newContest, organizationCommitteeId: e.target.value })}
                            >
                                {committees.map((committee) => (
                                    <MenuItem key={committee.id} value={committee.id}>
                                        {committee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="program-committee-label">Program Committee</InputLabel>
                            <Select
                                labelId="program-committee-label"
                                value={newContest.programCommitteeId}
                                onChange={(e) => setNewContest({ ...newContest, programCommitteeId: e.target.value })}
                            >
                                {committees.map((committee) => (
                                    <MenuItem key={committee.id} value={committee.id}>
                                        {committee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="invited-teacher-label">Invited Teacher</InputLabel>
                            <Select
                                labelId="invited-teacher-label"
                                value={newContest.invitedTeacherId}
                                onChange={(e) => setNewContest({ ...newContest, invitedTeacherId: e.target.value })}
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.user?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button onClick={handleCreate}>Create</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminContestSection;