import { TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import {Project} from '../../components/types/projectTypes'


const Proyecto = () => {
    const location = useLocation()
    const projectData = location.state

    return (
        <>
            <div className='absolute text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                <Typography variant='h5' className={'m-10'}>{projectData._id}</Typography>
                    
            </div>
        </>
    )
}

export default Proyecto
