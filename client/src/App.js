import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePageView from './pages/HomePageView';
import VirtualMachineListPage from './pages/VirtualMachineListPage';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  CREAR MÁQUINAS VIRTUALES
                </Nav.Link>
                <Nav.Link as={Link} to="/vms">
                  ELIMINAR MÁQUINAS VIRTUALES
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/vms" element={<VirtualMachineListPage />} />
          <Route path="/" element={<HomePageView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
