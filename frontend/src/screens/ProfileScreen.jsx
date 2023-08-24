import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Spinner"
import { setCredentials } from "../slices/authSlice"
import { useUpdateUserMutation } from "../slices/userApiSlice"


const ProfileScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    									//this will be seen on initial page load
    useEffect(() => {					//set The name and password to whatever the current password is in the update form
    	setName(userInfo.name)
    	setEmail(userInfo.email)
    }, [userInfo.setName, userInfo.setEmail])

    const [updateUser, { isLoading }] = useUpdateUserMutation();


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword)
            toast.error("password do not match")
        else {
            try {
                const res = await updateUser({
                	_id: userInfo._id,
                	name,
                	email,
                	password
                }).unwrap();

                dispatch(setCredentials({ ...res }));
                toast.success("Profile Updated Successfully")
            } catch (err) {
                toast.error(err ?.data?.message || err.error);
            }
        }
    }

    return ( <
        >
        <FormContainer>
            <h1> Update Profile</h1>

            <Form onSubmit={submitHandler}>
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

                <Button type='submit' variant='primary' className='mt-3'>Update Password</Button>
                
            </Form>
        </FormContainer> <
        />
    )
}

export default ProfileScreen;