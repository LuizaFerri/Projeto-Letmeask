import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.css';

type RoomCodeProps = {
    code:string;
}

export function RoomCode(props:RoomCodeProps) {
   function copyRoomCodeToClicboard (){
       navigator.clipboard.writeText(props.code)
   } 
    return (
        <button className="room-code" onClick={copyRoomCodeToClicboard} >
            <div id="div-img">
                <img src={copyImg} alt=""/>
            </div>
            <span id="n-sala"> Sala #{props.code}</span>
        </button>
    )
}