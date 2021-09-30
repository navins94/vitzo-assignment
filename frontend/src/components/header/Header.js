import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header() {
	return (
		<Navbar expand="lg" variant="dark" bg="dark">
			<Container fluid>
				<Navbar.Brand href="#">Navbar</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default Header;
