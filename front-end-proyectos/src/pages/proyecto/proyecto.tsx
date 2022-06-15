import { TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import {Project} from '../../components/types/projectTypes'



const Proyecto = () => {
    const location = useLocation()
    const projectData:Project = location.state as Project;

    console.log(projectData);

    return (
        <>
            <Typography variant='h5' className={'m-10'}>Holaa</Typography>
            <Typography variant='h5' className={'m-10'}>{projectData._id}</Typography>
                    
        </>
    )
}

export default Proyecto
