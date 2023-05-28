import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import FormInput  from '../form-input/form-input.component'
import Button from '../button/button.component';
import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch()


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('password does not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch(error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use')

            } else {

                console.log('user creation encounterd an error', error);
                alert('Ooops, somthing went wrong')

            }
            
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" 
                required type="text" 
                onChange={handleChange} 
                name='displayName' 
                value={displayName}/>

                {/*another way to combine options */}
                {/* <FormInput label="Display Name"
                inputOptions = {{
                required: 'true', 
                type: "text", 
                onChange: handleChange, 
                name: 'displayName', 
                value: displayName }}/> */}

                <FormInput label="Email"  
                required 
                type="email" 
                onChange={handleChange} 
                name='email'
                value={email}
                />

                <FormInput label="Password" 
                required 
                type="password" 
                onChange={handleChange} 
                name='password' 
                value={password} 
                />

                <FormInput label="Confirm Password" 
                required type="password" 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;