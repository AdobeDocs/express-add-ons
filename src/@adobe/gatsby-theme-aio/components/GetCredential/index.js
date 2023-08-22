import React from 'react';
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import { SignIn } from './Signin';
import { CreateCredential } from './CreateCredential';

const GetCredential = ({ signIn, credentialForm, side, unKnown, credentialType, }) => {

  const credentialItems = { signIn, credentialForm, side, unKnown, credentialType };

  return (
    <>
      <section
        css={css`
          position: relative;
          padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-600) 0;`
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

            @media screen and (min-width:320px) and (max-width:1024px) {
              width: 90% ;
            }

          `}
        >
          {!window.adobeIMS?.isSignedInUser() ? <SignIn signIn={signIn?.props} /> : <CreateCredential credentialItems={credentialItems} />}
        </div>
      </section>
    </>
  );
};

GetCredential.propTypes = {
  credentialType: PropTypes.string
};

export { GetCredential };

