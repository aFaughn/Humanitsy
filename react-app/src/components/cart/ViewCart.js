import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './ViewCart.css';

function ViewCart() {
    // Get all items from local storage
    // JSON.parse
    // Map obj to JSX and display all cart items.

    const history = useHistory();

    const userId = useSelector(state => state.session.user?.id)

    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`))
    const [curCart, setCurCart] = useState(cart)
    if (!cart) {
        localStorage.setItem(`cart_${userId}`,'[]')
    }

    function getTotal() {
        let sum = 0
        if (cart) {
            cart.forEach(item => {
                sum += item.price
            })
        }
        return sum
    }



    useEffect(() => {
        if (!cart) {
            localStorage.setItem(`cart_${userId}`,JSON.stringify([]))
        }
    },[removeFromCart, cart])


    function removeFromCart(id) {
        const newCart = []
        cart.forEach(item => {
            // Do not change != to !==, it needs to be able to coerce the string to an integer.
            if (cart.indexOf(item) != id) {
                newCart.push(item)
            }
        })
        localStorage.setItem(`cart_${userId}`,JSON.stringify(newCart))
        setCurCart(newCart)
    }

    function checkout() {
        localStorage.setItem(`cart_${userId}`,JSON.stringify([]))
        history.push('/')
    }

    return (
        <>
        <div className='cart-wrapper'>
            <div className='cart-content'>
                <div className='cart-item-list'>
                <h1>{curCart.length} items in your cart</h1>
                {cart && cart.map(item => (
                    <div className='cart-item' key={cart.indexOf(item)}>
                        <div className='cart-item-image-wrapper'>
                            <img className='cart-image' src={item.image_url} alt={item.name}></img>
                            <ul className='cart-item-details'>
                                <li>{item.name}</li>
                                <li>{item.price} souls</li>
                                <li>{item.weapon_type}</li>
                            </ul>
                        </div>
                        <div>
                        <button onClick={(e) => removeFromCart(e.target.id)} id={cart.indexOf(item)} className='remove-cart'>Remove</button>
                        </div>
                    </div>
                    )
                    )}
                    {!cart.length && (
                        <p id='no-items'>Can't find anything you like? Well you could try looking a little harder.</p>
                    )}
                    </div>
                    <div className='cart-checkout-wrapper'>
                        <div>
                            <h3>How you'll pay</h3>
                            <div id='payment-methods'>
                                <div>
                                    <input type='radio' name='IOU' value='IOU' defaultChecked/>I.O.U.
                                </div>
                                <div>
                                    <input type='radio' name='IOU' value='IOU' />Hugs and Kisses
                                </div>
                                <div>
                                    <input type='radio' name='IOU' value='IOU' />Courier Pigeon
                                </div>
                            </div>
                        </div>
                        <p>Item(s) total: {getTotal()} souls</p>
                        <button className='checkout' onClick={checkout} disabled={!cart.length}>Check Out</button>
                        <div id='notices'>
                            <p>* Additional taxes <span id='notice_tax'>will not apply</span> because you're not actually buying anything</p>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default ViewCart
