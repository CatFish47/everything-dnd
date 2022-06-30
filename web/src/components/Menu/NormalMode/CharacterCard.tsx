import { CharInfo } from "src/types/CharactersInfo"

type CharacterCardProps = {
  charInfo: CharInfo
}

const CharacterCard = (props: CharacterCardProps) => {
  const {charInfo} = props
  const {
    name,
    lvl,
    ac,
    hp,
    maxhp,
    speed,
    q,
    r,
    s,
    str,
    dex,
    con,
    int,
    wis,
    cha,
  } = charInfo

  return (
    <div className="card bg-base-200 shadow-l">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <div>
          <div>Level: {lvl}</div>
          <div>Armor Class: {ac}</div>
          <div>
            Hit Points: {hp} / {maxhp}
          </div>
          <div>Speed: {speed}</div>
          <div>
            Position: ({q}, {r}, {s})
          </div>
        </div>

        <div className="grid grid-cols-6 place-items-center">
          <div>STR</div>
          <div>DEX</div>
          <div>CON</div>
          <div>INT</div>
          <div>WIS</div>
          <div>CHA</div>

          <div>
            {str} ({Math.floor((str - 10) / 2)})
          </div>
          <div>
            {dex} ({Math.floor((dex - 10) / 2)})
          </div>
          <div>
            {con} ({Math.floor((con - 10) / 2)})
          </div>
          <div>
            {int} ({Math.floor((int - 10) / 2)})
          </div>
          <div>
            {wis} ({Math.floor((wis - 10) / 2)})
          </div>
          <div>
            {cha} ({Math.floor((cha - 10) / 2)})
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard