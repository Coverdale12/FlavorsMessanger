import "./Search.scss"

export default function Search() {
  function onInputResetButton(event) {
    const inputField = event.target
    const buttonReset = inputField.nextElementSibling
    if (inputField.value) {
      buttonReset.classList.add("visible")
    } else {
      buttonReset.classList.remove("visible")
    }
  }
  
  function onClear(event) {
    event.target.classList.remove("visible")
  }
  
  return (
    <form className="search box-shadow__base border-radius-layout__base" data-js-form>
      <label htmlFor="searchInput">
        <svg className="search__icon" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9167 29.25C18.0968 29.2493 21.1854 28.1847 23.6905 26.2257L31.5666 34.1018L34.1 31.5684L26.2239 23.6923C28.184 21.1869 29.2492 18.0977 29.25 14.9167C29.25 7.01363 22.8197 0.583336 14.9167 0.583336C7.01363 0.583336 0.583336 7.01363 0.583336 14.9167C0.583336 22.8197 7.01363 29.25 14.9167 29.25ZM14.9167 4.16667C20.8453 4.16667 25.6667 8.98804 25.6667 14.9167C25.6667 20.8453 20.8453 25.6667 14.9167 25.6667C8.98804 25.6667 4.16667 20.8453 4.16667 14.9167C4.16667 8.98804 8.98804 4.16667 14.9167 4.16667Z" fill="#7C7C7C" />
        </svg>
        <span className="visually-hidden">
          Search chat
        </span>
      </label>
      <input
        className="search__input"
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Search"
        onInput={(event) => onInputResetButton(event)} />
      <button className="search__clear" type="reset" onClick={(event) => {
        onClear(event)
      }}>
      </button>
    </form>
  )
}