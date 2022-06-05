import React from 'react'


const CurrentWeather = ({ user }) => {
    console.log(typeof (user))
    return (
        <ul>
            <li><b>Name: </b>{`${user?.name.title}`}</li>
        </ul>

    )
}

export default CurrentWeather