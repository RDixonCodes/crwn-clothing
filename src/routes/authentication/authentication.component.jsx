import SignUpForm from '../../components/sign-up/sign-up-form.component';
import SignInForm from '../../components/sign-in/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles'

const SignIn = () => {

    return(
        <AuthenticationContainer>
            {/* <h1>Sign in Page</h1> */}
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default SignIn;