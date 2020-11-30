import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
        <button 
                className="createGameButton"
                onClick={()=> {
                props.history.push("/createGame")
            }}>Create a Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        {game.is_user_creator ? 
                            <button 
                            className="EditGameButton"
                            onClick={()=> {
                            props.history.push(`/editGame/${game.id}`)
                        }}>Edit Game</button>: null}
                    </section>
                })
            }
        </article>
        </>
    )
}