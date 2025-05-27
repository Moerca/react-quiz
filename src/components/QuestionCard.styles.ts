import styled from 'styled-components';

// RESPONSIVER WRAPPER
export const Wrapper = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 2px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: clamp(1rem, 2vw, 2rem);
  box-shadow: 0px 5px 10px rgba(255, 255, 255, 0.53);
  text-align: center;

  p {
    font-size: clamp(1.4rem, 2vw, 1.4rem);
  }
`;

// PROPS
type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

// RESPONSIVER BUTTONWRAPPER
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: 100%;
  margin: 0 auto;
  transition: all 0.3s ease;

  :hover {
    opacity: 0.9;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: clamp(1.4rem, 1.5vw, 1.4rem);
    width: 100%;
    max-width: 600px;
    height: 45px;
    margin: 8px auto;
    padding: 0 1rem;
    background: ${({ correct, userClicked }) =>
      correct
        ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
        : !correct && userClicked
        ? 'linear-gradient(90deg, #ff5656, #c16868)'
        : 'linear-gradient(90deg, #56ccff, rgba(243, 158, 233, 0.55))'};
    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
