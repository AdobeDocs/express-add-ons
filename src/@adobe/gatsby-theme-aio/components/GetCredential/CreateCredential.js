
import React, { useState } from 'react';
import { css } from "@emotion/react";
import Loading from './Loading';
import { APIKey } from './APIKey';

const CreateCredential = ({ credentials }) => {

  const { createCredentials, apiKeyCredential } = credentials;
  const [checkStatus, setCheckStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false)

  return (
    <>
      {createCredentials && !isLoading &&
        <div
          css={css`
            width: 75%;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;

            @media screen and (min-width:320px) and (max-width:1024px) {
              width: 90% ;
            }

          `}
        >
          {createCredentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{createCredentials?.title}</h3>}
          {createCredentials?.description &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {createCredentials?.description}
            </p>
          }
          <p className="spectrum-Body spectrum-Body--sizeS">You're creating this credential in [<b>Org Name, Inc</b>].<a href="" css={css`margin-left : 10px`}>Change organization?</a></p>
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
                  width: 90%;
                `}
              >
                {createCredentials?.fields &&
                  createCredentials?.fields.map(({ type, label, letters, helperText, options, placeholder }, index) => {
                    return (
                      <>
                        {type.startsWith("text") &&
                          <div css={css`display:flex;flex-direction:column`}>
                            <div class="spectrum-Textfield spectrum-Textfield--sizeM" css={css`display:flex;justify-content:space-between`}>
                              <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM" css={css`color:#5C5C5C`}>{label}</label>
                              <span id="character-count-2" className="spectrum-Textfield-characterCount" css={css`color:#5C5C5C`}>{letters}</span>
                            </div>
                            {type === "textBox" &&
                              <input type="text"
                                css={css`
                                  padding: 7px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                `}
                              />
                            }
                            {type === "textArea" &&
                              <textarea
                                css={css`
                                  padding: 7px;
                                  height: 50px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                  resize: none; 
                                `}
                              ></textarea>
                            }
                            <div class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
                              <p className="spectrum-Body spectrum-Body--sizeXS" css={css`color:#5C5C5C`}>{helperText}</p>
                            </div>
                          </div>
                        }
                        {type === "checkbox" &&
                          <div css={css`
                            display: flex;
                            gap: 20px;
                          `}>
                            <input type="checkbox" id={index} onChange={(e) => setCheckStatus(e.target.checked)}></input>
                            <div dangerouslySetInnerHTML={{ __html: label }} css={css`color:#5C5C5C`} />
                          </div>
                        }
                        {type === "selectbox" && checkStatus ? (
                          <div css={css`display:${checkStatus ? "flex" : "none"};flex-direction:column;`}>
                            <label
                              htmlFor="textfield-m"
                              className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                              css={css`color:#5C5C5C`}
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
                        ) : null}
                        {type === "button" &&
                          <button
                            className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`} disabled={disable}
                            css={css`width:fit-content;margin-top:10px`} onClick={() => { setLoading(true) }}>
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
            <div css={css`width:50%`}>
              <APIKey apiKeyCredential={apiKeyCredential} />
            </div>
          </div>
          <p className="spectrum-Body spectrum-Body--sizeS">Have existing credentials?<a href="" css={css`margin-left : 10px`}>Go to Developer Console</a></p>
        </div>
      }
      {isLoading && <Loading credentials={credentials} />}
    </>
  )
}

export { CreateCredential }