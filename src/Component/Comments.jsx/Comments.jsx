import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getComments as getCommentApi, createComment as createCommentApi, deleteComment as deleteCommentApi,updateComment as updateCommentApi  } from '../api';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComment] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    console.log(backendComments)
    //comment data
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null)
    // replies data
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAd).getTime() - new Date(b.createdAd))
    }
    //new comment add
    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId)
        createCommentApi(text, parentId).then(comment => {
            setBackendComment([comment, ...backendComments])
            setActiveComment(null)
        })
    }
    //delete comment
    const deleteComment = (commentId) => {
        if (window.confirm('are you sure that you want to remove comment?')) {
            deleteCommentApi(commentId).then(() => {
                const updateBackendComment = backendComments.filter(backendComment => backendComment.id !== commentId)
                setBackendComment(updateBackendComment)
            })
        }

    }
    const updateComment = (text, commentId) =>{
        updateCommentApi(text, commentId).then(()=>{
            const updateBackendComments = backendComments.map(backendComment=> {
                if(backendComment.id === commentId){
                    return {...backendComment, body: text};
                }
                return backendComment;
            });
            console.log(updateBackendComments)
            setBackendComment(updateBackendComments) 
            setActiveComment(null)
        });
    };

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
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    ></Comment>)
                }
            </div>
        </div>
    );
};
Comments.propTypes = {
    currentUserId: PropTypes.string,

}
export default Comments;