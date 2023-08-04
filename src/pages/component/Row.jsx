import style from "@/styles/row.module.css"

export default function Row({data,onSelect,index}){
    return (
        <tr className={style.rowData}>
            <td className={style.column}>
                <span className={style.nameColumn}>
                    <input type="checkbox"
                           className={style.rowSelector}
                           value={index}
                           onClick={onSelect}/>
                    <span>{data.name}</span>
                </span>
            </td>
            <td className={style.column}>
                {data.description}
            </td>
        </tr>
    )
}