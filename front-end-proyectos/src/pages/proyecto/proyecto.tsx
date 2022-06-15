import { TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import {Project} from '../../components/types/projectTypes'
import { useEffect, useState } from 'react'

interface ProyectProps {
    projectData: Project,
    __proto__: Object,
}

const Proyecto = () => {
    const location = useLocation()
    const prop = location.state as ProyectProps;
    const projectData = prop.projectData;
    const [project, setProject] = useState(projectData);

    const fetchProject = () => {
        fetch(`http://localhost:2000/projects/${projectData._id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                console.log(myJson);
                setProject(JSON.parse(JSON.stringify(myJson)));

            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchProject();
    }, []);
    return (
        <>
            <Typography variant='h5' className={'m-10 slate'}>{project.name}</Typography>
                    
        </>
    )
}

export default Proyecto
