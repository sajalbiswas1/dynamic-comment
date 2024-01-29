import { useEffect, useState } from 'react';
import { getComments as getCommentApi, createComment as createCommentApi } from '../api';
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
    const addComment = (text, parentId)=>{
        console.log('addComment', text, parentId)
        createCommentApi(text, parentId).then(comment =>{
            setBackendComment([comment, ...backendComments])
        })
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
                    ></Comment>)
                }
            </div>
        </div>
    );
};

export default Comments;