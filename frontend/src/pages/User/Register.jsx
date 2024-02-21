import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    re_password: '',
  });

  const { first_name, last_name, email, phone, password, re_password } = formData;

  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional validation checks
    if (first_name.trim().length === 0) {
      toast.error('First name cannot be empty');
      return;
    }

    if (last_name.trim().length === 0) {
      toast.error('Last name cannot be empty');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      toast.error('Phone number should contain only digits');
      return;
    }

    if (password !== re_password) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const userData = {
        first_name,
        last_name,
        email,
        phone,
        password,
        re_password,
      };

      dispatch(register(userData));

    } catch (error) {
  
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Registration failed';
        toast.error(errorMessage);
      } else {

        toast.error('An error occurred during registration');
      }
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('An activation email has been sent to your email. Please check your email');
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className='regis'>
      <form className="form" onSubmit={handleChange}>
        <p className="title">Register</p>
        {/* <h6 className="message">Signup now and get full access to our app.</h6> */}
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name='first_name'
              value={first_name}
              onChange={handleChange}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name='last_name'
              value={last_name}
              onChange={handleChange}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            required
            placeholder=""
            type="email"
            className="input"
            name='email'
            value={email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="input"
            name='phone'
            value={phone}
            onChange={handleChange}
          />
          <span>Phone Number</span>
       </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name='password'
            value={password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name='re_password'
            value={re_password}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>

        <button type="submit" className="submit" onClick={handleSubmit} >
          Submit
        </button>

        <p className="signin">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
      </div>
  );
};

export default Register;