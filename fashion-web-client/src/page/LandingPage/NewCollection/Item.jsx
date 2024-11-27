import { useDispatch } from "react-redux";
import { itemsSlice } from "../../../redux/slice/ItemsSlice.js";

function NewCollectionItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  if (!item) {
    console.error("Dữ liệu item không hợp lệ:", item);
    return null;
  }

  return (
    <div
      className="collection-item"
      onClick={() => dispatch(itemsSlice.actions.setPopupItem(item))}
    >
      <img src={item.image} alt="listItemImage" />
      <div className="collection-listitem-desc">{item.category}</div>
    </div>
  );
}
export default NewCollectionItem;

