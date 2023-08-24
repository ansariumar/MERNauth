import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Spinner"
import { useRegisterMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"



const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        userInfo ? navigate('/') : null
    }, [userInfo, navigate])

    const [register, { isLoading }] = useRegisterMutation();


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword)
            toast.error("password do not match")
        else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (err) {
                toast.error(err ?.data?.message || err.error);
            }
        }
    }

    return ( <
        >
        <FormContainer>
            <h1> Register a new Account</h1>

            <Form onSubmit={submitHandler} disabled={isLoading}>
                <Form.Group className='my-2' controlId="name">   {/*NAME*/}
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="email">    {/*EMAIL*/}
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="password">    {/*PASSWORD*/}
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId="confirmpassword">    {/*CONFIRM PASSWORD*/}
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='enter password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                { isLoading && <Loader/> }

                <Button type='submit' variant='primary' className='mt-3'>Sign up</Button>

                <Row className='py-3'>               
                    <Col>
                        Already Have an Account? <Link to='/login'> Login </Link>
                    </Col>
                </Row>
                
            </Form>
        </FormContainer> <
        />
    )
}

export default RegisterScreen;