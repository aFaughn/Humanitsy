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
    const session = useSelector(state => state.session)

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
            if (cart.indexOf(item) != id) {
                newCart.push(item)
            }
        })
        console.log(newCart, id)
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
                <h1>Ashen One, be sure to bring more souls.</h1>
                {cart && cart.map(item => (
                    <div className='cart-item' key={cart.indexOf(item)}>
                        <div className='cart-item-image-wrapper'>
                            <img className='cart-image' src={item.image_url} alt={item.name}></img>
                            <ul className='cart-item-details'>
                                <li>{item.price}</li>
                                <li>{item.name}</li>
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
                        <img id='handmaid' src='/static/images/handmaid_transparent.png' alt='handmaid'></img>
                        <h1>Total: {getTotal()} souls</h1>
                        <button className='checkout' onClick={checkout} disabled={!cart.length}>Check Out</button>
                    </div>
            </div>
        </div>
        </>
    )
}

export default ViewCart
