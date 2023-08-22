import React, { useState } from 'react';
import { css } from "@emotion/react";
import classNames from 'classnames';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { ContextHelp } from './ContextHelp';

const CreateCredential = ({
  credentialItems
}) => {

  const credentials = credentialItems?.credentialForm?.props;

  const formValue = credentials?.formBuilder;

  console.log('formValue', formValue)

  return (
    <>
      {credentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentials?.title}</h3>}
      {credentials?.paragraph &&
        <p
          className="spectrum-Body spectrum-Body--sizeL"
          css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
          {credentials?.paragraph}
        </p>
      }
      <p className="spectrum-Body spectrum-Body--sizeS">You're creating this credential in [<b>Org Name, Inc</b>].
        <span
          css={css`
            margin-left :10px;
            text-decoration:underline;
            color: var(--spectrum-global-color-gray-800);
            cursor:pointer;`
          }
        >
          Change organization?
        </span>
      </p>
      <div
        css={css`
          display:flex;
          gap: 35px;
        `}
      >
        <div
          css={css`
            display:flex;
            flex-direction : column;
            gap: 35px;
            width:50%;
          `}
        >
          <div
            css={css`
              display:flex;
              gap:30px;
              flex-direction:column;
              width: 100%;
            `}
          >
            {formValue &&
              formValue?.map(({ type, label, range, description, options, placeholder, contextHelp }, index) => {
                return (
                  <>

                    {type.startsWith("text") &&

                      <div css={css`display:flex;flex-direction:column;width:100%;`}>
                        <div className="spectrum-Textfield spectrum-Textfield--sizeM"
                          css={css`
                            width:92%;
                            display:flex;
                            justify-content:space-between;
                            position:relative;
                            `
                          }>

                          <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                            css={css`
                              color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                            `}>
                            {label}
                          </label>

                          {type === "textBox" &&
                            <span id="character-count-2" className="spectrum-Textfield-characterCount"
                              css={css`
                                color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                              `}>
                              {range}
                            </span>
                          }

                        </div>

                        <div
                          css={css`
                            display:flex;
                            align-items: center;
                            width:97%;
                            gap: 8px;
                            `}
                        >
                          {type === "textBox" &&
                            <input type="text"
                              css={css`
                                padding: 7px;
                                border-radius: 3px;
                                width:92%;
                                border: 1px solid #D0D0D0 !important;
                              `}
                              maxLength={range}
                            />}
                          {type === "textArea" &&
                            <textarea
                              css={css`
                                flex: 1;
                                padding: 7px;
                                height: 50px;
                                border-radius: 3px;
                                border: 1px solid #D0D0D0 !important;
                                resize: none; 
                                width: 90%;
                              `}
                            ></textarea>}
                          <div
                            css={css`
                              cursor:pointer;
                              `}
                          >
                            {contextHelp &&
                              <ContextHelp content={contextHelp} index={index} formValue={formValue} />
                            }
                          </div>
                        </div>

                        <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
                          <p className="spectrum-Body spectrum-Body--sizeXS"
                            css={css`
                              width: 90%;
                              color:  var(--spectrum-global-color-gray-700);
                            `}>{description}</p>
                        </div>
                      </div>
                    }

                    {type === "checkbox" &&
                      <div css={css`
                          display: flex;
                          gap: 10px;
                          align-items: center;
                        `}>
                        <input type="checkbox" id={index}></input>
                        <div
                          dangerouslySetInnerHTML={{ __html: label }}
                          css={css`
                              color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));

                              & > a{
                                color:rgb(0, 84, 182);
                              }

                              & > a:hover {
                                color: rgb(2, 101, 220);
                              }

                          `} />
                        <div
                          css={css`
                            cursor:pointer;
                          `}
                        >
                          {type === "checkbox" && contextHelp && <ContextHelp />}
                        </div>
                      </div>
                    }

                    {type === "selectbox" &&
                      <div css={css`display:flex;flex-direction:column;`}>
                        <label
                          htmlFor="textfield-m"
                          className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                          css={css`
                            color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                          `}
                        >
                          {label}
                        </label>
                        <select
                          css={css`
                            font-style: italic;
                            font-weight: 500;
                            font-family: 'adobe-clean';
                            padding: 7px;
                            border-radius: 3px;
                            width: 92%;
                            border: 1px solid #D0D0D0 !important;
                          `}
                          value=""
                        >
                          <option value="" disabled hidden>
                            {placeholder}
                          </option>
                          {options.map((option, index) => (
                            <option key={index}>{option}</option>
                          ))}
                        </select>
                      </div>
                    }

                    {type === "button" &&
                      <button
                        className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                        css={css`width:fit-content;margin-top:10px`} >
                        <span className="spectrum-Button-label">{label}</span>
                      </button>
                    }
                  </>
                )
              })
            }
          </div>
        </div>
        <div
          css={css`
                width: 2px; 
                background-color: #D0D0D0; 
            `}
        ></div>
        <div css={css`width:50%`}><Side side={credentials?.children?.props} /></div>
      </div>
      <p className="spectrum-Body spectrum-Body--sizeS"
        css={css`
          color:var(--spectrum-global-color-gray-800);
        `}
      >
        Have existing credentials?
        <a href=""
          css={css`
            margin-left : 10px;
            color:var(--spectrum-global-color-gray-800);

            &:hover {
              color:var(--spectrum-global-color-gray-900);
            }

          `}>
          Go to Developer Console
        </a>
      </p>
    </>
  )
}

const Side = ({ side }) => (side?.children);

export { CreateCredential };