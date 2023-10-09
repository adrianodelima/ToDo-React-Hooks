import { useCallback, useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { ToDoList } from '../../components/ToDoList/ToDoList';
import { fetchTaskList } from '../../services/ApiCalls'
import '../../global.css'
import './Main.css'
import { addToken } from '../../services/AuthToken';
import { useTheme } from '../../contexts/ThemeContext';


function Main() {
  const [apiTaskList, setApiTaskList] = useState([]);
  const { theme } = useTheme();

  const themeChanged = useCallback((newTheme) => {
    if (newTheme === 'light') {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
  }, []);

  useEffect(() => {
    // Chamando API de Tasks
    fetchTaskList()
      .then(data => setApiTaskList(data))
      .catch(error => console.error("Erro ao buscar tarefas:", error))

    addToken();

    themeChanged(theme);
  }, [theme, themeChanged])

  return (
    <div>
      <Header />
      <ToDoList apiTaskList={apiTaskList} />
    </div>
  );
}

export default Main;
