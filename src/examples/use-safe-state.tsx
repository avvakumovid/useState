import { useEffect } from 'react';
import { useSafeState } from '../hooks/useSafeState';

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const UseSafeState = () => {
  const [items, setItems] = useSafeState<TodoItem[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(error => console.error(error));
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
      }}
    >
      {items.map(item => (
        <span key={item.id}>
          {item.title} {item.completed ? '+' : '-'}
        </span>
      ))}
    </div>
  );
};
