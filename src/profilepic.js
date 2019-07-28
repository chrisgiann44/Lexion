import React from "react";

export function ProfilePic({ imageUrl, name, surname, clickHandler }) {
    return (
        <img
            style={{ width: "20%", height: "20%" }}
            id="profpic"
            src={imageUrl}
            alt={`${name} ${surname}`}
            onClick={clickHandler}
            onError={e => (e.target.src = "/placeholder.gif")}
        />
    );
}
