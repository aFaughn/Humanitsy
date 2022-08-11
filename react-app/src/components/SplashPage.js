import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './SplashPage.css'

function SplashPage() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if (user) {
        history.push('/')
    }


    return (
        <>
            <div id='splash-content-wrapper'>
                <h1 id='splash-header'>Welcome to Humanitsy</h1>
                <h2>A Place where Unkindled, Maidenless Tarnished, and Wretched Hollows can find their tools of trade.</h2>
                <h3>To continue, please either</h3>
                <div id='splash-button-wrapper'>
                    <div id='splash-login'>
                        <Link to='/login'>
                                Login
                        </Link>
                    </div>
                    <div>
                        or
                    </div>
                    <div id='splash-login'>
                        <Link to='/sign-up'>
                                Sign Up
                        </Link>
                    </div>
                </div>
            </div>
            <div id='about-me-wrapper'>
                <ul>
                        <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/aFaughn'>
                        <img src='https://i.imgur.com/T2iXgju.png' class='gitHub' alt='gitHub' />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/allen-faughn-4a3502235/'>
                        <img src='https://i.imgur.com/CyfqUHg.png' class='linkedIn' alt='linkedIn' />
                    </a>
                    <p>Allen Faughn</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SplashPage
