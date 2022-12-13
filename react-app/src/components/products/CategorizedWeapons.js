import './CategorizedWeapons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';

/*
Scroll buttons:
Attach click event listener to buttons, have them utilize useState to change the current indice of an array contianing all containers
map over the array at the current indice to display currnet set of categories

*/

function CategorizedWeapons() {

    return (
        <div>
            <h1 id='category-section-title'>Weapon Categories</h1>
            <ul id='categories-ul'>
                <li id='cat-scroll'><FontAwesomeIcon icon={faArrowLeft}/></li>
                <li id='cat-scroll'><FontAwesomeIcon icon={faArrowRight}/></li>
            </ul>
        </div>
    )
}

export default CategorizedWeapons;
