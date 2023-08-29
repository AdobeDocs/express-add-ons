import React from 'react';
import { css } from "@emotion/react";
import classNames from "classnames";

const JoinBetaProgram = () => {

  const joinBeta = window.getCredentialData?.JoinBetaProgram;

  return (
    <>
      <div className={classNames(joinBeta?.className)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <h3 className="spectrum-Heading spectrum-Heading--sizeL">{joinBeta.heading}</h3>
        <p
          className="spectrum-Body spectrum-Body--sizeL"
          css={css`
          width: 50%;
          color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
          @media screen and (min-width:320px) and (max-width:1024px) {
            width: 100% ;
          }
        `}
        >{joinBeta.text}</p>
        <a href={joinBeta?.betaProgramLink}>
          <button
            className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
            css={css`width:fit-content;margin-top:10px`}>
            <span className="spectrum-Button-label">{joinBeta?.betaProgramLinkText}</span>
          </button>
        </a>
      </div>
    </>
  )
}

export { JoinBetaProgram };
