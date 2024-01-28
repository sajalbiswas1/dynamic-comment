import { useEffect, useState } from 'react';
import { getComments as getCommentApi } from '../api';
import Comment from '../Comment/Comment';
const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComment] = useState([])
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null)
    
    
    
    
    useEffect(() => {
        getCommentApi().then(data => {
            setBackendComment(data)
        })

    }, [])
    return (
        <div className='comments'>
            <h2 className='comments-title'>Comments</h2>
            <div className='comments-container'>
                {
                    rootComments.map(rootComment => <Comment key={rootComment.id} comment={rootComment}></Comment>)
                }
            </div>
        </div>
    );
};

export default Comments;