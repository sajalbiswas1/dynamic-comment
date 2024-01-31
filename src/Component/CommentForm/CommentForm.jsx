import { useState } from "react";
import PropTypes from 'prop-types';

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton =false,
    initialText = '',
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    const textAreaDisable = text.length === 0;
    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(text)
        setText('')
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea className="comment-form-text-area" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button className="comment-form-button" disabled={textAreaDisable}>{submitLabel}</button>
            {hasCancelButton && 
            <button type="button"  className="comment-form-button comment-form-cancel-button" 
            onClick={handleCancel} 
            >Cancel</button>}
        </form>
    );
};
CommentForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitLabel: PropTypes.string,
    handleCancel: PropTypes.func,
    hasCancelButton: PropTypes.bool,
    initialText: PropTypes.string,
}
export default CommentForm;