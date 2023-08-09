import React from 'react';
import { css } from "@emotion/react";
import UnknownError from "./unknown-error.png"

const Tryagain = ({ credentials }) => {

  const { error } = credentials;

  return (
    <>
      {error &&
        <div
          css={css`
            display:flex;
            flex-direction:column;
            gap:20px;
            justify-content: center;
            align-items: center;
          `}
        >
          <img src={UnknownError} width="100px" height="fit-content" alt="error" />
          <p className="spectrum-Heading spectrum-Heading--sizeXL"
            css={css`
          font-weight:100;
          `}
          >Unknown error</p>
          <div
            css={css`
              text-align:center;
            `}
          >
            <p className="spectrum-Body spectrum-Body--sizeM">An error has occured when you tried to create a new credential.</p>
            <p className="spectrum-Body spectrum-Body--sizeM">Please try to submit the form again</p>
          </div>
          <button className="spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM">
            <span className="spectrum-Button-label">Try again</span>
          </button>
          <p className="spectrum-Body spectrum-Body--sizeS"><a href={error?.link}>{error?.label}</a></p>
        </div>
      }
    </>
  )
}

export { Tryagain }