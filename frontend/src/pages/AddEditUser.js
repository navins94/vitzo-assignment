import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Col from 'react-bootstrap/esm/Col';
import DatePicker from 'react-datepicker';

const AddEditUser = () => {
	const { state } = useLocation();
	const user = state?.user;
	const isAddMode = !user;

	const history = useHistory();

	const [startDate, setDate] = React.useState('');

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		dob: Yup.string().required('Date of Birth is required'),
	});

	const formOptions = { resolver: yupResolver(validationSchema) };

	// set default form values if in edit mode
	if (!isAddMode) {
		const { ...defaultValues } = user;
		formOptions.defaultValues = defaultValues;
	}

	const { register, handleSubmit, formState, setValue, control, reset } =
		useForm(formOptions);
	const { errors } = formState;

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
		reset();
	};

	const selectDateHandler = (d) => {
		setDate(d);
		setValue('dob', d, { shouldValidate: true });
	};

	const cancelHandler = (e) => {
		e.preventDefault();
		history.push('/');
		reset();
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col className="mb-4" lg={12}>
					<h1>Add User</h1>
				</Col>
				<Col lg={12}>
					<Form onSubmit={handleSubmit(onSubmit)} className="user-form">
						<Form.Group className="mb-3" controlId="firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								name="firstName"
								placeholder="First Name"
								{...register('firstName')}
								isInvalid={!!errors.firstName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.firstName?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3" controlId="lastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								name="lastName"
								placeholder="Last Name"
								isInvalid={!!errors.lastName}
								{...register('lastName')}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.lastName?.message}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3" controlId="dob">
							<Form.Label>Date of Birth</Form.Label>
							<Controller
								control={control}
								name="dob"
								render={({ field }) => (
									<DatePicker
										placeholderText="Select date"
										onChange={selectDateHandler}
										selected={field.value}
										className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
									/>
								)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.dob?.message}
							</Form.Control.Feedback>
						</Form.Group>
						<div className="button-group">
							<Button variant="primary" type="submit">
								Submit
							</Button>
							<Button variant="secondary" type="submit" onClick={cancelHandler}>
								Cancel
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default AddEditUser;
