import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './CustomNavbar.css'; 
import Logo1 from "../assets/2.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink, Route, Routes } from 'react-router-dom';
import QrPage from '../QR/QrPage';
import InicioPage from '../Inicio/InicioPage';
import ReportePage from '../Reportes/ReportePage';
import { useAuthStore } from '../../hooks';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  const {startLogout} = useAuthStore();

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Navbar.Brand className='ms-5' href="#home">
              <img src={Logo1} alt="Logo" style={{ width: '40px', height: 'auto' }} />
              <span className="crimeiq-text">CrimeIQ</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
            <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
              <Nav className="mr-auto"> 
                <Nav.Link href="#home">INICIO</Nav.Link>
                <Nav.Link as={NavLink} to={'QrScanner'}>QR TRACK</Nav.Link>
                <Nav.Link as={NavLink} to={'REPORTE'}>REPORTES</Nav.Link>
                <button className='float-end btn btn-danger' onClick={startLogout}>Salir</button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row className='espaciopagina'>
        <Col>
          <Routes>
            <Route path={'home'} element={<InicioPage/>}/>
            <Route path={'QrScanner'} element={<QrPage/>}/>
            <Route path={'REPORTE'} element={<ReportePage/>}/>
            <Route path={'*'} element={<InicioPage/>}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomNavbar;

