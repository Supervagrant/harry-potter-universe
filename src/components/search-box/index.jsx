import "./style.css";

const SeacrhBox = ({ placeholder, onChangeHandler, classNameProp }) => {
  return (
    <input
      className={`search-box ${classNameProp}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SeacrhBox;
