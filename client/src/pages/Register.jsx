import styled from "styled-components";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputValue from "../components/InputValue";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, password, email, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.warning("please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const stateName = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [stateName]: value });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <InputValue
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <InputValue
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <InputValue
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Regiter" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
