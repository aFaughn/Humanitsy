import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux'

function SplashPage() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if (user) {
        history.push('/')
    }


    return (
    <div>
        <h1>Welcome to Humanitsy</h1>
        <h2>A Place where Unkindled, Maidenless Tarnished, and Wretched Hollows can find their tools of trade.</h2>
        <h3>To continue, please either</h3>
        <Link to='/login'>
            <div>
                Login
            </div>
        </Link>
            <div>
                or
            </div>
        <Link to='/sign-up'>
            <div>
                Sign Up
            </div>
        </Link>
    </div>
    )
}

export default SplashPage
