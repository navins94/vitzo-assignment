import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '../components/table/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { generateSearchTerm } from '../utils/index';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ListUsers() {
	const history = useHistory();
	const query = useQuery();
	const [data, setData] = useState([]);
	const [activePage, setActivePage] = useState(
		query.get('page') ? Number(query.get('page')) : 1,
	);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchUsers = (term) => {
		setLoading(true);
		axios
			.get(`http://localhost:9000/getUsers.php${term}`)
			.then((response) => {
				setLoading(false);
				if (response.data.success !== 0) {
					setData(response.data.data);
					setTotal(response.data.total);
				} else {
					setData([]);
					setTotal(0);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	};

	useEffect(() => {
		const term = generateSearchTerm(activePage);
		fetchUsers(term);
		history.push(term);
	}, [history, activePage]);

	const handlePageChange = (page) => {
		setActivePage(page);
	};

	const renderPagination = (activePage, total) => {
		let active = activePage;
		let items = [];
		for (let number = 1; number <= Math.ceil(total / 20); number++) {
			items.push(
				<Pagination.Item
					key={number}
					active={number === active}
					onClick={() => handlePageChange(number)}
				>
					{number}
				</Pagination.Item>,
			);
		}
		return items;
	};

	const removeUser = (id) => {
		axios
			.post('http://localhost:9000/deleteUser.php', { id: id })
			.then((response) => {
				const term = generateSearchTerm(activePage);
				fetchUsers(term);
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});
	};

	const deleteConfirm = (id) => {
		if (window.confirm('Are you sure?')) {
			removeUser(id);
		}
	};

	return (
		<Container>
			<Row style={{ marginTop: '2rem' }}>
				<Col lg={12}>
					<h1>User management system</h1>
				</Col>
			</Row>
			<Row>
				<Col align="right">
					<Button variant="success" onClick={() => history.push('/add-user')}>
						Add User
					</Button>
				</Col>
			</Row>
			{data.length > 0 ? (
				<Row style={{ marginTop: '2rem' }}>
					<Table data={data} deleteConfirm={deleteConfirm} />
					{total > 20 && (
						<Pagination style={{ justifyContent: 'center' }}>
							{renderPagination(activePage, total)}
						</Pagination>
					)}
				</Row>
			) : (
				<Row className="mt-4">
					<Col>
						<Alert variant="warning">No data to show</Alert>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default ListUsers;
