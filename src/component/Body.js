import React, {Component} from 'react';
import ModalPage from './ModalPage';
import { Container, Row, Button, Form, Table, Navbar, FormControl} from 'react-bootstrap';

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            dataKaryawan:[],
            dataSearch:'',
            inNama:'',
            inJabatan:'',
            inKelamin:'',
            inTanggal:'',
            inputId:''
        }
        this.handleEdit=this.handleEdit.bind(this)
        this.handleSave=this.handleSave.bind(this)
        this.handleInput=this.handleInput.bind(this)
        this.closeModal=this.closeModal.bind(this)
        this.clearInput=this.clearInput.bind(this)
        this.handleDel=this.handleDel.bind(this)
        this.search=this.search.bind(this)
        this.tampilData=this.tampilData.bind(this)
    }

    handleEdit(id){
        fetch(`http://localhost:3000/data-karyawan/${id}`)
            .then((response)=>response.json())
            .then((hasil)=>{
                this.props.setModalShow(true)
                this.setState(
                    {
                        inNama:hasil.nama_karyawan,
                        inJabatan:hasil.jabatan,
                        inKelamin:hasil.jenis_kelamin,
                        inTanggal:hasil.tanggal_lahir,
                        inputId:hasil.id
                    }
                )
            })
    }

    handleSave(){
        if(this.state.inNama === '' || this.state.inJabatan === '' || this.state.inKelamin === '' || this.state.inTanggal === ''){
            alert('Silahkan Isi Data')
        } else if(this.state.inputId === ''){
            fetch('http://localhost:3000/data-karyawan',{
                method:'POST',
                body:JSON.stringify({
                    nama_karyawan:this.state.inNama,
                    jabatan:this.state.inJabatan,
                    jenis_kelamin:this.state.inKelamin,
                    tanggal_lahir:this.state.inTanggal
                }),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then ((response)=>response.json())
            .then ((result)=>{
                console.log(result)
                this.closeModal()
                this.tampilData()
            })
        } else{
            fetch(`http://localhost:3000/data-karyawan/${this.state.inputId}`,{
                method:'PUT',
                body:JSON.stringify({
                    nama_karyawan:this.state.inNama,
                    jabatan:this.state.inJabatan,
                    jenis_kelamin:this.state.inKelamin,
                    tanggal_lahir:this.state.inTanggal
                }),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then ((response)=>response.json())
            .then ((hasil)=>{
                this.tampilData()
                this.props.setModalShow(false)
                this.clearInput()
            })

        }
    }

    handleInput(value, e){
        this.setState({[value]: e.target.value})
    }

    closeModal(){
        this.props.setModalShow(false)
        this.clearInput()
    }

    clearInput(){
        this.setState(
            {
            inNama:'',
            inJabatan:'',
            inKelamin:'',
            inTanggal:'',
            inputId:'' 
            }
        )
    }

    handleDel(id){
        fetch(`http://localhost:3000/data-karyawan/${id}`,{
            method:'DELETE',
        })
        .then((response)=>{
            alert('Data Terhapus')
            this.tampilData()
        })
    }

    search(e){
        this.setState({dataSearch: e.target.value})
    }

    tampilData(){
        fetch('http://localhost:3000/data-karyawan')
            .then((response)=>response.json())
            .then((hasil)=>this.setState({dataKaryawan:hasil}))
    }

    componentDidMount(){
        this.tampilData()
    }


    render(){
        return(
            <div>
                <Navbar bg="dark">
                    <Navbar.Brand style={{color:'white'}}>DATA KARYAWAN</Navbar.Brand>
                    <Form inline>
                        <FormControl style={{marginLeft:'500px', width:'500px'}} type="text" placeholder="Cari Data Karyawan" className="mr-sm-2" value={this.state.dataSearch} onChange={(e)=>this.search(e)} />
                        <Button onClick={()=>this.props.setModalShow(true)} variant="primary">Tambah Data</Button>
                    </Form>
                </Navbar>
                <Container>
                    <ModalPage modalShow={this.props.modalShow} setModalShow={this.props.setModalShow} closeModal={this.closeModal} handleInput={this.handleInput} dataState={this.state} handleSave={this.handleSave} handleEdit={this.handleEdit}/>
                    <Row>
                                    <Table striped bordered hover style={{marginTop:'40px', textAlign:'center'}} >
                                        <thead style={{fontWeight:'bolder', fontSize:'16px'}}>
                                            <tr>
                                                <td>NO</td>
                                                <td>ID</td>
                                                <td>NAMA</td>
                                                <td>JABATAN</td>
                                                <td>JENIS KELAMIN</td>
                                                <td>TANGGAL LAHIR</td>
                                                <td></td>                               
                                            </tr>
                                        </thead>
                                       <tbody >
                                            {
                                                this.state.dataKaryawan.reverse().filter(valueFilter=>valueFilter.nama_karyawan.toLowerCase().includes(this.state.dataSearch)).map((value, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{value.id}</td>
                                                            <td>{value.nama_karyawan}</td>
                                                            <td>{value.jabatan}</td>
                                                            <td>{value.jenis_kelamin}</td>
                                                            <td>{value.tanggal_lahir}</td>
                                                            <td><Button onClick={()=> this.handleDel(value.id)}  variant='outline-danger' size='sm' style={{margin:'5%'}}>Delete</Button>
                                                            <Button onClick={()=>this.handleEdit(value.id)} variant='outline-primary' size='sm'>Edit</Button></td>
                                                        </tr>
                                                    )
                                                })
                                            }           
                                        </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Body