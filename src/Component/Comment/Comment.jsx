import '../index.css'
import PropTypes from 'prop-types';
const Comment = ({ comment, replies, currentUserId,deleteComment }) => {
    const fiveMinute = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString()
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" alt="user image" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                <div className='comment-text'>{comment.body}</div>
                <div className='comment-actions'>
                    {canReply && <div className='comment-action'>Reply</div>}
                    {canEdit && <div className='comment-action'>Update</div>}
                    {canDelete && <div className='comment-action' onClick={()=>deleteComment(comment.id)}>Delete</div>}
                </div>
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map(reply => (<Comment key={reply.id}
                            comment={reply}
                            replies={[]}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                        />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.array,
    replies: PropTypes.func,
    currentUserId: PropTypes.string,
    deleteComment: PropTypes.func,
}
export default Comment;