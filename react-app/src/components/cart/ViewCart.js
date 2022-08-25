import {useSelector} from 'react-redux';
import './ViewCart.css';

function ViewCart() {
    // Get all items from local storage
    // JSON.parse
    // Map obj to JSX and display all cart items.

    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)

    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`))

    return (
        <>
        <div className='cart-wrapper'>
            <div className='cart-content'>
                <h1>Hello From Cart</h1>
                <p>This is where some items would probably go.</p>
                {cart && cart.map(item => (
                    <div>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                    </div>
                    )
                )}
            </div>
        </div>
        </>
    )
}

export default ViewCart
