import { createSlice } from '@reduxjs/toolkit';

const initUser = JSON.parse(localStorage.getItem("user")) || {};
let initState = {
	_id: initUser._id || null,
	username: initUser.username || "Không có dữ liệu",
	fullname: initUser.fullname || "",
	image: initUser.image || "",
	number: initUser.number || "",
	location: initUser.location || "",
};


// Storage user infomation
export const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		// set: (state, action) => {
		// 	const newUser = { ...state, ...action.payload };
		// 	localStorage.setItem("user", JSON.stringify(newUser));
		// 	return newUser;
		// },
		set: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload));
			state._id = action.payload._id;
			state.username = action.payload.username;
			state.fullname = action.payload.fullname;
			state.image = action.payload.image;
			state.number = action.payload.number;
			state.location = action.payload.location;
		},
		setLocation: (state, action) => {
			state.location = action.payload;
			let user = JSON.parse(localStorage.getItem('user'));
			user = {...user, location: action.payload};
			localStorage.setItem('user', JSON.stringify(user));
		},
		delete: (state, action) => {
			localStorage.setItem('user', null);
			return {};
		},
		updatePartial: (state, action) => {
			const updatedUser = { ...state, ...action.payload };
			localStorage.setItem('user', JSON.stringify(updatedUser));
			return updatedUser;
		}
	}
})

export const { set, updatePartial, delete: deleteUser } = userSlice.actions;
export default userSlice.reducer;