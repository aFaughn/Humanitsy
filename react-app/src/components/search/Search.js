import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import './Search.css';

function Search() {
    const [searchResults, setSearchResults] = useState([])

    const allProducts = useSelector(state => state.products)
    const products = Object.values(allProducts)
    let search = []

    const filteredProduct = (e) => {
        if (e.target.value) {
            search = products.filter(product => {
                if (product.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.weapon_type.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return true
                }
                return false
            })
        }
        setSearchResults(search)
    }

    return (
        <>
            <h1 id='searchBanner'>Search for a product</h1>
            <div id='smollerSearchWrapper'>
            <input
              className='productSearch'
              type='text'
              placeholder='Search for a product by name or weapon type...'
              onChange={filteredProduct} />
            {searchResults.length > 0 &&
                <div className='results'>
                    {!!searchResults.length && searchResults.map(result => (
                        <Link key={result.id} to={`/products/${result.id}`}>
                            <div className='resultContainer'>
                                <div id='resNameContainer'>
                                    <p className='resultName'>{result?.name.length > 23 ? `${result.name.slice(0,23)}...` : result.name}</p>
                                </div>
                                <div id='resTypeContainer'>
                                    <p className='resultType'>{result.weapon_type}</p>
                                </div>
                                <div id='resPriceContainer'>
                                    <p className='resultPrice'>${result.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
            }
            </div>
        </>
    )
}

export default Search
