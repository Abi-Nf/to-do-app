import {useState} from "react";
import Row from "../pages/component/Row";
import NoTable from "../pages/component/Notable";
import style from "../styles/index.module.css";
export default function Home() {
    const [selection,setSelection] = useState([]);
    const [todoList,setTodoList] = useState([]);
    const handleAdd = () => {
        const name = prompt("name: ","To do name");
        const description = prompt("description: ","To do description");
        if(name && description){
            setTodoList(prev => [...prev,{name,description}]);
        }
    }
    const handleUpdate = () => {
        const name = prompt(
            "New name: ",
            todoList[selection[0]].name
        );
        const description = prompt(
            "New description: ",
            todoList[selection[0]].description
        );
        if(name && description){
            setTodoList(prev => {
                prev.splice(selection[0],1,{name,description})
                return [
                    ...prev,
                ];
            });
            setSelection([]);
        }
    }
    const handleDelete = () => {
        setTodoList(prev =>
            prev.filter((v,i) =>
                !selection.includes(i)
            )
        )
        setSelection([]);
    }
    const handleSelect = ev => {
        setSelection(prev => {
            if(prev.includes(+ev.target.value)){
                return prev.filter(v => +v !== +ev.target.value)
            }else {
                return [...new Set([...prev,+ev.target.value])]
            }
        });
    }

    return (
        <div className={style.pageHome}>
            <div className={style.centerPage}>
                <header className={style.header}>
                    <h1 className={style.titleToDo}>To do</h1>
                    <div>
                        {
                            (selection.length === 0)
                                ? <button className={style.btnHeader}
                                          onClick={handleAdd}>Add</button>
                                : (selection.length === 1)
                                    ? (
                                        <>
                                            <button className={style.btnHeader}
                                                    onClick={handleUpdate}>Edit</button>
                                            <button className={style.btnHeader}
                                                    onClick={handleDelete}>Delete</button>
                                        </>
                                    )
                                    : (selection.length > 1) && (
                                    <button className={style.btnHeader}
                                            onClick={handleDelete}>Delete</button>
                                )
                        }
                    </div>
                </header>
                <table className={style.tableContainer}>
                    <thead className={style.tableHead}>
                        <tr className={style.rowHead}>
                            <td className={style.columnHead}>Name</td>
                            <td className={style.columnHead}>Description</td>
                        </tr>
                    </thead>
                    <tbody className={style.tableBody}>
                        {
                            (todoList && todoList.length > 0)
                            ? todoList.map(
                                (v,i) =>
                                    <Row data={v}
                                         index={i}
                                         key={v.name+"_"+v.description+"__"+i}
                                         onSelect={handleSelect}/>
                                )
                            : <NoTable/>
                        }
                        <tr className={style.NoBodyTable}></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}