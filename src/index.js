import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox'

const commentsUrl = "http://localhost:3001/api/comments"

ReactDOM.render(
    <CommentBox 
    url={commentsUrl}
    pollInterval={2000} />, 
    document.getElementById('root')
);
