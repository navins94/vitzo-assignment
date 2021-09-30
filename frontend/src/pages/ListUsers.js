import React from 'react';
import Table from '../components/table/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ListUsers() {
	return (
		<Container>
			<Row style={{ marginTop: '2rem' }}>
				<Col lg={12}>
					<h1>User management system</h1>
				</Col>
			</Row>
			<Row style={{ marginTop: '2rem' }}>
				<Table />
			</Row>
		</Container>
	);
}

export default ListUsers;
