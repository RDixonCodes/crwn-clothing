import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selector';
// import { signOutUser } from '../../utils/firebase/firebase.utils';
import { signOutStart } from '../../store/user/user.action';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdwon from '../../components/cart-dropdown/cart-dropdown.component';

import { 
  LogoContainer, 
  NavigationContainer, 
  NavLinks, 
  NavLink 
} from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    
    const signOutUser = () => 
    dispatch(signOutStart());
  

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
            </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={ signOutUser }>
                  SIGN OUT
                  </NavLink>) : (
                <NavLink to='/auth'>
                SIGN IN
            </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdwon/>}
        </NavigationContainer> 
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;