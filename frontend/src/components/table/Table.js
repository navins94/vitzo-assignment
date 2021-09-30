import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

function TableComponent(props) {
	const history = useHistory();

	const editHandler = (user) => {
		history.push({
			pathname: `/edit-user/1`,
			state: {
				user: {
					firstName: user.first_name,
					lastName: user.last_name,
					dob: moment(user.dob, 'YYYY-MM-DD').toDate(),
					id: user.id,
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
						<th>Date of Birth</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.first_name}</td>
							<td>{item.last_name}</td>
							<td>{item.dob}</td>
							<td>
								<Button
									onClick={() => editHandler(item)}
									variant="warning"
									style={{ marginRight: 20 }}
								>
									Edit
								</Button>
								<Button
									onClick={() => props.deleteConfirm(item.id)}
									variant="danger"
								>
									Del
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default TableComponent;
