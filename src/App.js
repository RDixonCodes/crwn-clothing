import { useEffect } from "react";
import { useDispatch } from 'react-redux';

// import { createAction } from "./utils/reducer/reducer.utils";

import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth 
} from './utils/firebase/firebase.utils'


import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    })

    return unsubscribe
}, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        {/* placing /* after route name will enable route nesting  */}
        <Route path='shop/*' element={<Shop />}/> 
        <Route path='auth' element={<SignIn />}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  )
}
export default App;
