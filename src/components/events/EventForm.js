import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../games/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = props => {
    const [currentEvent, setEvent] = useState({
        day: "",
        time: "",
        location: "",
        game_id: 0, 
        description: ""
    })

    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    useEffect(() => {
        getGames()
    }, [])

    const handleControlledInputChange = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    //day, time, description, game, location

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_id">Game: </label>
                    <select name="game_id" className="form-control"
                        value={currentEvent.game_id}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset className="dateField">
                <div className="form-group">
                    <label htmlFor="day">Date: </label>
                    <input type="date" id="day" name="day"
                        proptype="varchar"
                        placeholder="date of event"
                        defaultValue={currentEvent.day}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset className="timeField">
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" name="time"
                        proptype="varchar"
                        placeholder="time of event"
                        defaultValue={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        day: currentEvent.day,
                        time: currentEvent.time,
                        location: currentEvent.location,
                        game_id: parseInt(currentEvent.game_id),
                        description: currentEvent.description
                    }
                    createEvent(event)
                    .then(() => {
                        props.history.push("/events")
                    })
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
