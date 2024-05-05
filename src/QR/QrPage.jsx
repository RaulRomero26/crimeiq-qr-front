import React from 'react';
// import QR from './Qr';
// import GenerateQR from './GenerarQR/GenerarQR';
// import Formulario from './Incidencia';
// import Emergencia from './Boton';
// import Ayuda from './Ayuda';
import { Botones } from './Botones';
import { BotonEmegencia } from './BotonEmergencia';

const QrPage = () => {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <BotonEmegencia/>
                    </div>
                    <div className="col-md-12">
                        <Botones/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QrPage;
