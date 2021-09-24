import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import DeckName from "../components/DeckName";
import EditDeckHeader from "../components/EditDeckHeader";
import Loader from "../components/Loader";
import { SectionHeading } from "../components/Phase/Styles";
import QuestionsList from "../components/QuestionsList";
import { GameFooter, GameMain } from "../components/Styles";
import { BACKEND_URL } from "../constants";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { useAppSelector } from "../redux/hooks";
import { getUserToken } from "../redux/userSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const AddQuestion = styled.p`
  color: ${(props) => props.theme.colors.blue};
  text-align: center;
`;

const DeckFooter = styled(GameFooter)``;

const Deck: React.FC = function () {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const userToken = useAppSelector(getUserToken);

  const [loading, setLoading] = useState<boolean>(true);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [deletedQuestions, setDeletedQuestions] = useState<Question[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const isDefaultDeck = deck?.userId == null;

  useTrackPage();

  useEffect(() => {
    retrieveDeck().then(() => setLoading(false));
  }, []);

  const retrieveDeck = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken ?? "",
    };
    const retrieveDeckResponse = await axios.get(`${BACKEND_URL}/decks/${id}`, {
      headers,
    });
    setDeck(retrieveDeckResponse.data);
  };

  const handleSaveDeck = async () => {
    if (!deck) {
      return;
    }
    setIsSaving(true);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken ?? "",
    };
    const deckData = {
      title: deck.title,
    };
    const updateDeckPromises = [];
    updateDeckPromises.push(
      axios.put(`${BACKEND_URL}/decks/${id}`, deckData, {
        headers,
      })
    );
    deck.Questions.forEach((question) => {
      const questionData = {
        question: question.question,
      };
      updateDeckPromises.push(
        axios.put(`${BACKEND_URL}/questions/${question.id}`, questionData, {
          headers,
        })
      );
    });
    deletedQuestions.forEach((deletedQuestion) => {
      updateDeckPromises.push(
        axios.delete(`${BACKEND_URL}/questions/${deletedQuestion.id}`, {
          headers,
        })
      );
    });
    await Promise.all(updateDeckPromises);
    setIsSaving(false);
    history.push("/decks");
  };

  const handleDeleteDeck = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": userToken ?? "",
      };
      setIsDeleting(true);
      await axios.delete(`${BACKEND_URL}/decks/${id}`, {
        headers,
      });
      setIsDeleting(false);
      history.push("/decks");
    }
  };

  const handleAddQuestion = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken ?? "",
    };
    const data = {
      deckId: deck?.id ?? "",
      question: "",
    };
    const addQuestionResponse = await axios.post(
      `${BACKEND_URL}/questions`,
      data,
      {
        headers,
      }
    );
    if (deck) {
      const newDeck = { ...deck };
      newDeck.Questions?.push(addQuestionResponse.data);
      setDeck(newDeck);
    }
  };

  const handleDeleteQuestion = (questionId: string) => () => {
    if (!deck) {
      return;
    }
    let newDeletedQuestions = [...deletedQuestions];
    const newDeck = { ...deck };
    const index = newDeck.Questions.findIndex(
      (question) => question.id === questionId
    );
    if (index !== -1) {
      newDeletedQuestions = newDeletedQuestions.concat(
        newDeck.Questions.splice(index, 1)
      );
      setDeck(newDeck);
      setDeletedQuestions(newDeletedQuestions);
    }
  };

  const handleChangeQuestion =
    (questionId: string) => (newQuestion: string) => {
      if (!deck) {
        return;
      }
      const newDeck = { ...deck };
      const index = newDeck.Questions.findIndex(
        (question) => question.id === questionId
      );
      if (index !== -1) {
        newDeck.Questions[index].question = newQuestion;
        setDeck(newDeck);
      }
    };

  const handleChangeDeckName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!deck) {
      return;
    }
    const newDeck = { ...deck };
    newDeck.title = e.target.value;
    setDeck(newDeck);
  };

  return (
    <Wrapper>
      <EditDeckHeader isDefaultDeck={isDefaultDeck} />
      <GameMain>
        {loading ? (
          <Loader />
        ) : (
          <>
            <DeckName
              title={deck?.title ?? ""}
              handleChangeDeckName={handleChangeDeckName}
              isDefaultDeck={isDefaultDeck}
            />
            <SectionHeading>Questions</SectionHeading>
            <QuestionsList
              isDefaultDeck={isDefaultDeck}
              questions={deck?.Questions ?? []}
              handleChangeQuestion={handleChangeQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
            />
            {!isDefaultDeck && (
              <AddQuestion onClick={handleAddQuestion}>
                + Add Question
              </AddQuestion>
            )}
          </>
        )}
      </GameMain>
      {!isDefaultDeck && (
        <DeckFooter>
          <Button
            onClick={handleSaveDeck}
            type={ButtonType.Host}
            isDisabled={loading}
            isLoading={isSaving}
          >
            Save Deck
          </Button>
          <Button
            onClick={handleDeleteDeck}
            type={ButtonType.Danger}
            isDisabled={loading}
            isLoading={isDeleting}
          >
            Delete Deck
          </Button>
        </DeckFooter>
      )}
    </Wrapper>
  );
};

export default Deck;
