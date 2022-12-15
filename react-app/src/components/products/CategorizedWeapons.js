import './CategorizedWeapons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';

/*
Scroll buttons:
Attach click event listener to buttons, have them utilize useState to change the current indice of an array contianing all containers
map over the array at the current indice to display currnet set of categories

TODO: Give the current category an :active psuedoclass and highlgiht it.
TODO: Media Query: When screen size is less than 600px, reduce or shorten category names.
*/

function CategorizedWeapons() {

    const [catScroll, setCatScroll] = useState(0);


    const categories = [
                        ['Greatsword','Straight-Sword','Bow','Dagger','Hammer','Gauntlet'],
                        ['Axe','Spear','Katana','Curved-Sword','Whip','Throwable'],
                        ['Ring', 'Halberd']]


    return (
        <div>
            <div id='cat-container'>
                <h1 id='category-section-title'>Product Categories</h1>
                <ul id='categories-ul'>
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowLeft} onClick={() => catScroll === 0 ? setCatScroll(categories.length - 1) : setCatScroll(catScroll - 1)}/></li>
                    {categories[catScroll].map(item => (
                        <li className='category-listing'>{item}</li>
                        ))}
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowRight} onClick={() => catScroll === categories.length - 1 ? setCatScroll(0) : setCatScroll(catScroll + 1)}/></li>
                </ul>
            </div>
            <div id='filtered-prod-container'>
                    <div id='filt-card-container'>
                        <p style={{color: 'white'}}>!PLACEHOLDER! Query for products by category selected, map them here.</p>
                        <p style={{color: 'white'}}>More seed data might work well here :P</p>
                    </div>
            </div>
        </div>
    )
}

export default CategorizedWeapons;
