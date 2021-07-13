import { ReactNode } from 'react'
import cx from 'classnames';

import '../styles/question.css'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,

}: QuestionProps) {
    return (
        <div
            className={cx(
                'question',
                {answered:isAnswered},
                {highlighted:isHighlighted && !isAnswered},
            )}
         >       
            
       
            <p id="p-question" > {content} </p>
            <footer id="footer-question">
                <div className="user-info2">
                    <img id="img-question" src={author.avatar} alt={author.name} />
                    <span id="span4"> {author.name} </span>
                </div>
                {children}
            </footer>
        </div>
    )
}