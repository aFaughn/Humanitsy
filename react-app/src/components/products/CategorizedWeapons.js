import './CategorizedWeapons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GetFilteredProductThunk } from '../../store/categories';

/*
Scroll buttons:
Attach click event listener to buttons, have them utilize useState to change the current indice of an array contianing all containers
map over the array at the current indice to display currnet set of categories

TODO: Give the current category an :active psuedoclass and highlgiht it.
TODO: Media Query: When screen size is less than 600px, reduce or shorten category names.
*/

function CategorizedWeapons() {
    const dispatch = useDispatch();

    const [catScroll, setCatScroll] = useState(0);
    //Store the active category
    const [selectedCat, setSelectedCat] = useState('');
    //Store all items returned from category selection -> Map them in JSX
    const [filteredItems, setFilteredItems] = useState([]);
    //Randomized Key value to play CSS animations on scroll
    const [randomKey, setRandomKey] = useState(Math.random());

    //Handles the dynamic rendering of filtered products
    useEffect(() => {
        // Dispatch thunk in store/products.js to fetch all weapons returned from selectedCat
        dispatch(GetFilteredProductThunk(selectedCat))
        // Store weapons as filteredItems state
    },[dispatch, selectedCat])

    const categories = [
                        ['Greatsword','Straight-Sword','Bow','Dagger','Hammer'],
                        ['Axe','Spear','Katana','Curved-Sword','Gauntlet'],
                        ['Ring', 'Halberd', 'Throwable','Whip']]


    return (
        <div id='categories-wrapper'>
            <div id='cat-container'>
                <h1 id='category-section-title'>Product Categories</h1>
                <ul id='categories-ul'>
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowLeft} onClick={() => catScroll === 0 ? setCatScroll(categories.length - 1) : setCatScroll(catScroll - 1)}/></li>
                    {categories[catScroll].map(item => (
                        <li className='category-listing' onClick={(e) => setSelectedCat(item.toLowerCase())}>{item}</li>
                        ))}
                    <li id='cat-scroll'><FontAwesomeIcon icon={faArrowRight} onClick={() => catScroll === categories.length - 1 ? setCatScroll(0) : setCatScroll(catScroll + 1)}/></li>
                </ul>
            </div>
            <div id='filtered-prod-container'>
                    <div id='filt-card-container'>
                        <p style={{color: 'white'}}>{selectedCat}</p>
                        <p style={{color: 'white'}}>More seed data might work well here :P</p>
                    </div>
            </div>
        </div>
    )
}

export default CategorizedWeapons;
