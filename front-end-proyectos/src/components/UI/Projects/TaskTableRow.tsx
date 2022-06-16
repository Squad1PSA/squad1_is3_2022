import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { Task } from '../../types/taskType'
import DeleteIcon from '@mui/icons-material/Delete';
import { Circle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from './editProjectModal'
import CircleIcon from '@mui/icons-material/Circle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';

interface  TaskTableRowProps {
    row: Task,
    refresh: () => void,
}


const  TaskTableRow = (props:  TaskTableRowProps) => {
    const { row, refresh } = props
    const [showProjectModal, setshowProjectModal] = useState(false)
    const navigate = useNavigate();
    const deleteItems = async () => {
        const response = await fetch(`http://localhost:2000/projects/${row._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
    
            },
        })
        props.refresh()
        return response;   
    }
    const handleAddProjectClose = () => {
        setshowProjectModal(false)
    };

    const handleModalOpen = () => {
        setshowProjectModal(true)
    };
    
    /*const navigateToAPoject = () => {
        navigate('/project');
 
      };*/

    const [riskImpact, setRiskImpact] = useState('');
    const [riskColor, setRiskColor] = useState('#9297A0');

    useEffect(() => {

    }, []);


    return (
        <>
            <TableRow hover key={row._id}>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row._id}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.name}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.priority}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.efford}</Link></TableCell>               
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={deleteItems}>
                        <DeleteIcon />
                    </div>
                </TableCell>
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleModalOpen}>
                        <EditIcon />
                    </div>
                </TableCell>
        </TableRow></>
    )
}

export default  TaskTableRow
