
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';


import '../styles/newRoom.css';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory()

    const [newRoom, setNewRoom] = useState('')
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-newRoom">
            <aside>
                <img id="imgIlus" src={illustration} alt="ilustração" />
                <strong> Crie salas de Q&amp;A ao-vivo </strong>
                <p> Tire as dúvidas da sua audiência em tempo-real  </p>
            </aside>
            <main>
                <div className="main-content">
                    <img id="logo" src={logoImg} alt="logo" />
                    <h2> Crie uma nova sala </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input id="form-input" type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p id="p2"> Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link> </p>
                </div>
            </main>

        </div>
    )
}