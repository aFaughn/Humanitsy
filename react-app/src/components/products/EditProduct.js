import React, {useEffect, useState} from 'react';
import {EditProductThunk} from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import './EditProduct.css'

function EditProduct() {
 //Grab user Id
 const { productId } = useParams()
 const userId = useSelector(state => state.session.user.id)
 const product = useSelector(state => state.products[productId])
 const history = useHistory()
 const dispatch = useDispatch()
 //State
 const [name, setName] = useState(product.name)
 const [price, setPrice] = useState(product.price)

 const [description, setDescription] = useState(product.description)
 const [weapon_type, setWeapon_Type] = useState(product.weapon_type)
 const [base_damage, setBase_Damage] = useState(product.base_damage)
 const [scaling_type, setScaling_Type] = useState(product.scaling_type)
 const [can_be_buffed, setCan_Be_Buffed] = useState(product.can_be_buffed)
 const [image_url, setImage_Url] = useState(product.image_url)
 const [errors, setErrors] = useState([])
 const weapon_type_options = ['Greatsword', 'Straight-Sword','Bow','Dagger','Hammer','Gauntlet','Axe','Spear','Katana','Curved-Sword','Whip','Throwable','Halberd']

 async function onSubmit(e) {
     e.preventDefault();
     // const now = new Date()
     const product = {
         id: productId,
         seller_id: userId,
         name,
         price,
         description,
         weapon_type,
         base_damage,
         scaling_type,
         can_be_buffed,
         image_url
     }

     const editProduct = await dispatch(EditProductThunk(product))
     if (!editProduct) {
         history.push('/')
     } else {
         setErrors(editProduct)
     }
 }

 function handleCheck() {
     if (can_be_buffed) {
         setCan_Be_Buffed(false)
     } else {
         setCan_Be_Buffed(true)
     }
 }


 const validations = () => {
     const validationErrors = []
     if (name.length > 50) {
         validationErrors.push('Name may not be longer than 50 characters')
     }
     if (!name) {
         validationErrors.push('Please provide a valid name')
     }
     if (!price) {
         validationErrors.push('Please provide a price')
     } else if (price > 999999) {
        validationErrors.push('Price may not be larger than 999,999')
     }
     if (description.length > 1000) {
         validationErrors.push('Description may not be longer than 1000 characters')
     }
     if (!weapon_type) {
         validationErrors.push('Please select a weapon type')
     }
     if (!image_url) {
         validationErrors.push('Please provide an image.')
     } else if (image_url.slice(-4) !== '.png' && image_url.slice(-4) !== '.jpg' && image_url.slice(-4) !== 'jpeg' && image_url.slice(-4) !== '.gif' && image_url.slice(-4) !== '.svg') {
         validationErrors.push('Valid image urls must end in .png, .jpg, .jpeg, .gif, or .svg')
     }
     if (!base_damage) {
         validationErrors.push('Please provid a base damage value')
     } else if (base_damage > 999999) {
        validationErrors.push('Damage may not be greater than 999,999')
     }
     if (image_url.length > 1000) {
         validationErrors.push('Image url too long')
     }
     setErrors(validationErrors)
 }

 useEffect(() => {
     validations()
 },[description, price, name, weapon_type, base_damage, scaling_type, can_be_buffed, image_url])

 return (
     <>
     <div id='product-form-page-wrapper'>
         <form onSubmit={onSubmit} id='new-weapon-form'>
             <div className='form_errors'>
                 <ul>
                     {errors.length > 0 && errors.map(error => (
                         <li key={error}>{error}</li>
                         ))}
                 </ul>
             </div>
             <div>
                 <div>
                     <p>Product Name *</p>
                 </div>
                 <div>
                     <input type='text' value={name} placeholder='product name' onChange={e => setName(e.target.value)} required></input>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Product Description</p>
                 </div>
                 <div>
                     <textarea id='product-description' type='description' value={description} placeholder='description' onChange={e => setDescription(e.target.value)} ></textarea>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Price *</p>
                 </div>
                 <div>
                     <input type='number' value={price} placeholder='price' onChange={e => setPrice(e.target.value)} required></input>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Weapon Type *</p>
                 </div>
                 <div>
                     <select placeholder='weapon type' value={weapon_type} onChange={e => setWeapon_Type(e.target.value)} required>
                         {weapon_type_options.map(weapon => (
                             <option key={weapon} value={weapon}>{weapon}</option>
                         ))}
                     </select>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Base Damage *</p>
                 </div>
                 <div>
                     <input type='number' value={base_damage} placeholder='Base Damage' onChange={e => setBase_Damage(e.target.value)} required></input>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Scaling Type <span>*</span></p>
                 </div>
                 <div>
                     <select onChange={e => setScaling_Type(e.target.value)} required value={scaling_type}>
                         <option>Dexterity</option>
                         <option>Strength</option>
                         <option>Quality</option>
                         <option>Intelligence</option>
                         <option>Faith</option>
                         <option>DEX & FAI</option>
                         <option>DEX & INT</option>
                         <option>All</option>
                     </select>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Buffable?</p>
                 </div>
                 <div>
                     <input type='checkbox' checked={can_be_buffed} onChange={handleCheck}></input>
                 </div>
             </div>
             <div>
                 <div>
                     <p>Image URL *</p>
                 </div>
                 <div>
                     <input type='text' value={image_url} onChange={e => setImage_Url(e.target.value)}></input>
                 </div>
             </div>
             <button id='submit-product' type='submit' disabled={errors.length} >Submit</button>
         </form>
         <div id='image-preview'>
             <h3>Image Preview:</h3>
             <p>Detected File Type: {image_url.slice(-4)}</p>
             <p>If you see Solaire, your image failed to load :)</p>
             <div>
                <img onError={(e) => e.target.src = '/static/images/backupImage.png'} src={image_url} alt='preview'></img>
             </div>
         </div>
     </div>
     </>
 )
}

export default EditProduct
