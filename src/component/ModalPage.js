import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalPage(props){
    return(
        <Modal size='lg' centered show={props.modalShow} onHide={()=>props.setModalShow(true)}>
            <Modal.Header>
                <Modal.Title>Detail Data Karyawan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control value={props.dataState.inNama} onChange={(e)=>props.handleInput('inNama',e)} type='text' placeholder='Masukkan Nama Karyawan'/>
                <Form.Control value={props.dataState.inJabatan} onChange={(e)=>props.handleInput('inJabatan' ,e)} style={{marginTop:'10px'}} type='text' placeholder='Masukkan Jabatan'/>
                <Form.Control value={props.dataState.inKelamin} onChange={(e)=>props.handleInput('inKelamin' ,e)}style={{marginTop:'10px'}} type='text' placeholder='Masukkan Jenis Kelamin'/>
                <Form.Control value={props.dataState.inTanggal} onChange={(e)=>props.handleInput('inTanggal',e)}style={{marginTop:'10px'}} type='date' placeholder='Tanggal Lahir'/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>props.closeModal()} variant='secondary'>Close</Button>
                <Button onClick={()=>props.handleSave()} variant='success'>Simpan</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalPage