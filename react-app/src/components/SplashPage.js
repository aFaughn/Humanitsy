import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import './SplashPage.css'

function SplashPage() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if (user) {
        history.push('/')
    }

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)

    useEffect(() => {

    }, [showLoginModal, showSignupModal])

    return (
        <>
        <div id='flybox'>
            <img  id='fly1' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/old_wolf_curved_sword.png' class='flyby-image'/>
            <img  id='fly2' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/brigand_twindaggers.png' class='flyby-image'/>
            <img  id='fly3' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dragonslayer_greataxe.png' class='flyby-image'/>
            <img  id='fly4' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/black_knight_sword.png' class='flyby-image'/>
            <img  id='fly5' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/ring_of_favor.png' class='flyby-image'/>
            <img  id='fly6' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/black_firebomb.png' class='flyby-image'/>
        </div>
            <div id='splash-content-wrapper'>
                <h1 id='splash-header'>Humanitsy</h1>
                <div id='weapon-spin-wrapper'>
                    <div id='weapon-spin-container'>
                        <div id='weapon-spin-image-container'>
                            <img class='weapon-image' id='wimg1' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/zweihander.png'/>
                            <img class='weapon-image' id='wimg2' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/morion_blade.png'/>
                            <img class='weapon-image' id='wimg3' src='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/exile_greatsword.png'/>
                            <img class='weapon-image' id='wimg4' src="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/ledo's_great_hammer.png"/>
                        </div>
                    </div>
                </div>
                <h2>A Place where Unkindled, Maidenless Tarnished, and Wretched Hollows can find their tools of trade.</h2>
                <h3>To continue, please either</h3>
                <div id='splash-button-wrapper'>
                    <button id='splash-login' onClick={(e) => setShowLoginModal(true)}>Login</button>
                    <div>
                        or
                    </div>
                    <button id='splash-login' onClick={(e) => setShowSignupModal(true)} >Sign Up</button>
                </div>
            </div>
            <div id='about-me-wrapper'>
                <ul>
                        <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/aFaughn'>
                        <img src='https://i.imgur.com/T2iXgju.png' className='gitHub' alt='gitHub' />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/allen-faughn-4a3502235/'>
                        <img src='https://i.imgur.com/CyfqUHg.png' className='linkedIn' alt='linkedIn' />
                    </a>
                    </li>
                </ul>
            </div>
            {showLoginModal && (
            <div id='modal-bg'>
                <div id='login'>
                    <LoginForm visible={setShowLoginModal}/>
                </div>
            </div>
            )}
            {showSignupModal && (
            <div id='modal-bg'>
              <div id='login'>
                     <SignUpForm visible={setShowSignupModal}/>
              </div>
            </div>
            )}
            <div id='disable-animation'>Disable CSS Animation</div>
        </>
    )
}

export default SplashPage
