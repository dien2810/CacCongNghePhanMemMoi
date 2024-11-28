import "../../assets/css/Document.css";
import { getUser } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clientAPI } from "../../api/RestClient";
import { itemsSlice } from "../../redux/slice/ItemsSlice";
import { updatePartial } from "../../redux/slice/UserSlice";


function Information() {
  const user = useSelector(getUser) || {}; // Lấy dữ liệu từ Redux
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");

  // Cập nhật state khi `user` thay đổi
  useEffect(() => {
    if (user) {
      console.log(user.fullname);
      console.log(user.number);
      setFullname(user.fullname || "");
      setNumber(user.number || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // Gửi API để cập nhật
      const updatedUser = await clientAPI
        .service("/users")
        .patch(user._id, { fullname, number });

      // Cập nhật Redux và localStorage
      dispatch(
        updatePartial({
          fullname: updatedUser.fullname,
          number: updatedUser.number,
        })
      );
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại.");
    }
  };

  return (
    <div className="document">
      <div className="document-heading">Hồ Sơ Của Tôi</div>
      <div className="document-desc">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </div>
      <form
        className="document-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* Tên đăng nhập */}
        <div className="dghdd9">
          <div className="h4eiAQ">
            <div className="tBgRZR">
              <label>Tên đăng nhập</label>
            </div>
            <div className="gVdPk">
              <div className="Z1Wx1m">{user.username}</div>
            </div>
          </div>
        </div>

        {/* Tên */}
        <div className="dghdd9">
          <div className="h4eiAQ">
            <div className="tBgRZR">
              <label>Tên</label>
            </div>
            <div className="gVdPk">
              <div className="ovqcxY">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  className="y-NK4C"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Số điện thoại */}
        <div className="dghdd9">
          <div className="h4eiAQ">
            <div className="tBgRZR">
              <label>Số điện thoại</label>
            </div>
            <div className="gVdPk">
              <div className="ovqcxY">
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="y-NK4C"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nút Lưu */}
        <button type="submit" className="btn-save">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default Information;
