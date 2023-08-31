import * as Icon from 'react-feather'
export const ButtonAction = props => {
    return (
        <>
        <div className={"d-flex flex-row"}>
            <div onClick={() => {
                props.onEdit(props.allData)
            }} className={"bg-success p-1 d-flex mr-2 rounded-circle cursor-pointer shadow-sm"} style={{marginRight: "10px"}}>
                <Icon.Edit style={{color: "white"}} className={"m-auto"} size={12}/>
            </div>
            <div onClick={() => {
                props.onDelete(props.allData)
            }} className={"bg-danger p-1 d-flex mr-1 rounded-circle cursor-pointer shadow-sm"}>
                <Icon.Trash style={{color: "white"}} className={"m-auto"} size={12}/>
            </div>
        </div>
        </>
    )
}