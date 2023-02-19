import './header.css';
import { useDispatch } from "react-redux";
import { contractsSearched } from "../contracts/contractSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => e.preventDefault();
    const handleSearchChange = (e) => dispatch(contractsSearched(e.target.value));

    return (
        <form onSubmit={handleSubmit} >
            <div>
                <div className="input">
                    <input
                        className="search__input"
                        type="search"
                        placeholder="Search Customer"
                        aria-describedby="button-addon3" class="form-control bg-none border-0"
                        onChange={handleSearchChange}
                    />
                    <button className="search__button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search;