
import React, { useState } from 'react';

import QrImg from '../../assets/Qr.png';
import QrImg1 from '../../assets/E_Qr.png';
import IncidenciaImg from '../../assets/Incidencia.png'; 
import AyudaImg from '../../assets/Ayuda.png';
import { Modal } from 'react-bootstrap'; // Import the Modal component from react-bootstrap
import { GenerateQR } from '../GenerarQR';
import { EscanearQR } from '../EscanearQR';
import { ReportarIncidencia } from '../ReportarIncidencia';
import { Ayuda } from '../Ayuda';
import './Botones.css';

export const Botones = () => {
    const [showModal1, setShowModal1] = useState(false); // State for modal 1
    const [showModal2, setShowModal2] = useState(false); // State for modal 2
    const [showModal3, setShowModal3] = useState(false); // State for modal 3
    const [showModal4, setShowModal4] = useState(false); // State for modal 4

    const handleClose = () => {
        setShowModal1(false);
        setShowModal2(false);
        setShowModal3(false);
        setShowModal4(false);
    };


    const handleShow1 = () => setShowModal1(true); // Event handler for modal 1
    const handleShow2 = () => setShowModal2(true); // Event handler for modal 2
    const handleShow3 = () => setShowModal3(true); // Event handler for modal 3
    const handleShow4 = () => setShowModal4(true); // Event handler for modal 4

    return (
        <div className="container">

            <div className="row justify-content-center align-items-center">
                <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center" title="GENERAR CÓDIGO QR" onClick={handleShow1}>
                    <div className="btn1" style={{ backgroundImage: `url(${QrImg})` }} ></div>
                </div>
                {/* <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center" title="ESCANEAR CÓDIGO QR" onClick={handleShow2}>
                    <div className="btn1" style={{ backgroundImage: `url(${QrImg1})` }} ></div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center" title="REPORTAR INCIDENCIA" onClick={handleShow3}>
                    <div className="btn1" style={{ backgroundImage: `url(${IncidenciaImg})` }} ></div>
                </div> */}
                <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center" title="AYUDA" onClick={handleShow4}>
                    <div className="btn1" style={{ backgroundImage: `url(${AyudaImg})` }} ></div>
                </div>
            </div>

            <Modal show={showModal1} onHide={handleClose}>
                <GenerateQR/>
            </Modal>
            <Modal show={showModal2} onHide={handleClose}>
                <EscanearQR/>
            </Modal>
            <Modal show={showModal3} onHide={handleClose}>
                <ReportarIncidencia/>
            </Modal>
            <Modal show={showModal4} onHide={handleClose}>
                <Ayuda/>
            </Modal>
        </div>
    );
};