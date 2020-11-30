import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"


export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes, getGameTypes, getGameById } = useContext(GameContext)

    const editMode = props.match.params.hasOwnProperty("gameId")

    let numPlayers = []
    for (let i = 1; i <= 20; i++) {
        numPlayers.push(i)
    }
    let skillLevel = [1,2,3,4,5]

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        gametype_id: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        if(editMode){
            const gameId = parseInt(props.match.params.gameId)
            getGameById(gameId)
            .then(setCurrentGame)
        }
    }, [])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gametype_id">Game Type: </label>
                    <select name="gametype_id" className="form-control" id="gametype"
                        proptype="int"
                        value={currentGame.gametype_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a type</option>
                        {gameTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <select name="number_of_players" className="form-control" id="gametype"
                        proptype="int"
                        value={currentGame.number_of_players}
                        onChange={handleControlledInputChange}>
                        <option value='0'>0</option>
                        {numPlayers.map(n => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <select name="skill_level" className="form-control" id="skill_level"
                        proptype="int"
                        value={currentGame.skill_level}
                        onChange={handleControlledInputChange}>
                        <option value='1'>1</option>
                        {skillLevel.map(n => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        gametype_id: parseInt(currentGame.gametype_id)
                    }

                    // Send POST request to your API
                    createGame(game)
                    .then(() => {
                        props.history.push("/")
                    })
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}