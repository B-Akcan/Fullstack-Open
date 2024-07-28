const SearchBar = ({searchHandler}) => {
    return (
        <p>
            find countries <input onChange={searchHandler}/>
        </p>
    )
}

export default SearchBar