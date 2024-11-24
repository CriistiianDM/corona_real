import React from "react"

export default function For({ func, list }) {
    console.log(list)
    if (list?.length <= 0 || list?.detail) return <></>;
    return (
        <React.Fragment>
            {list.map((e, index) => func(e, index))}
        </React.Fragment>
    );
}