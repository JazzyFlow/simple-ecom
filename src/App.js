import { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi'; 
import { HiOutlinePencil } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa'; 
import { TbShoppingCartPlus } from 'react-icons/tb'; 
import Navbar from './components/Navbar';
import data from './model/data';
import './App.css';

function App() {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [products, setProducts] = useState(data);
  const [categories, setCategories] = useState([...new Set(products.map(product => product.category)).values()]);
  const [activeProduct, setActiveProduct] = useState(0);
  const [addProductVisibility, setAddProductVisibility] = useState(false);
  const [editView, setEditView] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [cart, setCart] = useState([]);

  function toggleProduct(id) {
    setActiveProduct(id);
    setEditView(false);
  }

  function toggleMenu() {
    setMenuVisibility(!menuVisibility);
    setAddProductVisibility(false);
  }

  function toggleAddProduct() {
    setAddProductVisibility(!addProductVisibility);
    setMenuVisibility(false);
  }

  function addProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {};
    formData.append('id', data.length + 1);
    for (const [key, value] of formData.entries()) {
      product[key] = value;
    }
    data.push(product);
    setProducts(data);
    setCategories([...new Set(data.map(product => product.category)).values()]);
    filter(product.category);
  }

  function editProduct(e, id) {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        const formData = new FormData(e.target);
        for (const [key, value] of formData.entries()) {
          data[i][key] = value;
        }
      }
    }
    setProducts(data);
    setCategories([...new Set(data.map(product => product.category)).values()]);
    setEditView(false);
    filter(currentCategory);
  }

  function removeProduct(id) {
    data.splice(0, data.length, ...data.filter(product => product.id !== id));
    setActiveProduct(0);
    setProducts(data);
    setCategories([...new Set(data.map(product => product.category)).values()]);
    filter(currentCategory);
  }

  function addToCart(product) {
    cart.push(product);
    setCart(cart);
    setActiveProduct(0);
  }

  function filter(category) {
    setCurrentCategory(category);
    setMenuVisibility(false);
    setActiveProduct(0);
    if (category === "All") {
      setProducts(data);
    } else {
      const filtered = data.filter(product => product.category === category);
      setProducts(filtered.length === 0 ? data : filtered);
    }
  }

  return (
    <div className="App">
      <Navbar toggleAddProduct={toggleAddProduct} toggleMenu={toggleMenu}/>
      <div className={`menu ${ menuVisibility ? "active" : "hidden"}`}>
        <h1>MENU</h1>
        <ul>
          <li onClick={() => filter("All")} className={currentCategory === "All" ? "active" : ""} key="All">All</li>
          {
            categories.map(category => {
              return (
                <li onClick={() => filter(category)} key={category} className={currentCategory === category ? "active" : ""}>{category}</li>
              );
            })
          }
        </ul>
      </div>
      <div className={`active-container ${activeProduct > 0 ? "show" : ""}`}>
          { 
            products.map(product => {
                if (product.id === activeProduct) {
                    return (
                        <div key={product.id} className="active-product">
                            <div className='product-image'>
                                <img src={product.image} />
                            </div>
                            <form onSubmit={(e) => editProduct(e, product.id)} className='product-description'>
                                <h1>{product.product}</h1>
                                <h4>price: ${editView ? <input type='number' name='price' placeholder={product.price}/> : product.price}</h4>
                                <p>{editView ? <textarea type='text' name='description' placeholder={product.description}/> : product.description}</p>
                                <div className='action-buttons'>
                                  <TbShoppingCartPlus onClick={() => addToCart(product)}size="1.5em"/>
                                  {editView ? <button><FaCheck size="1.5em" className='icon'/></button> : ""}
                                  {!editView ? <HiOutlinePencil size="1.5em" onClick={() => setEditView(true)} className='icon'/> : ""}
                                  <FiTrash size="1.5em" onClick={() => removeProduct(product.id)} className='icon'/>
                                </div>
                            </form>
                        </div>
                    );
                }
            })
          }
          <div onClick={() => setActiveProduct(0)} className='footer'>
            <MdOutlineKeyboardArrowUp size="1.5em"/>
          </div>
      </div>
      <div className='products-container'>
          { 
              products.map(product => {
                  return (
                      <div 
                          onClick={() => toggleProduct(product.id)} 
                          key={product.id} 
                          className={`product ${activeProduct === product.id ? "active" : ""}`}>
                          <img src=""></img>
                          <h1>{product.product}</h1>
                          <p>{product.description}</p>
                      </div>
                  );
              }) 
          }
      </div>
      <div className={`add-product-container ${addProductVisibility ? "active" : ""}`}>
          <h1>ADD A PRODUCT</h1>
          <form onSubmit={(e) => addProduct(e)}>
            <div className='field-container'>
              <div className='field'>
                <h4>Product</h4>
                <input type="text" name="product" required/>
              </div>
              <div className='field'>
                <h4>Price</h4>
                <input type="number" name="price" required/>
              </div>
              <div className='field'>
                <h4>Category</h4>
                <input type="text" name="category" required/>
              </div>
              <div className='field'>
                <h4>Description</h4>
                <textarea type="text" name="description" required/>
              </div>
            </div>
            <div>
              <button className='add-button'>
                <MdAddCircle/>
                Add Product
              </button>
            </div>
          </form>
      </div>
      <div className='cart-container'>
          {
            cart.map(product => {
              return (
                <div key={product.id}>
                  <h1>{product.id}</h1>
                  <h1>{product.product}</h1>
                </div>
              );
            })
          }
      </div>
    </div>
  );
}

export default App;
