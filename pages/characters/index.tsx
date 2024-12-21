import { GetServerSideProps } from "next";
import { useState } from "react";
import CharacterModal from "@/components/character-modal";

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function CharacterList({ initialData }: { initialData: any }) {
  const [characters, setCharacters] = useState(initialData.results);
  const [info, setInfo] = useState(initialData.info);

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCharacters = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data.results);
    setInfo(data.info);
  };

  const openModal = async (id: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    setSelectedCharacter(data);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
        }}
      >
        {characters.map((char: Character) => (
          <div key={char.id} onClick={() => openModal(char.id)}>
            <img src={char.image} alt={char.name} style={{ width: "100%" }} />
            <p>{char.name}</p>
          </div>
        ))}

        <CharacterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          character={selectedCharacter}
        />
      </div>
      <div>
        <button
          disabled={!info.prev}
          onClick={() => fetchCharacters(info.prev)}
        >
          Previous
        </button>
        <button
          disabled={!info.next}
          onClick={() => fetchCharacters(info.next)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return { props: { initialData: data } };
};
