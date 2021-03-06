import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { EventProvider } from "./events/EventProvider"
import { EventList } from "./events/EventList"
import { GameForm } from "./games/GameForm"
import { EventForm } from "./events/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/" render={
                    props => <GameList {...props} />
                } />
                <Route exact path="/createGame" render={
                    props => <GameForm {...props} />
                } />
                <Route exact path="/editGame/:gameId(\d+)" render={
                    props => <GameForm {...props} />
                } />
            </GameProvider>
            <EventProvider>
                <Route exact path="/events" render={
                    props => <EventList {...props} />
                } />
            </EventProvider>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/createEvent" render={
                        props => <EventForm {...props} />
                    } />
                </EventProvider>
            </GameProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
