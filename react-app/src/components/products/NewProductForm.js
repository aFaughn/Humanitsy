import React, {useEffect, useState} from 'react';
import {CreateProductThunk} from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './NewProductForm.css'

function NewProductForm() {
    //Grab user Id
    const userId = useSelector(state => state.session.user.id)
    const username = useSelector(state => state.session.user.username)
    const history = useHistory()
    const dispatch = useDispatch()
    //State
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const [description, setDescription] = useState('')
    const [weapon_type, setWeapon_Type] = useState('Greatsword')
    const [base_damage, setBase_Damage] = useState(0)
    const [scaling_type, setScaling_Type] = useState('Dexterity')
    const [can_be_buffed, setCan_Be_Buffed] = useState(false)
    const [image_url, setImage_Url] = useState('')
    const [errors, setErrors] = useState([])
    const [showPreview, setShowPreview] = useState(false);
    const [displayErrors, setDisplayErrors] = useState(false);

    const weapon_type_options = [
        'Greatsword',
        'Straight-Sword',
        'Bow',
        'Dagger',
        'Hammer',
        'Gauntlet',
        'Axe',
        'Spear',
        'Katana',
        'Curved-Sword',
        'Whip',
        'Throwable',
        'Halberd',
        'Ring'
    ]
    const scaling_type_options = [
        'Dexterity',
        'Strength',
        'Quality',
        'Intelligence',
        'Faith',
        'DEX & INT',
        'STR & FAI',
        'All',
        'None'
    ]
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

    const togglePreview = (e) => {
        e.preventDefault()
        showPreview ? setShowPreview(false) : setShowPreview(true);
    }

    const handleSubmit = (e) => {
        if (errors.length > 0) {
            e.preventDefault()
            setDisplayErrors(true);
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
            validationErrors.push('Price may not be greater than 999,999')
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

    function handleImgError(e) {
        e.target.src = '/static/images/backupImage.png'
    }

    return (
        <>
        <div id='product-form-page-wrapper'>
            <form onSubmit={onSubmit} id='new-weapon-form'>
        <h1>{message}</h1>
                <div className='form_errors'>
                    {displayErrors && (
                        <div>
                            {errors.length > 0 && errors.map(error => (
                                <li key={error}>{error}</li>
                                ))}
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <p>Product Name *</p>
                    </div>
                    <div>
                        <input type='text' onChange={e => setName(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Price *</p>
                    </div>
                    <div>
                        <input type='number' placeholder='1 - 999,999' onChange={e => setPrice(e.target.value)} required></input>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Base Damage *</p>
                    </div>
                    <div>
                        <input type='number' placeholder='1 - 999,999' onChange={e => setBase_Damage(e.target.value)} required></input>
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
                <div>
                    <div>
                        <p>Scaling Type <span>*</span></p>
                    </div>
                    <div>
                        <select onChange={e => setScaling_Type(e.target.value)} required>
                            {scaling_type_options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
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
                        <p>Product Description</p>
                    </div>
                    <div>
                        <textarea id='product-description' type='description' placeholder='description' onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                </div>
                <button id='preview-button' onClick={togglePreview}>Preview</button>
                <button id='submit-product' type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
            {showPreview && (
            <div id='preview-modal-bg'>
                <div id='preview-modal-wrapper'>
                    <div id='image-preview'>
                        <h3>Preview:</h3>
                        <p>{name.length > 23 ? name.slice(0,23) + '...' : name}</p>
                        <div>
                            <img onError={handleImgError} src={image_url} alt='preview'></img>
                        </div>
                        <p>{price}</p>
                        <p>{username}</p>
                        <p>No Reviews Yet</p>
                    </div>
                    <button id='preview-button' onClick={togglePreview}>Close</button>
                </div>
            </div>
            )}
        </>
    )
}

export default NewProductForm
