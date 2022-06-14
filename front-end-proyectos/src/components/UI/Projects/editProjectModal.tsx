import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react'
import{Client} from '../../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Project } from '../../types/projectTypes'

interface EditProjectModalProps {
    onClose: () => void
    onRefresh: () => void,
    show: boolean
    row: Project,
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const EditProjectModal = (props: EditProjectModalProps) => {
    
    const { onClose, show ,onRefresh} = props;
    const [showProductModal, setShowProductModal] = useState(false);
    const [isFormValid, setFormValidation] = useState(false);
    const [isNameValid, setNameValidation] = useState(true);
    const [isClientValid, setClientValidation] = useState(true);
    const [isProjectStateValid, setProjectStateValidation] = useState(true);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [loadedClients, setLoadedClients] = useState<Client[]>([])
    const [newProject, setNewProject] = useState({
        name: 'p123',
        updatedDate: new Date(),
        state: props.row.state,
        description: props.row.description,
    });
    const [projectState, setProjectState] = useState(props.row.state);

    const states = [{ value: 'Inciciado', label: 'Iniciado', }, {value: 'No Iniciado', label: 'No Iniciado'}, {value: 'Finalizado', label: 'Finalizado'},{value: 'Cancelado', label: 'Cancelado'} ];

    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };


    const updateProjectUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/projects/${props.row._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }

    const handleSubmitProductModal = async () =>{
        setShowProductModal(false);
    }

    const onCloseProductoModal =async () => {
        setShowProductModal(false);
    }

    /*const validateProjectName = () =>{
        if (newProject.name != "" && newProject.name.length<=20)
            setNameValidation(true);
        else
            setNameValidation(false);
    }*/

    const submit = () => {
        onCloseProductoModal();
        updateProjectUsingAPI();
        props.onRefresh();
        props.onClose();

    }

    const validateProjectState = () =>{
        if (newProject.state != "")
            setProjectStateValidation(true);
        else 
            setProjectStateValidation(false);
    }
  
    //const isADevelopProjectAndHasNOTAProductAssign = props.row.type == "desarrollo" && newProject.productId == 0;
    
    const validateProjectValues = () =>{
        //validateProjectClient();
        //validateProjectName();
        validateProjectState();

        //if (isNameValid && isProjectStateValid && isClientValid){
            setFormValidation(true);
            console.log("entro");
        //}
        /*if (isADevelopProjectAndHasNOTAProductAssign)
            setFormValidation(false);*/
    }

    const handleSubmit = async () => {
        validateProjectValues();
        //if(isADevelopProjectAndHasNOTAProductAssign){
            //setProductModal(true);
        //}else 
        if(isFormValid){
            const response = await updateProjectUsingAPI()
            /*if (response.status === 200) {
                onSubmit();
            }*/
            submit();
        }
    };

    const handleProjectStateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectState(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setClientValidation(true);
        setFormValidation(false);
        setNameValidation(true);
        setProjectStateValidation(true);
        onClose();
    };

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[85vh] rounded-xl shadow-lg'>
                
                <Modal onClose={onCloseProductoModal} open={showProductModal}>
                    <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                        <Typography variant='h5' className={'m-10'}>Producto correspondiente al proyecto de desarrollo</Typography>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  
                            <TextField required id="outlined-basic" name="productId" className='mr-8 w-80' label="Seleccione el producto asociado al proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText}/> 
                        </div>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  </div>
                        <div className="flex flex-row ml-[6vh]" >
                            <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseProductoModal} >
                                <div className="m-4" > Cancelar</div>
                            </div>
                            <div className="w-10" ></div>
                            <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmitProductModal}>
                                <div className="m-4" > Siguiente</div>
                        </div>
                    </div>

                    </div>
                </Modal>

                <Typography variant='h5' className={'m-10'}>Edite los datos para el proyecto {props.row._id}</Typography>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField required id="outlined-basic" defaultValue= {props.row.name} name="name" className='mr-8 w-80' style={{backgroundColor: isNameValid ? 'transparent' : '#F3909C'}} label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <TextField required name="client" defaultValue = {props.row.creationDate}className='mr-8 w-80' style={{backgroundColor: isClientValid ? 'transparent' : '#F3909C'}}  label="Fecha de inicio" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>),}}
                        />
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField select required value={projectState} id="outlined-basic" className='mr-8 w-80' style={{backgroundColor: isProjectStateValid ? 'transparent' : '#F3909C'}} label="Estado del proyecto" variant="outlined" onChange={handleProjectStateSelection}>
                            {states.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField required name="client" defaultValue= "20/08/2022" className='mr-8 w-80' style={{backgroundColor: isClientValid ? 'transparent' : '#F3909C'}} label="Fecha de finalizacion" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>),}}
                        />
                    </div>
                    <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' defaultValue={props.row.description} name='description' label="Descripcion" multiline rows={3} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                    <div className='flex mb-6 flex-row'></div>
                    <div className='flex mb-6 flex-row'>  </div>
                    <div className="flex flex-row" >
                        <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseCreateProjectModal} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="w-56" ></div>
                        <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={submit}>
                            <div className="m-4" > Editar Proyecto </div>
                        </div>
                    </div>

                </div>

            </div>
        </Modal >
    )
}

export default EditProjectModal

