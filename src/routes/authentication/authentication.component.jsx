import SignUpForm from '../../components/sign-up/sign-up-form.component';
import SignInForm from '../../components/sign-in/sign-in-form.component';
import './authentication.styles.scss'

const SignIn = () => {

    return(
        <div className='authentication'>
            {/* <h1>Sign in Page</h1> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default SignIn;