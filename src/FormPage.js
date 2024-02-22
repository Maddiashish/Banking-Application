import React, {useState, useEffect, Fragment,Router,Route} from "react";
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
import DataForm from "./DataForm";
// import {useNavigate} from 'react-router-dom';
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import './FormPage.css';

const FormPage =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[MobileNo, setMobileNo] = useState('')
    const[Age, setAge] = useState('')
    const[Email, setEmail] = useState('')

    const[accountbalance, setAccountBalance] = useState('')
    const[accounttype, setAccounttype] = useState('')

    const[editId, setEditId] = useState('')
    const[editName, setEditName] = useState('')
    const[editMobileNo, setEditMobileNo] = useState('')
    const[editAge, setEditAge] = useState('')
    const[editEmail, setEditEmail] = useState('')
     
    const customerdata = [
        {
            Id:70,
            Name : 'Ashish Kumar',
            MobileNo: 765432876,
            Age:23,
            Email:'ashish@gmail.com'


        },
        {
            Id:71,
            Name : 'Ashish',
            MobileNo: 7656666676,
            Age:24,
            Email:'kumar@gmail.com'
        }
    ]

    const [data, setData ] =useState([]);

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        axios.get('https://localhost:7058/api/CustomerMasters')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }

    const handleEdit = (id) =>{       
        handleShow();
        axios.get(`https://localhost:7058/api/CustomerMasters/${id}`)
        .then((result)=>{
            setEditName(result.data.name);
            setEditAge(result.data.age);
            setEditMobileNo(result.data.mobileno);
            setEditEmail(result.data.email);
            setEditId(id);
             })
           .catch((error)=>{
            toast.error('error');
        })
        
    }

    const handleDelete= (id) =>{
        if(window.confirm("Are you sure to delete this customer") === true)
        {
           axios.delete(`https://localhost:7058/api/CustomerMasters/${id}`)
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
        const url= `https://localhost:7058/api/CustomerMasters/${editId}`;
        const data ={
            "id": editId,
            "name": editName,
            "mobileNo": editMobileNo,
            "age": editAge,
            "email": editEmail            
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
        const url = 'https://localhost:7058/api/CustomerMasters';
        const data = {
            "name": name,
            "mobileNo": MobileNo,
            "age": Age,
            "email": Email
        }

        axios.post(url,data)
        .then((result) =>{
            getData();
            clear();
            toast.success('customer has been added');
        }).catch((error)=>{
            toast.error('error');
        })
        ReactDOM.render(<DataForm />,document.getElementById('root'))
        
        const url1 = 'https://localhost:7058/api/CustomerBalance';
        const data1 = {
            "accountbalance": accountbalance,
            "accounttype": accounttype
        }

        axios.post(url1,data1)
        .then((result) =>{
            getData();
            clear();
            
        })
        ReactDOM.render(<DataForm />,document.getElementById('root'))
    }
    const SCD =() => {
        ReactDOM.render(<DataForm />,document.getElementById('root'))
      }

    const clear =() =>{
        setName('');
        setMobileNo('');
        setAge('');
        setEmail('');
        setEditName('');
        setEditMobileNo('');
        setEditAge('');
        setEditEmail('');
        setEditId('');
        setAccountBalance('');
        setAccounttype('');
    }

    return(
        <Fragment>    
            <Container>
                    
                <div className="main">
                    <input type="text"  placeholder="Enter Name"
                    value={name} className="form-control " onChange={(e) => setName(e.target.value)}
                    />
                    
                    <br></br>
                    
                    <input type="text" className="form-control " placeholder="Enter Age"
                    value={Age} onChange={(e) => setAge(e.target.value)}
                    />
                     <br></br>
                    
                    <input type="text" className="form-control " placeholder="Enter MobileNo"
                    value={MobileNo}  onChange={(e) => setMobileNo(e.target.value)}
                    />
                     <br></br>
                    
                    <input type="text" className="form-control " placeholder="Enter Email"
                    value={Email}  onChange={(e) => setEmail(e.target.value)}
                    />
                     <br></br>
                     <input type="text" className="form-control " placeholder="Enter Account Type"
                    value={accounttype}  onChange={(e) => setAccounttype(e.target.value)}
                    />
                     <br></br>
                     <input type="text" className="form-control " placeholder="Enter Account Balance"
                    value={accountbalance}  onChange={(e) => setAccountBalance(e.target.value)}
                    />
                     <br></br>
                    
                     <button onClick={handleSave} className="btn btn-primary" >Submit</button>&nbsp;&nbsp;
                     <button onClick={SCD} className="btn btn-primary" >Show All Customer Details</button>
                    </div>
                    
                
            </Container>
            <br></br>
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Name</th>
                        <th>MobileNo</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Actions</th>
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
                             <td>{item.name}</td>
                             <td>{item.mobileno}</td>
                             <td>{item.age}</td>
                             <td>{item.email}</td>
                             <td colSpan={2}>
                                 <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                 <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>&nbsp;
                                 
                             </td>
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
                    <Modal.Title>Modify / Update customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Name"
                    value={editName}  onChange={(e) => setEditName(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Age"
                    value={editAge} onChange={(e) => setEditAge(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter MobileNo"
                    value={editMobileNo}  onChange={(e) => setEditMobileNo(e.target.value)}
                    />
                     </Col>
                     <Col>
                    <input type="text" className="form-control" placeholder="Enter Email"
                    value={editEmail}  onChange={(e) => setEditEmail(e.target.value)}
                    />
                     </Col>
                     <Col>
                     
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

            </Modal> */}
            {/* <DataForm /> */}
        </Fragment>
    )
}

export default FormPage;