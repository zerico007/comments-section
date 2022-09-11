import styled from "styled-components";

import { Icon } from ".";
import { useAppDispatch } from "../redux/hooks";
import { decrementScore, incrementScore } from "../redux/state";

interface ScoreTickerProps {
  commentId: number;
  score: number;
}

const StyledTicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 36px;
  height: 100px;
  border-radius: 4px;
  padding: 8px;
  background-color: var(--light-gray);

  span {
    color: var(--moderate-blue);
    font-weight: 500;
  }

  img {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    width: 80%;

    :hover {
      scale: 1.3;
    }
  }

  @media (max-width: 475px) {
    width: 80px;
    height: 28px;
    flex-direction: row;

    img {
      width: 20%;
    }
  }
`;

export default function ScoreTicker({ commentId, score }: ScoreTickerProps) {
  const dispatch = useAppDispatch();

  return (
    <StyledTicker>
      <Icon
        name="plusIcon"
        onClick={() => dispatch(incrementScore(commentId))}
      />
      <span>{score}</span>
      <Icon
        name="minusIcon"
        onClick={() => dispatch(decrementScore(commentId))}
      />
    </StyledTicker>
  );
}
