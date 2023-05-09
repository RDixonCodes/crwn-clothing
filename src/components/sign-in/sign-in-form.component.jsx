import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { 
    SignInContainer, 
    ButtonContainer 
} from './sign-in-form.styles';

import { 
    emailSignInStart, 
    googleSignInStart 
} from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            dispatch(emailSignInStart(email, password))
                resetFormFields();

        } catch(error) {
            // switch is an alternate form of using if statement
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with that email');
                    break;
                    default:
                        console.log(error)
            }
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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

                <ButtonContainer>
                    <Button type='submit'>sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                    Google Sign In
                    </Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
};

export default SignInForm;