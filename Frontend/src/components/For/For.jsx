import React from "react"

export default function For({ func, list }) {
    if (list.length <= 0) return <></>;
    return (
        <React.Fragment>
            {list.map((e, index) => func(e, index))}
        </React.Fragment>
    );
}