import React, { useState } from 'react';
import styled from 'styled-components';

import FadeLoader from "react-spinners/FadeLoader";

const LoadingModal = ({ isOpen }) => {
    let [color, setColor] = useState("#FFEFEB");

    if (!isOpen) return null;

    return (
        <Overlay>
            <Content>
                <FadeLoader
                    color={color}
                    loading={isOpen}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Content>
        </Overlay>

    );
};

export default LoadingModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Content = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;