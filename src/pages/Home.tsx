import { FormEvent,useState } from 'react';
import { useHistory } from 'react-router-dom';
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';
import { database } from '../services/firebase';




export function Home() {
    const history = useHistory();
    const{user,singInWithGoogle} = useAuth()
    const [roomCode,setRoomCode] = useState('');


    async function handleCreateRoom() {
       if(!user) {
          await singInWithGoogle()
       }
              history.push('/rooms/new');
            }

    async function handleJoinRoom (event:FormEvent) {
            event.preventDefault();

            if (roomCode.trim()==='') {
                return;
            }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();  
          if(!roomRef.exists()){
              alert('Room does not exists.');
              return;
          }

          if(roomRef.val().endedAt) {
              alert('Room already closed.')
              return;
          }

          history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img id="imgIlus" src={illustration} alt="ilustração" />
                <strong> Crie salas de Q&amp;A ao-vivo </strong>
                <p> Tire as dúvidas da sua audiência em tempo-real  </p>
            </aside>
            <main>
                <div className="main-content">
                    <img id="logo" src={logoImg} alt="logo" />
                    <button onClick={handleCreateRoom} id="login-google">
                        <img id="logo-google" src={googleIconImg} alt="icone-google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separador"> ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input id="form-input" type="text"
                            placeholder="Digite o código da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button id="entrar-sala" type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}