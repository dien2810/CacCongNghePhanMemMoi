import { useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import { itemsSlice } from "../../redux/slice/ItemsSlice";
import { useState } from "react";
import { clientAPI } from "../../api/RestClient"; // Sử dụng RestClient

function DeletePopup(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const deleteItem = props.deleteItem;
    const setDeleteItem = props.setDeleteItem;
    const dispatch = useDispatch();
    const [state, setState] = useState('init'); // Trạng thái popup
    const [errorMessage, setErrorMessage] = useState(null); // Lưu thông báo lỗi nếu có

    const closePopupWithEvent = (e) => {
        if (e.target.id === 'children') setDeleteItem(null);
    };

    const handleDelete = async () => {
        setState('loading');
        try {
            if (!deleteItem || !user) throw new Error("Dữ liệu không hợp lệ!");

            // Gọi API để xóa sản phẩm khỏi giỏ hàng
            await clientAPI.service('/cart').remove(deleteItem.itemId);

            // Cập nhật Redux store sau khi xóa thành công
            dispatch(itemsSlice.actions.deleteItemInCart({ itemId: deleteItem.itemId }));

            setDeleteItem(null); // Đóng popup
            setState('init');
        } catch (err) {
            console.error('Error deleting item from cart:', err);
            setErrorMessage("Không thể xóa sản phẩm, vui lòng thử lại.");
            setState('error');
        }
    };

    if (!deleteItem) return null;

    if (state === 'loading') return <Loading />;

    return (
        <div className="uiewr">
            <div
                id="children"
                className="mainContnt"
                onClick={(e) => closePopupWithEvent(e)}
                style={{ alignItems: 'center', justifyContent: 'space-evenly' }}
            >
                <div className="cart-page-delete-popup-container">
                    <h3>Bỏ sản phẩm này khỏi giỏ hàng?</h3>
                    <p>{deleteItem.productName}</p>
                    {state === 'error' && (
                        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                    )}
                    <div>
                        <button onClick={() => setDeleteItem(null)}>KHÔNG</button>
                        <button
                            onClick={handleDelete}
                            style={{
                                backgroundColor: 'var(--heavyblue-color)',
                                color: 'white',
                            }}
                        >
                            CÓ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePopup;
