import { Navbar, Nav, Container, NavDropdown , Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/userApiSlice"
import { useNavigate  } from 'react-router-dom'
import { logout } from "../slices/authSlice"


const Header = () => {
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    async function handleLogout() {
        try {
            await logoutApiCall();
            dispatch(logout())
            navigate('/')
        } catch {
            console.log(err)
        }
    }

    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >MERN Auth</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            { userInfo ? (
                                <> 
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/logout'>
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                </>
                                ) :
                             (
                                <>
                                 <LinkContainer to='/login'>
                                    <Nav.Link >
                                        <FaSignInAlt /> Login
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/register'>
                                    <Nav.Link >
                                        <FaSignOutAlt /> sign up
                                    </Nav.Link>
                                </LinkContainer>
                                </>
                             )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </header>
    )
}

export default Header;