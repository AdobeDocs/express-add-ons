import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { ChangeOrganization } from './ChangeOrganization';
import { JoinBetaProgram } from './JoinBetaProgram';
import { AlertIcon, CommonFields } from './CommonFields';
import { ContextHelp } from './ContextHelp';

const MIN_MOBILE_WIDTH = "320px";
const MAX_TABLET_SCREEN_WIDTH = "1024px";
const initialState = {
  CredentialName: '',
  AllowedOrigin: '',
  Downloads: false,
  Download: '',
  Agree: false
};

const CredentialForm = ({ formProps }) => {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  // check the localstorage if you already have previous credentials and then choose what need to select
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormField] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const credentialForm = formProps?.CredentialForm;
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  useEffect(() => {
    if (showCreateForm) setIsError(false)
  }, [showCreateForm])

  useEffect(() => {

    const fields = [];
    const downloadObj = { label: "Language*", selectOptions: [] };

    credentialForm?.children.forEach(child => {
      if (child.type?.name === "Download") {
        const { name, link } = child?.props || {};
        downloadObj.selectOptions.push({ name, link });
      } else {
        fields.push({ [child.type?.name]: child.props });
      }
    });

    downloadObj.selectOptions.length && fields.push({ Download: downloadObj });

    setFormField(fields)

  }, []);

  useEffect(() => {
    const { CredentialName, AllowedOrigin, Downloads, Download, Agree } = formData;
    const isCredentialValid = /^(?=[A-Za-z0-9\s]{3,}$)[A-Za-z0-9\s]*$/.test(CredentialName);
    const newIsValid = (
      isCredentialValid &&
      AllowedOrigin !== "" &&
      Downloads === true &&
      Download !== "" &&
      Agree === true
    );
    setIsValid(newIsValid);
  }, [formData]);

  useEffect(() => {
    setFormData(initialState)
  }, [isError])

  const handleChange = (e, type) => {
    let value;
    if (type === "Downloads" || type === "Agree") {
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
  };

  const sideObject = formField.find(item => 'Side' in item);

  return (
    <>
      {!redirectToBeta && showCreateForm &&
        <div
          className={classNames(credentialForm?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          {credentialForm?.heading && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentialForm?.heading}</h3>}
          {credentialForm?.text &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {credentialForm?.text}
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
                {formField.map(({ CredentialName: name, AllowedOrigins: origins, Downloads: downloads, Download: download, Side: side }, index) => {
                  return (
                    <>
                      {!side && !download &&
                        <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`}>
                          {name && <CredentialName nameProps={name} isFormValue={isFormValue} formData={formData} handleChange={handleChange} index={index} />}
                          {origins && <AllowedOrigins originsProps={origins} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                          {downloads && <Downloads downloadsProp={downloads} type="Downloads" formData={formData} handleChange={handleChange} />}
                        </div>
                      }
                      {formData['Downloads'] && download && <Download downloadProp={download} formData={formData} handleChange={handleChange} />}
                    </>
                  )
                })
                }
                <div css={css`display: flex; gap: 10px;`}>
                  <input type="checkbox" onChange={(e) => handleChange(e, 'Agree')} />
                  <p css={css`color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > By checking this box, you agree to <a href=""> Adobe Developer Terms of Use</a>.
                  </p>
                </div>
                <button
                  className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`} onClick={createCredential} disabled={!isValid} >
                  <span className="spectrum-Button-label">Create credential</span>
                </button>
              </div>
            </div>
            {sideObject ? <SideContent sideContent={sideObject?.Side?.children} /> : null}
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

      {loading && <Loading credentials={credentialForm} />}
      {modalOpen && <ChangeOrganization setModalOpen={setModalOpen} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} />}
      {isError && <IllustratedMessage setShowCreateForm={setShowCreateForm} errorMessage={formProps?.IllustratedMessage} />}
      {showCredential && <MyCredential credentialProps={formProps} response={response} credentialName={formData['CredentialName']} />}
      {redirectToBeta && <JoinBetaProgram joinBeta={formProps?.JoinBetaProgram} />}
    </>
  )
}

const Side = ({ side }) => {
  return side;
}

const CredentialName = ({ nameProps, isFormValue, formData, handleChange, index }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={nameProps} formData={formData} index={index} >
      <div css={css`position:relative; display:inline-block; width: 100%`}>
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
            border-color : ${formData["CredentialName"].length < 3 && formData["CredentialName"].length !== 0 ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"}
          `}
          value={formData["CredentialName"]}
          onChange={(e) => handleChange(e, "CredentialName")}
          placeholder={nameProps?.placeholder}
          maxLength={nameProps?.range}
        />
        <span css={css`display : ${formData["CredentialName"].length < 3 && formData["CredentialName"].length !== 0 ? "block" : "none"}`}><AlertIcon /></span>
      </div>
    </CommonFields>
  )
}

const AllowedOrigins = ({ originsProps, isFormValue, type, formData, handleChange }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={originsProps} type={type} formData={formData} >
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
        onChange={(e) => handleChange(e, "AllowedOrigin")}
      ></textarea>
    </CommonFields>
  )
}

const Downloads = ({ downloadsProp, handleChange }) => {
  const { label, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading } = downloadsProp;

  return (
    <div css={css` display: flex;gap: 10px;align-items: center;`}>
      <input type="checkbox" onChange={(e) => handleChange(e, "Downloads")} />
      <p css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
      <div css={css`cursor:pointer;display: flex;justify-content: center;align-items: center;`}>
        {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
      </div>
    </div>
  )
}

const Download = ({ downloadProp, isFormValue, handleChange }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={downloadProp}>
      <select
        css={css`
          font-style: italic;
          font-weight: 500;
          font-family: 'adobe-clean';
          padding: 7px;
          border-radius: 3px;
          border: 1px solid #D0D0D0 !important;
          width:100%;
        `}
        onChange={(e) => handleChange(e, "Download")}
      >
        <option hidden >
          Select language for your code sample
        </option>
        {downloadProp?.selectOptions?.map((option, index) => (
          <option key={index}>{option.name}</option>
        ))}
      </select>
    </CommonFields>

  )
}

const SideContent = ({ sideContent }) => {
  return (
    <>
      <div
        css={css`
          width: 2px; 
          background-color: #D0D0D0; 

          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            display:none;
          }

        `}
      />
      <div
        css={css`
          width:50%;
 
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            width:100%;
          }

        `}>
        <Side side={sideContent} />
      </div>
    </>
  )
}

export { CredentialForm, Side, CredentialName, AllowedOrigins, Downloads, Download, SideContent };