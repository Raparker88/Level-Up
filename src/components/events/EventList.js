import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <button 
                className="createEventButton"
                onClick={()=> {
                props.history.push("/createEvent")
            }}>Create an Event</button>
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.day).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time} {event.location}
                        </div>
                        {
                            event.joined
                            ? <button className="btn btn-3"
                                onClick={() => leaveEvent(event.id)}
                                >Leave</button>
                            : <button className="btn btn-2"
                                onClick={() => joinEvent(event.id)}
                                >Join</button>
                        }
                    </section>
                })
            }
        </article >
    )
}