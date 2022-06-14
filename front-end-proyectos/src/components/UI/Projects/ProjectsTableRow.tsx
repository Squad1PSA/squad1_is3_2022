import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { Project } from '../../types/projectTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { Circle } from '@mui/icons-material';
import EditProjectModal from './editProjectModal'

interface  ProjectTableRowProps {
    row: Project,
    refresh: () => void,
}

const  ProjectTableRow = (props:  ProjectTableRowProps) => {
    const { row, refresh } = props
    const [showProjectModal, setshowProjectModal] = useState(false)
    
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

    const [riskImpact, setRiskImpact] = useState('');
    const [riskColor, setRiskColor] = useState('#9297A0');

    useEffect(() => {
        //tendria que aparecer en realidad un circulito con color representano el riesgo
        //pero primero veamos si esto funciona
        if(row.risk?.impact == 1){
            setRiskImpact('Bajo');
            setRiskColor('#8CD867');
        }else if (row.risk?.impact == 2){
            setRiskImpact('Medio');
            setRiskColor('#FFB20F');
        }else if (row.risk?.impact == 3){
            setRiskImpact('Alto');
            setRiskColor('#E71D36');
        }else if (row.risk?.impact == 4){
            setRiskImpact('Critico');
            setRiskColor('#481E3A');
        }
    }, []);


    return (
        <>
            <EditProjectModal onSubmit={() => alert("Hello!")} onClose={handleAddProjectClose} show={showProjectModal} row = {props.row}/>
            <TableRow hover key={row._id}>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.state}</TableCell>           
                <TableCell align="left">{new Date(row.creationDate).toLocaleDateString('es-AR')}</TableCell>
                <TableCell align="left">{new Date(row.updatedDate).toLocaleDateString('es-AR')}</TableCell>
                <TableCell><Circle style={{alignSelf: 'left', color: riskColor,height: '4vh'}}></Circle></TableCell>
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
            </TableRow>
        </>
    )
}

export default  ProjectTableRow
