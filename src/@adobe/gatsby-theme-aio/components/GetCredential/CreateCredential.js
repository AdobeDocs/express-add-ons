import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { ContextHelp } from './ContextHelp';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { ChangeOrganization } from './ChangeOrganization';
import { JoinBetaProgram } from './JoinBetaProgram';

const MIN_MOBILE_WIDTH = "320px";
const MAX_TABLET_SCREEN_WIDTH = "1024px";
const initialState = {
  credentialName: '',
  allowedOrigin: '',
  language: false,
  download: '',
  agree: false
};

const AlertIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      style={{
        position: "absolute",
        right: "0px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <rect id="Canvas" fill="rgb(211, 21, 16)" opacity="0" width="18" height="18" />
      <path fill="rgb(211, 21, 16)" d="M8.5635,1.2895.2,16.256A.5.5,0,0,0,.636,17H17.364a.5.5,0,0,0,.436-.744L9.4365,1.2895a.5.5,0,0,0-.873,0ZM10,14.75a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,14.75v-1.5A.25.25,0,0,1,8.25,13h1.5a.25.25,0,0,1,.25.25Zm0-3a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,11.75v-6a.25.25,0,0,1,.25-.25h1.5a.25.25,0,0,1,.25.25Z" />
    </svg>
  )
}

const CreateCredential = () => {
  const credentials = window.getCredentialData?.CreateCredential;

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  // check the localstorage if you already have previous credentials and then choose what need to select
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormValue] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);

  const formValue = credentials?.children;

  const isFormValue = formValue?.filter(data => {
    const keys = Object.keys(data.props);
    const contextHelpKeys = keys.filter(key => key.startsWith('contextHelp'));
    return contextHelpKeys.length > 0;
  });

  const isSide = formValue?.filter(data => {
    return data?.props?.type === "side" && data;
  });

  useEffect(() => {
    if (showCreateForm) setIsError(false)
  }, [showCreateForm])

  useEffect(() => {
    const output = [];
    const downloadObj = { type: 'download', label: "Language*", selectOptions: [] };

    formValue.forEach(({ props }) => {
      if (props?.type === 'download') {
        downloadObj.selectOptions.push({ name: props?.name, link: props?.link });
      }
      else output.push(props);
    })

    if (downloadObj.selectOptions.length > 0) {
      output.push(downloadObj);
    }
    setFormValue(output)
  }, [])

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { credentialName, allowedOrigin, language, download, agree } = formData;
    const isCredentialValid = /^(?=[A-Za-z0-9\s]{3,}$)[A-Za-z0-9\s]*$/.test(credentialName);
    const newIsValid = (
      isCredentialValid &&
      allowedOrigin !== "" &&
      language === true &&
      download !== "" &&
      agree === true
    );
    setIsValid(newIsValid);
  }, [formData]);

  useEffect(() => {
    setFormData(initialState)
  }, [isError])

  const handleChange = (e, type) => {
    let value;
    if (type === "language" || type === "agree") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setFormData(prevData => ({ ...prevData, [type]: value }));
  };

  const createCredential = async () => {
    const token = window.adobeIMS?.getTokenFromStorage()?.token;
    if (token) {
      setLoading(true);
      setShowCreateForm(false);
      const data = {
        name: Date.now().toString(),
        platform: 'apiKey',
        description: 'created for get credential'
      };
      const response = await fetch("/console/api/organizations/220657/integrations/adobeid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "x-api-key": "UDPWeb1"
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const result = await response.json();
        setResponse(result);
        setShowCredential(true)
      }
      else {
        setIsError(true);
      }
      setLoading(false);
    }
    else {
      console.log('User not logged in');
    }
  }

  return (
    <>
      {!redirectToBeta && showCreateForm &&
        <div
          className={classNames(credentials?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          {credentials?.heading && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentials?.heading}</h3>}
          {credentials?.text &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {credentials?.text}
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
              onClick={() => setModalOpen(true)}
            >
              Change organization?
            </span>
          </p>
          <div
            css={css`
            display:flex;
            gap: 35px;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              flex-direction : column;
            }

          `}
          >
            <div
              css={css`
              display:flex;
              flex-direction : column;
              gap: 35px;
              width:50%;

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                width:100%;
              }

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
                {formField.map(({ type, label, description, contextHelp, contextHelpHeading, contextHelpText, range, className, placeholder, selectOptions, contextHelpLink, contextHelpLabelForLink }, index) => {
                  return (
                    <>
                      {!["side"].includes(type) && ((type === "download" && formData['language']) || (type !== "download" && label)) && type !== "language" &&
                        <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} className={classNames(className)}>
                          <div className="spectrum-Textfield spectrum-Textfield--sizeM"
                            css={css`
                              display:flex;
                              justify-content:space-between;
                              position:relative;
                              width: ${isFormValue.length ? "95%" : "100%"};  
                            `
                            }>
                            <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                              css={css`
                                color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                              `}
                            >
                              {label}
                            </label>
                            {range && <span id="character-count-2" className="spectrum-Textfield-characterCount"
                              css={css`
                                color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                              `}>
                              {range - formData[type].length}
                            </span>}
                          </div>
                          {type &&
                            <div css={css`
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                              gap:10px;
                            `}>
                              {type === "credentialName" &&
                                <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                                  <input
                                    type="text"
                                    required
                                    css={css`
                                      padding: 7px;
                                      border-radius: 3px;
                                      width: 97%;
                                      border: 1px solid;
                                      &::placeholder {
                                        font-style: italic; 
                                        color: var(--spectrum-global-color-gray-400); 
                                      }
                                      border-color : ${formData[type].length < 3 && formData[type].length !== 0 ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"}
                                    `}
                                    value={formData[type]}
                                    onChange={(e) => handleChange(e, type)}
                                    placeholder={placeholder}
                                    maxLength={range}
                                  />
                                  <span css={css`display : ${formData[type].length < 3 && formData[type].length !== 0 ? "block" : "none"}`}><AlertIcon /></span>
                                </div>
                              }
                              {type === "allowedOrigin" &&
                                <textarea
                                  css={css`
                                      flex: 1;
                                      padding: 7px;
                                      height: 50px;
                                      border-radius: 3px;
                                      border: 1px solid #D0D0D0 !important;
                                      resize: none; 
                                      width: 90%;
                                      &::placeholder {
                                        font-style: italic; 
                                        color: var(--spectrum-global-color-gray-400); 
                                      }
                                    `}
                                  value={formData[type]}
                                  onChange={(e) => handleChange(e, type)}
                                  placeholder={placeholder}
                                ></textarea>
                              }
                              {type === "download" && formData['language'] && <select
                                css={css`
                                  font-style: italic;
                                  font-weight: 500;
                                  font-family: 'adobe-clean';
                                  padding: 7px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                  width:100%;
                                `}
                                value={formData['download']}
                                onChange={(e) => handleChange(e, type)}
                              >
                                <option value="" disabled hidden>
                                  Select language for your code sample
                                </option>
                                {selectOptions?.map((option, index) => (
                                  <option key={index}>{option.name}</option>
                                ))}
                              </select>}
                              {isFormValue.length ?
                                <div
                                  css={css`
                                    cursor:pointer;
                                    width:20px;
                                    height:20px;
                                  `}
                                >
                                  {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} index={index} />}
                                </div> : null
                              }

                            </div>
                          }
                          {description && <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
                            <p className="spectrum-Body spectrum-Body--sizeXS"
                              css={css`
                                color : ${formData[type].length < 3 && formData[type].length !== 0 && type === "credentialName" ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-700)"};
                                width: ${isFormValue.length ? "95%" : "100%"};
                              `}>
                              {description}
                            </p>
                          </div>
                          }

                        </div>
                      }
                      {!["side"].includes(type) && type === "language" &&
                        <div css={css`
                          display: flex;
                          gap: 10px;
                          align-items: center;
                        `}>
                          <input type="checkbox" onChange={(e) => handleChange(e, type)} checked={formData['language']} />
                          <p css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
                          <div
                            css={css`
                              cursor:pointer;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            `}
                          >
                            {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} index={index} />}
                          </div>
                        </div>
                      }
                    </>
                  )
                })
                }
                <div css={css`
                  display: flex;
                  gap: 10px;
                `}>
                  <input type="checkbox" onChange={(e) => handleChange(e, 'agree')} />
                  <p
                    css={css`color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`}
                  >
                    By checking this box, you agree to <a href=""> Adobe Developer Terms of Use</a>.
                  </p>
                </div>
                <button
                  className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`} disabled={!isValid} onClick={createCredential} >
                  <span className="spectrum-Button-label">Create credential</span>
                </button>
              </div>
            </div>
            {
              isSide?.length ?
                <>
                  <div
                    css={css`
                      width: 2px; 
                      background-color: #D0D0D0; 

                      @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                        display:none;
                      }

                    `}
                  ></div>
                  <div
                    css={css`
                      width:50%;
                      
                      @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                        width:100%;
                      }
                      
                    `}>
                    {isSide.map((data) => (<Side side={data?.props?.children}></Side>))}
                  </div>
                </> : null
            }
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

        </div>
      }

      {loading && <Loading credentials={credentials} />}
      {modalOpen && <ChangeOrganization setModalOpen={setModalOpen} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} />}
      {isError && <IllustratedMessage setShowCreateForm={setShowCreateForm} />}
      {showCredential && <MyCredential response={response} credentialName={formData['credentialName']} />}
      {redirectToBeta && <JoinBetaProgram />}

    </>
  )
}

const Side = ({ side }) => {
  return side;
}

export { CreateCredential, Side };