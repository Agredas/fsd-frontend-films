import React, { useState } from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { registerAction } from '../../redux/actions/auth';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, WARNING_NOTIFICATION } from '../../redux/types/notificationTypes';

const validationErrorMessages = {
  errorPassword: 'Password must contain a minimum of 8 characters, 1 special character, 1 capital letter and at least 1 number.',
  errorEmptyRequired: 'Required inputs came empty.',
  errorEquealPassword: 'Password did not match.',
}

const doRegister = async (register, props) => {
  try {
    const resRegister = await registerAction(register);
    console.log(resRegister.data);
    props.dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: {
        notification: {
          title: "Correct Registration.",
          msg: `Thank you for making an account with us, ${register.name}.`,
        },
        show: true,
      },
    });
  } catch (err) {
    throw err;
  }
}
const validateAndSend = async (register, props) => {
  try {
    console.log("validateAndSend");
    let notificationMessage = [];

    let allOk = true;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (register.name === "" || register.lastName === "" || register.password === "" || register.email === "") {
      console.log("hola1if")
      console.log()
      notificationMessage.push(validationErrorMessages.errorEmptyRequired);
      allOk = false;
    }
    if ((register.password !== register.rePassword)) {
      console.log(register.password, register.rePassword)
      notificationMessage.push(validationErrorMessages.errorEqualPassword)
      allOk = false;
    }
    if (!passRegex.test(register.password)) {
      console.log("hola3if")
      notificationMessage.push(validationErrorMessages.errorPassword)
      allOk = false;
    }
    console.log(notificationMessage)
    if (allOk) {
      console.log("hola4if")
      return await doRegister(register, props);
    } else {
      props.dispatch({
        type: WARNING_NOTIFICATION,
        payload: {
          notification: {
            title: "Warning.",
            msg: notificationMessage,
          },
          show: true
        },
      });
    }
  } catch (err) {
    console.log(err.message)
    props.dispatch({
      type: ERROR_NOTIFICATION,
      payload: {
        notification: {
          title: "Error.",
          msg: err.response.data.trace,
        },
        show: true,
      },
    });
    throw err;
  }

}
function Register(props) {
  const [register, setRegister] = useState({
    name: "",
    last_name: "",
    email: "",
    creditCard: 0,
    password: "",
    rePassword: ""
  });

  const eventHandler = (ev) => {
    setRegister({ ...register, [ev.target.name]: ev.target.type !== "checkbox" ? ev.target.value : ev.target.checked });
  };

  return (

    <div>

      <label>* Name: <input type="text" name="name" required onChange={eventHandler} /></label>
      <label>* Surnames: <input type="text" name="last_name" required onChange={eventHandler} /></label>
      <label>* Email: <input type="email" onChange={eventHandler} name="email" required /></label>
      <label>* Credit Card: <input type="creditCard" onChange={eventHandler} name="creditCard" required /></label>
      <label>* Password: <input type="password" onChange={eventHandler} name="password" required /></label>
      <label>* Confirm Password: <input onChange={eventHandler} type="password" name="rePassword" required /></label>


      <button onClick={async () => {
        try {
          const ok = await validateAndSend(register, props);
          if (ok) {
            setTimeout(() => {
              props.handleClose();
            }, 1000);
          }
        } catch (err) {
          console.log(err.message)
        }
      }}> Register </button>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    errorNotification: state.notificationReducer.errorNotification,
    warningNotification: state.notificationReducer.warningNotification,
    successNotification: state.notificationReducer.successNotification,
    infoNotification: state.notificationReducer.infoNotification,
  };
};

export default connect(mapStateToProps)(Register);