import React from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import { CreateCredential } from './CreateCredential';
import classNames from "classnames";
import { IllustratedMessage } from './IllustratedMessage';
import { MyCredential } from './MyCredential';

const MIN_MOBILE_WIDTH = "320px";
const MAX_MOBILE_WIDTH = "767px";
const MAX_TABLET_SCREEN_WIDTH = "1024px"

const GetCredential = ({ credentialType, children, className }) => {

  let getCredentialData = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.props) {
      getCredentialData[child.type?.name] = child.props;
    }
  });

  window.getCredentialData = Object.keys(getCredentialData).length !== 0 && getCredentialData;

  return (
    <>
      <section
        className={classNames(className)}
        css={css`
          background: #f8f8f8;
          position: relative;
          padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-600) 0;
                    
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_MOBILE_WIDTH}){
            padding: var(--spectrum-global-dimension-size-300) var(--spectrum-global-dimension-size-100);
          }
        `
        }
      >
        <div
          css={css`
            width: 75%;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
            text-align:initial;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
              width: 90% ;
              overflow:hidden;
            }

          `}
        >
          {!window.adobeIMS?.isSignedInUser() ? <GetCredential.SignIn /> : <GetCredential.Form />}
        </div>
      </section>
    </>
  )

};

GetCredential.propTypes = {
  credentialType: PropTypes.string
}

GetCredential.SignIn = SignIn;
GetCredential.Form = CreateCredential;
GetCredential.UnknownError = IllustratedMessage;
GetCredential.Card = MyCredential;

export { GetCredential };

