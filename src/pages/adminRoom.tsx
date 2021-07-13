import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import aswerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import '../styles/room.css';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';



type RoomParams = {
    id: string;

}


export function AdminRoom() {
  

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId)
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }


    return (
        <div id="page-room">
            <header>
                <div id="content">
                    <img id="logo" src={logoImg} alt="logo" />
                  
                    <div id="admin-botoes">
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom} id="encerrarSala"> Encerrar sala </Button>
                    </div>
                </div>
            </header>
            <main id="main-room">
                <div id="room-title">
                    <h1 id="nomeSala">Sala {title}</h1>
                    {questions.length > 0 && <span id="span1"> {questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" /> </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={aswerImg} alt="Dar destaque à pergunta" /> </button>

                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="remover pergunta" /> </button>
                            </Question>
                        );

                    })}
                </div>
            </main>
        </div>
    );
}