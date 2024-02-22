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
import ReactDOM from 'react-dom'
import CRUD3 from "./CRUD3";
import DataForm from "./DataForm";
import App from "./App";
import './CRUD3.css';

const CRUD2 =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[accountbalance, setAccountBalance] = useState('')
    const[accounttype, setAccounttype] = useState('')
    const[Points, setPoints] = useState('')
    
    

    const[editId, setEditId] = useState('')
    const[editAccountBalance, setEditAccountBalance] = useState('')
    const[editAccounttype, setEditAccounttype] = useState('')
    const[editPoints, setEditPoints] = useState('')

     
    const customerdata = [
        {
            id:70,
            Balance: 2000,
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
        axios.get('https://localhost:7058/api/CustomerBalance')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }

    const handleEdit = (Id) =>{
    
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
           axios.delete(`https://localhost:7058/api/CustomerBalance/${Id}`)
           
           .then((result)=>{
            if(result.status === 204)
            {
                toast.success('customer has been deleted');
                getData();
            }
          
           })
           
        }


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

    

    const handleUpdate =() =>{
        const url= `https://localhost:7058/api/CustomerBalance/${editId}`;
        const data ={
            "id": editId,
            "accountbalance": editAccountBalance,
            "accounttype": editAccounttype
                    
        }
        axios.put(url,data)
        .then((result) =>{
            getData();
            clear();
            toast.success('customer has been updated');
        }).catch((error)=>{
            toast.error('error');
        })

    }

    const handleSave =() => {
        const url = 'https://localhost:7058/api/CustomerBalance';
        const data = {
            "accountbalance": accountbalance,
            "accounttype": accounttype
        }

        axios.post(url,data)
        .then((result) =>{
            getData();
            clear();
            toast.success('customer has been added');
        })
    }

    const clear =() =>{
        setAccountBalance('');
        setAccounttype('');
        setEditAccountBalance('');
        setEditAccounttype('');
        setEditId('');
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
            {/* <button onClick={AT}>Account Type</button> */}
            <button onClick={PO}>Points</button>
            </nav>
            <h3>
      Customer Balance
    </h3>
            <ToastContainer></ToastContainer>
            <Container>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter AccountBalance"
                    value={accountbalance}  onChange={(e) => setAccountBalance(e.target.value)}
                    />
                    </Col>
                    
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Accounttype"
                    value={accounttype}  onChange={(e) => setAccounttype(e.target.value)}
                    />
                     </Col>
                     
                     <Col>
                     <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button> &nbsp;
                     
                     
                     </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>AccountBalance</th>
                        <th>Accounttype</th>
                    
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
                             <td>{item.accountBalance}</td>
                             <td>{item.accounttype}</td>
                                                       
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
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter AccountBalance"
                    value={editAccountBalance}  onChange={(e) => setEditAccountBalance(e.target.value)}
                    />
                    </Col>
                    
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Accounttype"
                    value={editAccounttype}  onChange={(e) => setEditAccounttype(e.target.value)}
                    />
                     </Col>
                     
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> 
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}> 
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
        </Fragment>
    )
}                
            

export default CRUD2;