import './Header.css';
import todoLogo from '../../assets/todo-logo.svg';
import {useTheme} from '../../contexts/ThemeContext';

export function Header() {
  const {toggleTheme} = useTheme();

  return (
    <div className="header">
      <button onClick={toggleTheme}>Trocar tema</button>

      <img
        src={todoLogo}
        height={48}
        alt="Header Logo"
      />
    </div>
  );
}
