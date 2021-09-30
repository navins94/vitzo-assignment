import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableComponent() {
	const history = useHistory();

	const editHandler = (id) => {
		history.push({
			pathname: `/edit-user/1`,
			state: {
				user: {
					firstName: 'Navin',
					lastName: 'Shingote',
					dob: new Date(),
				},
			},
		});
	};

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Age</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>20-07-1995</td>
						<td>
							<Button
								onClick={() => editHandler()}
								variant="warning"
								style={{ marginRight: 20 }}
							>
								Edit
							</Button>
							<Button variant="danger">Del</Button>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>20-07-1991</td>
						<td>
							<Button variant="warning" style={{ marginRight: 20 }}>
								Edit
							</Button>
							<Button variant="danger">Del</Button>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Larry the Bird</td>
						<td>@twitter</td>
						<td>20-07-1992</td>
						<td>
							<Button variant="warning" style={{ marginRight: 20 }}>
								Edit
							</Button>
							<Button variant="danger">Del</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default TableComponent;
