import * as constants from '../constants/post';

const initialState = {
    posts: [],
    currentPost: null,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.FETCH_POSTS:
            return {
                ...state, posts: action.payload
            };
        case constants.FETCH_SINGLE_POST:
            return {
                ...state, currentPost: action.payload
            };
        case constants.CREATE_POST:
            return {
                ...state, posts: [...state.posts, action.payload],
            };
        case constants.DELETE_POST:
            return {
                ...state, posts: state.posts.filter(post => post._id !== action.payload),
                currentPost: null,
            };
        case constants.UPDATE_POST:
            return {
                ...state, posts: state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return post;
                    }
                }),
                currentPost: action.payload,
            };
        default:
            return {
                ...state,
            };
    };
};

export default postReducer;