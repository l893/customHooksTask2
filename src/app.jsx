import { useLocalStorage } from './hooks/use-local-storage';

export const App = () => {
  const [value, { setItem, removeItem }] = useLocalStorage(
    'user-theme',
    'light',
  );

  return (
    <>
      <div>
        <p>Текущая тема: {value}</p>
        <div>
          <button onClick={() => setItem('dark')}>
            Установить темную тему
          </button>
          <button onClick={() => setItem('light')}>
            Установить светлую тему
          </button>
          <button onClick={() => removeItem()}>Сбросить настройки</button>
        </div>
      </div>
    </>
  );
};
