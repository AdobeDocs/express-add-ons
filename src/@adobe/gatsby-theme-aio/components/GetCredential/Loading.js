import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import MyNewCredential from './MyNewCredential';

const Loading = ({ credentials }) => {

  const { createCredentials } = credentials;
  const [showMyCredential, setShowMyCredential] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMyCredential(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {!showMyCredential &&
        <div
          css={css`
        width: 75%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;

        @media screen and (min-width:320px) and (max-width:1024px) {
          width: 90% ;
        }`}>
          {createCredentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{createCredentials?.title}</h3>}
          <div css={css`
          padding: 7%;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          gap:10px;
        `}>
            <div class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--large">
              <div class="spectrum-ProgressCircle-track"></div>
              <div class="spectrum-ProgressCircle-fills">
                <div class="spectrum-ProgressCircle-fillMask1">
                  <div class="spectrum-ProgressCircle-fillSubMask1">
                    <div class="spectrum-ProgressCircle-fill"></div>
                  </div>
                </div>
                <div class="spectrum-ProgressCircle-fillMask2">
                  <div class="spectrum-ProgressCircle-fillSubMask2">
                    <div class="spectrum-ProgressCircle-fill"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              css={css`
            font-style: italic;
            font-family: 'adobe-clean';
            color: #5C5C5C;
          `}
            >Creating credentials...</div>
            <div
              css={css`
              color: #5C5C5C;
            `}
            >This process may take a few moments. Once complete, you download will start.</div>
          </div>
        </div>
      }
      {showMyCredential && <MyNewCredential credentials={credentials} />}
    </>
  )
}

export default Loading