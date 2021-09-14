import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Container} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';




const baseUrl='http://localhost:8080/employees/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    firstName: '',
    lastName:'',
    age: '',
    status: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevstate=>({
      ...prevstate,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.firstName=consolaSeleccionada.firstName;
          consola.age=consolaSeleccionada.age;
          consola.lastName=consolaSeleccionada.lastName;
          consola.status=consolaSeleccionada.status;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Insertar</h3>
      <TextField name="firstName" className={styles.inputMaterial} label="firstName" onChange={handleChange}/>
      <br />
      <TextField name="lastName" className={styles.inputMaterial} label="lastName" onChange={handleChange}/>
      <br />
      <TextField name="age" className={styles.inputMaterial} label="age" onChange={handleChange}/>
      <br />
      <TextField name="status" className={styles.inputMaterial} label="status" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar</h3>
      <TextField name="firstName" className={styles.inputMaterial} label="firstName" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.firstName}/>
      <br />
      <TextField name="lastName" className={styles.inputMaterial} label="lastName" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.lastName}/>
      <br />
      <TextField name="age" className={styles.inputMaterial} label="age" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.age}/>
      <br />
      <TextField name="status" className={styles.inputMaterial} label="status" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.status}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>¿Estás seguro que deseas eliminar a <b>{consolaSeleccionada && consolaSeleccionada.firstName}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )


  return (
    <Container maxWidth="md" style={{ backgroundColor: '#3f51b51f', height: '100vh', marginTop: '50px', paddingTop: '30px' }}>
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start">
        <Button variant="contained" color="primary" onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
        <Button variant="contained" color="primary">Activos</Button>
        <Button variant="contained" color="primary">Inactivos</Button>
    </Grid>
    
      <br /><br />
     <TableContainer>
       <Table>

         <TableHead>
           <TableRow>
           <TableCell></TableCell>
           <TableCell>id</TableCell>
             <TableCell>firstName</TableCell>
             <TableCell>lastName</TableCell>
             <TableCell>age</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(consola=>(
             <TableRow key={consola.id}>
               <TableCell><Checkbox color="primary" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                <TableCell>{consola.id}</TableCell>
                <TableCell>{consola.firstName}</TableCell>
                <TableCell>{consola.lastName}</TableCell>
                <TableCell>{consola.age}</TableCell>
                <TableCell>
                    <Edit color="primary" className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete color="secondary" className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </Container>
  );
}

export default App;