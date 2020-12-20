import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Page404 from './components/Page404';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <ScrollToTop />
          <Switch>
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/admin/userlist' component={AdminUserListScreen} />
            <Route path='/admin/user/:id' component={AdminUserEditScreen} />
            <Route path='/admin/productlist' component={AdminProductListScreen} />
            <Route path='/admin/product/:id' component={AdminProductEditScreen} />
            <Route path='/admin/orderlist' component={AdminOrderListScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/' component={HomeScreen} />
            <Route path='/' component={Page404} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
