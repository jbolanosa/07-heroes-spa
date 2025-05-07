import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParms] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;


  const { searchText, onInputChange} = useForm({
    searchText: q
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if( searchText.trim().length <= 1) return;

    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input
              className="form-control"
              placeholder="Search a hero"
              type="text"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary"
            style={{display: showSearch ? '' : 'none'}}>
            Search a hero
          </div>

          <div className="alert alert-danger"
            style={{display: showError ? '' : 'none'}}>
            No hero with <b>{q}</b>
          </div>

          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }

        </div>
      </div>


    </>
  )
}