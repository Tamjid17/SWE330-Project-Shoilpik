import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Cart from './pages/Cart'
import { useSelector } from 'react-redux'

function Layout() {
    const { toggle } = useSelector(store => store.cart); 
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
        {toggle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Cart />
          </div>
        )}
      </>
    );
}

export default Layout