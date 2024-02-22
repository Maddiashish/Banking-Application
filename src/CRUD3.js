import React, {useState, useEffect, Fragment} from "react";
import Table  from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from  'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CRUD2 from "./CRUD2";
import ReactDOM from 'react-dom'
import App from "./App";
import DataForm from "./DataForm";
import './CRUD3.css';

const CRUD3 =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[customerid, setcustomerid] = useState('')
    const[points, setPoints] = useState('')
    
    

    const[editId, setEditId] = useState('')
    const[editcustomerid, setEditcustomerid] = useState('')
    const[editPoints, setEditPoints] = useState('')

     
    const customerdata = [
        {
            id:70,
            customerid: 2000,
            Accounttype: 'saving'


        },
        {
            id:71,
            Balance: 2345,
            Accounttype: 'current'
        }
    ]

    const [data, setData ] =useState([]);

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        axios.get('https://localhost:7058/api/CustomerPoints')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }

    const handleDelete= (Id) =>{

        if(window.confirm("Are you sure to delete this customer") === true)
        {
           axios.delete(`https://localhost:7058/api/CustomerPoints/${Id}`)
           .then((result)=>{
            if(result.status == 204)
            {
                toast.success('customer has been deleted');
                getData();
            }
           })
           .catch((error)=>{
            toast.error('error');
        })
        }
    }

    const ACD =() => {
        ReactDOM.render(<App />,document.getElementById('root'))
    }
    const SCD =() => {
      ReactDOM.render(<DataForm />,document.getElementById('root'))
    }
    const AT =() => {
      ReactDOM.render(<CRUD2 />,document.getElementById('root'))
    }
    const PO =() => {
      ReactDOM.render(<CRUD3 />,document.getElementById('root'))
    }

    return(
        <Fragment>
            <nav class="navbar navbar-dark bg-dark">
            <button onClick={ACD}>Add Customer Details</button>
            <button onClick={SCD}>Show Customer Details</button>
            <button onClick={AT}>Account Type</button>
            {/* <button onClick={PO}>Points</button> */}
            </nav>
            <h3>
     Customer Points
    </h3>
            <ToastContainer></ToastContainer>
            <Container>
               
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Points</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length> 0 ?
                        data.map((item,index) => {
                            return(
                             <tr key = {index}>
                             <td>{index+ 1}</td>
                             <td>{item.id}</td>
                             
                             <td>{item.points}</td>                          
                             
                             </tr>

                            )
                        })
                        :
                        'Loading.......'
                    }
                   
                </tbody>

            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    
                     
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> 
                        Close
                    </Button>
                    
                </Modal.Footer>

            </Modal>
        </Fragment>
    )
}                
            

export default CRUD3;