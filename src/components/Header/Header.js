import './Header.css'
import todoLogo from '../../assets/todo-logo.svg'


export function Header(){
    return (
        <div className='header'>
            <img
                src={todoLogo}
                height={48}
                alt='Header Logo'
            />
        </div>
    )
}