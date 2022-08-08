import React, {useState} from 'react';
import {CreateProductThunk} from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
//CSS here




function NewProductForm() {
    //Grab user Id
    const userId = useSelector(state => state.session.user.id)
    const history = useHistory()

    //State
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [weapon_type, setWeapon_Type] = useState('')
    const [base_damage, setBase_Damage] = useState(0)
    const [scaling_type, setScaling_Type] = useState('')
    const [can_be_buffed, setCan_Be_Buffed] = useState(false)
    const [errors, setErrors] = useState([])

    async function onSubmit(e) {
        e.preventDefault();
        const now = new Date()
        const product = {
            seller_id: userId,
            name,
            price,
            description,
            weapon_type,
            base_damage,
            scaling_type,
            can_be_buffed,
            posted: now.toTimeString()
        }

        const newProduct = await dispatchEvent(CreateProductThunk(product))
        if (!newProduct) {
            history.push('/')
        } else {
            setErrors(newProduct)
        }
    }


    return (
        <>
        <h1>New Product Form</h1>
        <div>
            <form onSubmit={onSubmit}>
                <div className='form_errors'>
                    <ul>
                        {errors.length > 0 && errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div>
                        <p>Product Name</p>
                    </div>
                    <div>
                        <input type='text' placeholder='product name' onChange={e => setName(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Product Description</p>
                    </div>
                    <div>
                        <input type='text' placeholder='description' onChange={e => setDescription(e.target.value)} ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Price</p>
                    </div>
                    <div>
                        <input type='number' placeholder='price' onChange={e => setPrice(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Weapon Type</p>
                    </div>
                    <div>
                        <select placeholder='weapon type' onChange={e => setWeapon_Type(e.target.value)} required>
                            <option>Greatsword</option>
                            <option>Straight-Sword</option>
                            <option>Bow</option>
                            <option>Dagger</option>
                            <option>Hammer</option>
                            <option>Gauntlet</option>
                            <option>Axe</option>
                            <option>Spear</option>
                            <option>Katana</option>
                            <option>Curved-Sword</option>
                            <option>Whip</option>
                            <option>Throwable</option>
                            <option>Halberd</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Base Damage</p>
                    </div>
                    <div>
                        <input type='number' placeholder='Base Damage' onChange={e => setBase_Damage(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Scaling Type <span>*</span></p>
                    </div>
                    <div>
                        <select onChange={e => setScaling_Type(e.target.value)} required>
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
                        <input type='checkbox' placeholder='Base Damage'></input>
                    </div>
                </div>
                <button type='submit'>Submit New Product</button>
            </form>
        </div>
        </>
    )
}

export default NewProductForm
