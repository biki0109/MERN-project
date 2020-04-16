import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    password: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if(this.state.modal){
      if(isAuthenticated){
        this.toggle()
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();   
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, password, gender, address, email, phone } = this.state;

    //Create user object
    const newUser = {
      name,
      password,
      gender,
      address,
      email,
      phone
    }

    //Attemp to register
    this.props.register(newUser);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" className="mb-3" placeholder="Name" onChange={this.onChange}></Input>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" className="mb-3" placeholder="Password" onChange={this.onChange}></Input>
                <Label for="gender">Gender</Label>
                <Input type="text" name="gender" id="gender" className="mb-3" placeholder="Gender" onChange={this.onChange}></Input>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" className="mb-3" placeholder="Address" onChange={this.onChange}></Input>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" className="mb-3" placeholder="Email" onChange={this.onChange}></Input>
                <Label for="phone">Tel</Label>
                <Input type="text" name="phone" id="phone" className="mb-3" placeholder="Telephone number" onChange={this.onChange}></Input>
                <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
