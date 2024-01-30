import CommentForm from '../CommentForm/CommentForm';
import '../index.css'
import PropTypes from 'prop-types';
const Comment = ({ comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId = null, addComment }) => {
    const fiveMinute = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id
    // console.log(activeComment, activeComment.type, activeComment.id, comment.id, parentId)
    // const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id
    const replyId = parentId ? parentId : comment.id;
    // console.log(comment)
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
                    {canReply && <div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply</div>}
                    {canEdit && <div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Editing</div>}
                    {canDelete && <div className='comment-action' onClick={() => deleteComment(comment.id)}>Delete</div>}
                </div>
                {isReplying && (
                    <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
                )}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map(reply => (<Comment key={reply.id}
                            comment={reply}
                            replies={[]}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            parentId={comment.id}
                            addComment={addComment}

                        />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.object,
    replies: PropTypes.array,
    currentUserId: PropTypes.string,
    deleteComment: PropTypes.func,
    activeComment: PropTypes.object,
    setActiveComment: PropTypes.func,
    parentId: PropTypes.string,
    addComment: PropTypes.func,
}
export default Comment;