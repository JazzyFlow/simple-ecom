import { CgMenuLeft } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';

function Navbar() {
    return (
        <div id='navbar'>
            <div className='menu-container'>
                <CgMenuLeft size={"2em"}/>
                <h2>Shop</h2>
                <FiShoppingCart size={"2em"}/>
            </div>
        </div>
    );
}

export default Navbar