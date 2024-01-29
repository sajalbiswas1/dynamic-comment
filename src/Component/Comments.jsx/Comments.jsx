import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getComments as getCommentApi, createComment as createCommentApi,deleteComment as deleteCommentApi } from '../api';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComment] = useState([])

    //comment data
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null)

    // replies data
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAd).getTime() - new Date(b.createdAd))
    }
    //new comment add
    const addComment = (text, parentId)=>{
        console.log('addComment', text, parentId)
        createCommentApi(text, parentId).then(comment =>{
            setBackendComment([comment, ...backendComments])
        })
    }
//delete comment
const deleteComment = (commentId)=>{
if(window.confirm('are you sure that you want to remove comment?')){
    deleteCommentApi(commentId).then(()=>{
        const updateBackendComment = backendComments.filter(backendComment => backendComment.id !== commentId)
        setBackendComment(updateBackendComment)
    })
}

}

    useEffect(() => {
        getCommentApi().then(data => {
            setBackendComment(data)
        })

    }, [])
    return (
        <div className='comments'>
            <h2 className='comments-title'>Comments</h2>
            <div className='comment-form-title'> Write Comment</div>
            <CommentForm submitLabel="write" handleSubmit={addComment} />
            <div className='comments-container'>
                {
                    rootComments.map(rootComment => <Comment key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                    ></Comment>)
                }
            </div>
        </div>
    );
};
Comments.propTypes = {
    currentUserId: PropTypes.array,

}
export default Comments;