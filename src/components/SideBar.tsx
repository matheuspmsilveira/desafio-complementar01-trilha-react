import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api
      .get<GenreResponseProps[]>('http://localhost:3333/genres')
      .then(({ data }) => {
        setGenres(data);
      });
  }, []);

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map(({ id, title, name }) => (
          <Button
            key={String(id)}
            title={title}
            iconName={name}
            onClick={() => handleClickButton(id)}
            selected={selectedGenreId === id}
          />
        ))}
      </div>
    </nav>
  );
}
