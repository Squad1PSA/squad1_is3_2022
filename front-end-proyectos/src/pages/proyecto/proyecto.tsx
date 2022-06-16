import { TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import {Project} from '../../components/types/projectTypes'
import { useEffect, useState } from 'react'
import { Circle } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProyectProps {
    projectData: Project,
    __proto__: Object,
}

const Proyecto = () => {
    const location = useLocation()
    const prop = location.state as ProyectProps;
    const projectData = prop.projectData;
    const [project, setProject] = useState(projectData);
    const [riskColor, setRiskColor] = useState('#9297A0');
    const [riskImpact, setRiskImpact] = useState('None');
    const [stateTagColor, setStateTagColor] = useState('#9297A0');
    const [expandedRecursos, setexpandedRecursos] = useState(false);
    const [expandedDates, setexpandedDates] = useState(false);
    const [expandedDetails, setexpandedDetails] = useState(false);
    const [isADevelopmentProject, setIfItIsADevelomentProject]= useState(false);

    const recursos = ["RS12345678", "RS87654321", "RS98765432", "RS67543245", "RS87657905"];

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

    const determineRisk = () => {
        if(project.risk?.impact == 1){
            setRiskImpact('Bajo');
            setRiskColor('#8CD867');
        }else if (project.risk?.impact == 2){
            setRiskImpact('Medio');
            setRiskColor('#FFB20F');
        }else if (project.risk?.impact == 3){
            setRiskImpact('Alto');
            setRiskColor('#E71D36');
        }else if (project.risk?.impact == 4){
            setRiskImpact('Critico');
            setRiskColor('#481E3A');
        }
    }

    const determineStateTagColor = () => {
        if(project.state == 'No Iniciado'){
            setStateTagColor('#FC7A1E');
        }else if (project.state == 'Iniciado'){
            setStateTagColor('#329F5B');
        }else if (project.state == 'Finalizado'){
            setStateTagColor('#9297A0');
        }else if (project.state == 'Cancelado'){
            setStateTagColor('#746D75');
        }
    }

    const changeexpandedRecursosSetUp = () =>{
        setexpandedRecursos(!expandedRecursos);
        console.log(expandedDates);
        console.log(expandedRecursos);
    }

    const changeexpandedDatesSetUp = () =>{
        setexpandedDates(!expandedDates);
    }

    const changeexpandedDetailsSetUp = () =>{
        setexpandedDetails(!expandedDetails);
    }

    const checkIfItIsADevelopmentProject = () =>{
        setIfItIsADevelomentProject((project.type == "desarrollo" || project.type=="Desarrollo"));
    }

    useEffect(() => {
        fetchProject();
        determineRisk();
        determineStateTagColor();
        setexpandedRecursos(false);
        setexpandedDates(false);
        setexpandedDetails(false);
        checkIfItIsADevelopmentProject();
    }, []);

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', margin: 25, paddingBottom: 20, paddingLeft: 80, borderBottomColor:'#C5D0CB', borderBottomWidth: '1px'}}> 
                <Typography variant='h5' className={'slate'}>{project.name}</Typography>
                <div className = 'group'>
                    <Circle  style={{ alignSelf: 'left', color: riskColor, height: '5vh', marginLeft: '5vh'}}></Circle>
                    <span className="risk-tooltip group-hover:scale-100" >
                        {riskImpact}
                    </span>
                </div>
                <Typography variant='body2' style={{marginLeft: "60vh", color: '#C5D0CB', marginTop: "1vh"}}>#{project._id}</Typography>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 100}}> 
                <div style={{display: 'flex', flexDirection: 'column', marginTop: -10, width:'90vh'}}>
                    <div style={{padding: 5, width: 90, height: 30, display: 'flex', flexDirection: 'row', backgroundColor: stateTagColor, borderRadius: 5}}><Typography variant='body2' style= {{color: '#F4F6F5', fontWeight: 'bold'}}>{project.state}</Typography></div>
                    <div style={{alignSelf:'left', marginTop: 25}}>
                        <Typography variant='body2' className='w-[27vh]' style={{fontWeight: 'bold', color: '#5C7067'}}>Descripción: </Typography>
                        <div style= {{ marginTop: 10, backgroundColor: "#E9EDEB", borderRadius: 15, padding: 10, paddingLeft: 30, paddingRight: 30, minHeight:110}}>
                            <Typography variant='body2' className={'slate'}>{project.description}</Typography>
                        </div>
                    </div>
                </div>
                <div style= {{display: 'flex', flexDirection: 'column', width: '50vh',marginLeft: 60}} >
                    <div className='hover:bg-gray-100' style={{padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px'}} onClick={changeexpandedDetailsSetUp}>
                        <div style={{ borderBottomColor: expandedDetails ? "#B0BFB8":'transparent', paddingBottom: expandedDetails ? 10:0, marginBottom:expandedDetails ? 10:0, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Detalles </Typography>
                            {expandedDetails && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedDetails && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}
                        </div>
                            {expandedDetails && 
                            <>
                            <div style={{display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Tipo de proyecto: </Typography><Typography variant='body2' className={'slate'}>{project.type}</Typography></div>
                            <div style={{display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Cliente: </Typography><Typography variant='body2' className={'slate'}>{project.client}</Typography></div>
                            {isADevelopmentProject && <div style={{display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Producto: </Typography><Typography variant='body2' className={'slate'}>{project.productId}</Typography></div>}
                            </>}
                    </div>
                    <div className='hover:bg-gray-100' style={{marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px'}} onClick={changeexpandedDatesSetUp}>
                        <div style={{ borderBottomColor: expandedDates ? "#B0BFB8":'transparent', paddingBottom: expandedDates ? 10:0, marginBottom:expandedDates ? 10:0, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Fechas Significativas </Typography>
                            {expandedDates && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedDates && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}
                        </div>
                            {expandedDates && 
                            <>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de creación: </Typography><Typography variant='body2' className={'slate'}>{project.creationDate}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de la última modificación: </Typography><Typography variant='body2' className={'slate'}>{project.updatedDate}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de inicio: </Typography><Typography variant='body2' className={'slate'}>{project.startDate}</Typography></div>
                            <div style={{paddingBottom: 10,display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de cierre: </Typography><Typography variant='body2' className={'slate'}>{project.endDate}</Typography></div>
                            </>}
                    </div>
                    <div className = 'hover:bg-gray-100 transition-all duration-200  group' style={{width: '400', marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px'}} onClick={changeexpandedRecursosSetUp}>
                        <div style={{ display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomColor: expandedRecursos ? "#B0BFB8":'transparent', paddingBottom: expandedRecursos ? 10:0, marginBottom:expandedRecursos ? 10:0, borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Recursos </Typography>
                            {expandedRecursos && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedRecursos && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}    
                        </div>
                        <div>
                            {expandedRecursos && 
                            <>
                                <div style={{width: 400}}>
                                    {recursos.map(recurso =>  <div style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 120, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >{recurso}</Typography></div>)}
                                </div>
                            </>}
                        </div>
                    </div>   
                </div>
            </div>
            
                    
        </>
    )
}

export default Proyecto
