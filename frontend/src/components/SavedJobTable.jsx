import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const SavedJobTable = () => {
    const {allSavedJobs} = useSelector(store=>store.job);
    const navigate = useNavigate();

    return (
        <div>
            <Table>
                <TableCaption>A list of your saved jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date Saved</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allSavedJobs.length <= 0 ? <span>You haven't saved any job yet.</span> : allSavedJobs.map((savedJob) => (
                            <TableRow key={savedJob._id}>
                                <TableCell>{savedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{savedJob?.title}</TableCell>
                                <TableCell>{savedJob?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => navigate(`/description/${savedJob?._id}`)} variant="outline">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default SavedJobTable
