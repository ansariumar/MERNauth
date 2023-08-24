import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {
    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-item-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>MERN Auth</h1>
                    <p className='text-center mb-4'>This is a boiler plate to the MERN auth project that stores http cookien and uses JWT for the verification
                    </p>
                    <div className='d-flex justify-content-center'>
                        <LinkContainer to='/login'>
                            <Button variant='primary' className='me-3'>Sign In</Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button variant='primary' className='me-3'>Sign Up</Button>
                        </LinkContainer>

                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Hero;