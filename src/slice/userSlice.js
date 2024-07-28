import { createSlice } from "@reduxjs/toolkit";

// Function to get users and currentUser from localStorage
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) return { users: [], currentUser: null };
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Failed to load state from localStorage", err);
        return { users: [], currentUser: null };
    }
};

const initialState = loadStateFromLocalStorage();

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users.push(action.payload);
            saveStateToLocalStorage(state);
        },
        addUsersTime: (state, action) => {
            const { id, time } = action.payload;
            const user = state.users.find(user => user.id === id);
            if (user) {
                user.time = time;
                saveStateToLocalStorage(state);
            }
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            saveStateToLocalStorage(state);
        }
    }
});

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch (err) {
        console.error("Failed to save state to localStorage", err);
    }
};

export const { addUsers, setCurrentUser, addUsersTime } = userSlice.actions;
export default userSlice.reducer;
