// Copyright (c) 2023 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import styled from "styled-components";

const WelcomeContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ApplicationName = styled.p`
  user-select: none;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  user-select: none;
  font-size: 1rem;
`;

const InstructionText = styled.p`
  font-size: 0.8rem;
  user-select: none;
  span {
    backdrop-filter: brightness(0.8);
    font-weight: bolder;
    font-size: 0.7em;
    padding: 3px 6px;
    margin: 0 2px;
    border-radius: 5px;
    display: inline-block;
    user-select: none;
  }
`;

// Welcome component
export default function Welcome() {
  return (
    <WelcomeContainer>
      <ApplicationName>Facsimile</ApplicationName>
      <InfoText>
        Add something to get started
      </InfoText>
      <InstructionText>
        <span>CTRL</span> + <span>+</span> to add new pair
      </InstructionText>
      <InstructionText>
        <span>F2</span> to edit existing pair
      </InstructionText>
      <InstructionText>
        <span>DELETE</span> to delete existing pair
      </InstructionText>
      <InstructionText>
        <span>CTRL</span> + <span>Q</span> to quit
      </InstructionText>
    </WelcomeContainer>
  );
}
