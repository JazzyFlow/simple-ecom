import { CgMenuLeft } from 'react-icons/cg';
import { TbShoppingCart } from 'react-icons/tb';
import { MdAddCircleOutline } from 'react-icons/md';

function Navbar({ toggleMenu, toggleAddProduct }) {
    return (
        <div id='navbar'>
            <CgMenuLeft onClick={() => toggleMenu() } size="2em"/>
            <h2><a href="/">TheShop.</a></h2>
            <div>
                <MdAddCircleOutline onClick={() => toggleAddProduct()} className='add-product' style={{marginRight:"10px"}} size="1.5em"/>
                <TbShoppingCart size="1.5em"/>
            </div>
        </div>
    );
}

export default Navbar