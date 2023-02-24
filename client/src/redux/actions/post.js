import * as api from "../../api/index.js"
import * as constants from '../constants/post';

export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: constants.FETCH_POSTS, payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const fetchSinglePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSinglePost(id);
        dispatch({ type: constants.FETCH_SINGLE_POST, payload: data })
    } catch (error) {
        console.log(error); 
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        dispatch({ type: constants.DELETE_POST, payload: data._id })
    } catch (error) {
        console.log(error); 
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: constants.UPDATE_POST, payload: data })
    } catch (error) {
        console.log(error); 
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: constants.CREATE_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}; 

