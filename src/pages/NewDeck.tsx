import axios, { AxiosResponse } from "axios";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as Chevron } from "../assets/ChevronRight.svg";
import Button, { ButtonType } from "../components/Button";
import { SectionHeading } from "../components/Phase/Styles";
import QuestionCard from "../components/QuestionCard";
import { GameFooter, GameHeader, GameMain } from "../components/Styles";
import { BACKEND_URL } from "../constants";
import { SnackBarType } from "../constants/types";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addSnackBar } from "../redux/snackBarsSlice";
import { getUserToken } from "../redux/userSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const NewDeckHeader = styled(GameHeader)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;

  h4 {
    margin: 0 auto;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};
  }

  @media screen and (min-width: 600px) {
    padding: 20px;
  }
`;

const ConsumeSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const DeckTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
  opacity: 1;
`;

const Label = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const Title = styled.input`
  flex-grow: 1;
  margin: 0;
  padding: 0;
  background: none;
  color: ${(props) => props.theme.colors.blue};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  resize: none;
  outline: none;
  border: none;
  opacity: 1;
`;

const QuestionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`;

const AddQuestion = styled.p`
  color: ${(props) => props.theme.colors.blue};
  text-align: center;
`;

const DeckFooter = styled(GameFooter)``;

const NewDeck: React.FC = function () {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(getUserToken);

  const [deckTitle, setDeckTitle] = useState<string>("NEW DECK");
  const [questions, setQuestions] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useTrackPage();

  const handleCreateDeck = async () => {
    setIsCreating(true);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": userToken,
    };
    const deckData = {
      title: deckTitle,
    };
    await axios
      .post(`${BACKEND_URL}/decks`, deckData, {
        headers,
      })
      .then(async (response) => {
        const deckId = response.data.id;
        const createQuestionPromises: Promise<AxiosResponse>[] = [];
        questions.forEach((question) => {
          const questionData = {
            deckId: deckId,
            question: question,
          };
          createQuestionPromises.push(
            axios.post(`${BACKEND_URL}/questions`, questionData, {
              headers,
            })
          );
        });
        await Promise.all(createQuestionPromises);
      });
    setIsCreating(false);
    dispatch(
      addSnackBar({
        id: nanoid(),
        message: "Deck Created!",
        type: SnackBarType.Positive,
      })
    );

    history.push("/decks");
  };

  const handleChangeDeckTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

  const handleChangeQuestion = (index: number) => (newQuestion: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = newQuestion;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.push("");
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const navigateBackToDecks = () => {
    if (
      window.confirm(
        "Are you sure you want to go back? You have not saved your new deck."
      )
    ) {
      history.push("/decks");
    }
  };

  return (
    <Wrapper>
      <NewDeckHeader>
        <Chevron onClick={navigateBackToDecks} />
        <h4>New Deck</h4>
        <ConsumeSpace />
      </NewDeckHeader>
      <GameMain>
        <DeckTitleWrapper>
          <Label>Deck Name</Label>
          <Title
            type="text"
            maxLength={20}
            value={deckTitle}
            onChange={handleChangeDeckTitle}
          />
        </DeckTitleWrapper>
        <SectionHeading>Questions</SectionHeading>
        <QuestionListWrapper>
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              handleChangeQuestion={handleChangeQuestion(index)}
              handleDeleteQuestion={() => handleDeleteQuestion(index)}
            />
          ))}
          <AddQuestion onClick={handleAddQuestion}>+ Add Question</AddQuestion>
        </QuestionListWrapper>
      </GameMain>
      <DeckFooter>
        <Button
          onClick={handleCreateDeck}
          type={ButtonType.Host}
          isLoading={isCreating}
        >
          Save Deck
        </Button>
      </DeckFooter>
    </Wrapper>
  );
};

export default NewDeck;
