import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <Route path='/profile' component={Profile} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
