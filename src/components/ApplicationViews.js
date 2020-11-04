import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { EventProvider } from "./events/EventProvider"
import { EventList } from "./events/EventList"
import { GameForm } from "./games/GameForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/" render={
                    props => <GameList {...props}/>
                }/>
                <Route exact path="/createGame" render={
                    props => <GameForm {...props}/>
                }/>
            </GameProvider>
            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>
        </main>
    </>
}
