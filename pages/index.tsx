import { GetServerSideProps } from "next";
import { useState } from "react";
import styled from "styled-components";
import CharacterModal from "@/components/character-modal";
import { cacheFetch } from "@/utils/cacheFetch";

// Styled Components
const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #0070f3;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const CharacterName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0070f3")};
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#005bb5")};
  }
`;

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
    try {
      const data = await cacheFetch(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  };

  const openModal = async (id: number) => {
    try {
      const data = await cacheFetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      setSelectedCharacter(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch character details:", error);
    }
  };

  return (
    <Container>
      <Title>Rick and Morty Characters</Title>
      <Grid>
        {characters.map((char: Character) => (
          <Card key={char.id} onClick={() => openModal(char.id)}>
            <CharacterImage src={char.image} alt={char.name} />
            <CharacterName>{char.name}</CharacterName>
          </Card>
        ))}
        <CharacterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          character={selectedCharacter}
        />
      </Grid>
      <ButtonContainer>
        <Button
          disabled={!info.prev}
          onClick={() => fetchCharacters(info.prev)}
        >
          Previous
        </Button>
        <Button
          disabled={!info.next}
          onClick={() => fetchCharacters(info.next)}
        >
          Next
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return { props: { initialData: data } };
};
