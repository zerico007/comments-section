import styled from "styled-components";

import { Icon } from ".";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { decrementScore, getComment, incrementScore } from "../redux/state";

interface ScoreTickerProps {
  commentId: number;
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

    :hover {
      scale: 1.3;
    }
  }
`;

export default function ScoreTicker({ commentId }: ScoreTickerProps) {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => getComment(state.state, commentId));

  return (
    <StyledTicker>
      <Icon
        name="plusIcon"
        onClick={() => dispatch(incrementScore(commentId))}
      />
      <span>{comment?.score ?? 0}</span>
      <Icon
        name="minusIcon"
        onClick={() => dispatch(decrementScore(commentId))}
      />
    </StyledTicker>
  );
}
