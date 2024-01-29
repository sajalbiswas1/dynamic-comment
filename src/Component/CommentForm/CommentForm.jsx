import { useState } from "react";
import PropTypes from 'prop-types';

const CommentForm = ({handleSubmit, submitLabel}) => {
    const [text,setText]= useState('');
    const textAreaDisable = text.length === 0;
    const onSubmit = e =>{
        e.preventDefault();
        handleSubmit(text)
        setText('')
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea className="comment-form-text-area" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
            <button className="comment-form-button" disabled={textAreaDisable}>{submitLabel}</button>
        </form>
    );
};
CommentForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitLabel: PropTypes.string,
}
export default CommentForm;