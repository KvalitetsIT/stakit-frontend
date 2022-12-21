import { useGetAllPostsQuery } from './redux/postApiSlice';
import logo from '../../logo.svg';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { Can } from '../User/logic/Can';
import { useState } from 'react';

type TodoListProps = {

}

export const TodoList = (props: TodoListProps) => {

    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useGetAllPostsQuery({ pagination: { page: page + 1, pagesize: 100 } })

    if (isLoading || data == undefined) {
        return (<img src={logo} className="App-logo" alt="logo" />)
    }
    return (
        <div className="App">
            <header className="App-header">
                <table>
                    {data!.map(todo => {
                        return (
                            <tr>
                                <td>{todo.text}</td>
                                <td>
                                    <Can I="read" this={todo}>
                                        <button onClick={() => toast.info("" + t("you clicked the buton"))}>Click me for toast</button>
                                    </Can>
                                </td>

                            </tr>

                        )
                    })}
                </table>
            </header>
        </div>
    )
}