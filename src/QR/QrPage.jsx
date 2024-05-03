import React from 'react';
import QR from './Qr';
import GenerateQR from './GQr';
import Formulario from './Incidencia';
import Emergencia from './Boton';
import Ayuda from './Ayuda';

const QrPage = () => {
    return (
        <React.Fragment>
            <Emergencia/>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6 text-center"><GenerateQR/></div>
                    <div className="col-6 text-center"><QR/></div>
                    <div className="col-6 text-center"><Formulario/></div>
                    <div className="col-6 text-center"><Ayuda/></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QrPage;
