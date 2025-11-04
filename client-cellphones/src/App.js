import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
// Use CJS build to avoid ESM named export issues with CRA4/Webpack4
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ResetScroll from './components/ResetScroll/ResetScroll';
import MyOrderPage from './pages/MyOrderPage';
// import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CareersPage from './pages/CareersPage';
import StoresPage from './pages/StoresPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPolicyPage from './pages/PaymentPolicyPage';
import VoucherPage from './pages/VoucherPage';
import ReturnPage from './pages/ReturnPage';
import ModelViewerPage from './pages/ModelViewerPage';
import GlobalAIChatbot from './components/GlobalAIChatbot/GlobalAIChatbot';

function PageTransitionWrapper({ children }) {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [overlayKey, setOverlayKey] = React.useState(0);

  React.useEffect(() => {
    // Trigger overlay on each path change
    setOverlayKey((k) => k + 1);
    setShowOverlay(true);
    const t = setTimeout(() => setShowOverlay(false), 2000); // 2s cover
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      {/* Full-screen slide overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key={overlayKey}
            className="route-overlay"
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '100%'] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.25, 0.75, 1] }}
          >
            <div className="route-overlay-inner">
              <div className="route-overlay-spinner" />
              <span className="route-overlay-text">PL Store</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content transition */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <ResetScroll></ResetScroll>
        <PageTransitionWrapper>
          <Switch>
            <Route path="/" exact>
              <HomePage></HomePage>
            </Route>
            <Route path="/login">
              <LoginPage></LoginPage>
            </Route>
            <Route path="/register">
              <SignupPage></SignupPage>
            </Route>
            <Route path="/product">
              <ProductPage></ProductPage>
            </Route>
            <Route path="/detail/:id">
              <DetailPage></DetailPage>
            </Route>
            <Route path='/cart'>
              <CartPage></CartPage>
            </Route>
            <Route path='/order'>
              <OrderPage></OrderPage>
            </Route>
            <Route path='/orderSuccess'>
              <OrderSuccessPage></OrderSuccessPage>
            </Route>
            <Route path='/payment'>
              <PaymentPage></PaymentPage>
            </Route>
            <Route path='/MyOrder'>
              <MyOrderPage></MyOrderPage>
            </Route>
            <Route path='/search'>
              <SearchPage></SearchPage>
            </Route>
            {/* Removed store chat route */}
            {/* <Route path='/chat'>
              <ChatPage></ChatPage>
            </Route> */}            <Route path='/admin'>
              <AdminPage></AdminPage>
            </Route>
            {/* 3D Model Viewer Page */}
            <Route path='/model-viewer'>
              <ModelViewerPage></ModelViewerPage>
            </Route>
            {/* New Footer Pages */}
            <Route path='/about'>
              <AboutPage></AboutPage>
            </Route>
            <Route path='/blog' exact>
              <BlogPage></BlogPage>
            </Route>
            <Route path='/blog/:id'>
              <BlogDetailPage></BlogDetailPage>
            </Route>
            <Route path='/careers'>
              <CareersPage></CareersPage>
            </Route>
            <Route path='/stores'>
              <StoresPage></StoresPage>
            </Route>
            {/* Policy Pages */}
            <Route path='/shipping'>
              <ShippingPage></ShippingPage>
            </Route>
            <Route path='/payment-policy'>
              <PaymentPolicyPage></PaymentPolicyPage>
            </Route>
            <Route path='/voucher'>
              <VoucherPage></VoucherPage>
            </Route>
            <Route path='/return'>
              <ReturnPage></ReturnPage>
            </Route>
            {/* <Route path='*'>
              <HomePage></HomePage>
            </Route> */}
          </Switch>
        </PageTransitionWrapper>
        {/* Global AI Assistant - hiển thị trên mọi trang */}
        <GlobalAIChatbot />
      </Router>
    </div>
  );
}

export default App;
