import React from "react"
import * as Icon from "react-feather"
const ButtonAction = props => {
    return (
        <>
            <div className={"d-flex flex-row"}>
                {props.buttonEdit ? <>
                    <div onClick={() => {
                        props.onEdit(props.allData)
                    }} className={"bg-success p-1 d-flex mr-1 rounded-circle cursor-pointer shadow-sm"}>
                        <Icon.Eye style={{ color: "white" }} className={"m-auto"} size={12} />
                    </div>
                </> : ""}
                {props.buttonDelete &&
                    <div onClick={() => {
                        props.onDelete(props.allData)
                    }} className={"bg-danger p-1 d-flex mr-1 rounded-circle cursor-pointer shadow-sm"}>
                        <Icon.Trash style={{ color: "white" }} className={"m-auto"} size={12} />
                    </div>
                }
            </div>
        </>
    )
}
export default ButtonAction