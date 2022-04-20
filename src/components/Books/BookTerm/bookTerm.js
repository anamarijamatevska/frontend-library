import React from 'react';
import {Link} from 'react-router-dom';

const bookTerm = ({onEdit, onDelete, onDecrement, term: {id, name, availableCopies, category, author: {name: authorName, surname: authorSurname}}}) => {
    return (
        <tr>
            <td scope={"col"}>{name}</td>
            <td scope={"col"}>{availableCopies}</td>
            <td scope={"col"}>{category}</td>
            <td scope={"col"}>{`${authorName} ${authorSurname}`}</td>
            <td scope={"col"} className={"text-right"}>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => onEdit(id)}
                      to={`/books/edit/${id}`}>
                    Edit
                </Link>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => onDelete(id)}>
                    Delete
                </a>
                <a title={"Mark As Taken"} className={"btn btn-primary"}
                   onClick={() => onDecrement(id)}>
                    Mark As Taken
                </a>
            </td>
        </tr>
    )
}

export default bookTerm;