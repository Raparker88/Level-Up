import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { EventProvider } from "./events/EventProvider"
import { EventList } from "./events/EventList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
            </GameProvider>
            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>
        </main>
    </>
}
