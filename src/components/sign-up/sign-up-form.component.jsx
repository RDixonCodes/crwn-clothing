import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import FormInput  from '../form-input/form-input.component'
import Button from '../button/button.component';
import { UserContext } from "../../contexts/user.contexts";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('password does not match');
            return;
        }
        try {
        const {user} = await createAuthUserWithEmailAndPassword(
            email, 
            password
                );

                setCurrentUser(user)
                console.log({user})
                await createUserDocumentFromAuth(user,{ displayName });
                resetFormFields();

        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')

            } else {

                console.log('user creation encounterd an error', error);
                alert('Ooops, somthing went wrong')

            }
            
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
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
        </div>
    )
}

export default SignUpForm;