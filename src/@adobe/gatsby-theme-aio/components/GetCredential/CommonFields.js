import React from 'react';
import { ContextHelp } from './ContextHelp';
import { css } from "@emotion/react";
import classNames from "classnames";

export const CommonFields = ({ isFormValue, fields, children, formData, index }) => {

  const { label, range, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading, description, className } = fields;

  return (
    <>
      <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} className={classNames(className)} >
        <div className="spectrum-Textfield spectrum-Textfield--sizeM"
          css={css`
            display:flex;
            justify-content:space-between;
            position:relative;
            width: ${isFormValue?.length ? "95%" : "100%"};  
          `
          }>
          <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
            css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700)) `}
          >
            {label}
          </label>
          {range && <span id="character-count-2" className="spectrum-Textfield-characterCount"
            css={css`
              color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
            `}>
            {range}
          </span>}
        </div>
        <div css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:10px;
        `}>
          {children}
          {isFormValue?.length ?
            <div css={css` cursor:pointer; width:20px; height:20px; `} >
              {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
            </div> : null
          }
        </div>
        {description && <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
          <p className="spectrum-Body spectrum-Body--sizeXS"
            css={css`
              color : ${formData["CredentialName"].length < 3 && formData["CredentialName"].length !== 0 && index === 0 ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-700)"};
              width: ${isFormValue?.length ? "95%" : "100%"};
            `}>
            {description}
          </p>
        </div>
        }
      </div>
    </>
  )
}

export const AlertIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <rect id="Canvas" fill="rgb(211, 21, 16)" opacity="0" width="18" height="18" />
      <path fill="rgb(211, 21, 16)" d="M8.5635,1.2895.2,16.256A.5.5,0,0,0,.636,17H17.364a.5.5,0,0,0,.436-.744L9.4365,1.2895a.5.5,0,0,0-.873,0ZM10,14.75a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,14.75v-1.5A.25.25,0,0,1,8.25,13h1.5a.25.25,0,0,1,.25.25Zm0-3a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,11.75v-6a.25.25,0,0,1,.25-.25h1.5a.25.25,0,0,1,.25.25Z" />
    </svg>
  )
}
