import React, {useEffect, useState} from 'react';
import {CreateProductThunk} from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './NewProductForm.css'

function NewProductForm() {
    //Grab user Id
    const userId = useSelector(state => state.session.user.id)
    const history = useHistory()
    const dispatch = useDispatch()
    //State
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const [description, setDescription] = useState('')
    const [weapon_type, setWeapon_Type] = useState('')
    const [base_damage, setBase_Damage] = useState(0)
    const [scaling_type, setScaling_Type] = useState('')
    const [can_be_buffed, setCan_Be_Buffed] = useState(false)
    const [image_url, setImage_Url] = useState('')
    const [errors, setErrors] = useState([])
    const weapon_type_options = ['Greatsword', 'Straight-Sword','Bow','Dagger','Hammer','Gauntlet','Axe','Spear','Katana','Curved-Sword','Whip','Throwable','Halberd']

    async function onSubmit(e) {
        e.preventDefault();
        // const now = new Date()
        const product = {
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

        const newProduct = await dispatch(CreateProductThunk(product))
        if (!newProduct) {
            history.push('/')
        } else {
            setErrors(newProduct)
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
        }
        if (image_url.length > 1000) {
            validationErrors.push('Image url too long')
        }
        setErrors(validationErrors)
    }

    useEffect(() => {
        validations()
    },[description, price, name, weapon_type, base_damage, scaling_type, can_be_buffed, image_url])

    const messages = [
        'A Weapon Capable of Linking The Flame?',
        'Forged in the fires of Lost Izalith',
        'Pulled from the Smelter Demon himself.',
        'Hours of Hitting The Same Sword With A Hammer',
        'Finally got the key to your workshop?',
        '👽 Bogos Binted?'
    ]
    const [message, setMessage] = useState('')
    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * (messages.length))])
    },[dispatch])

    return (
        <>
        <div id='product-form-page-wrapper'>
        <h1>{message}</h1>
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
                        <input type='text' placeholder='product name' onChange={e => setName(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Product Description</p>
                    </div>
                    <div>
                        <textarea id='product-description' type='description' placeholder='description' onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Price *</p>
                    </div>
                    <div>
                        <input type='number' placeholder='price' onChange={e => setPrice(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Weapon Type *</p>
                    </div>
                    <div>
                        <select placeholder='weapon type' onChange={e => setWeapon_Type(e.target.value)} required>
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
                        <input type='checkbox' onChange={handleCheck}></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Image URL *</p>
                    </div>
                    <div>
                        <input type='text' onChange={e => setImage_Url(e.target.value)}></input>
                    </div>
                </div>
                <button id='submit-product' type='submit' disabled={errors.length} >Submit</button>
            </form>
            {/* <div>
                <h3>Image Preview:</h3>
                <p>Detected File Type: {image_url.slice(-4)}</p>
                <div>
                    <img src={image_url} alt='preview'></img>
                    <img src={'https://i.imgur.com/YaglpbH.png'} alt='preview backup'></img>
                </div>
            </div> */}
        </div>
        </>
    )
}

export default NewProductForm
