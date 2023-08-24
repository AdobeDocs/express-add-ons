import React, { useMemo } from 'react';
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import { SignIn } from './Signin';
import { CreateCredential } from './CreateCredential';
import classNames from "classnames";

const MIN_MOBILE_WIDTH = "320px";
const MAX_MOBILE_WIDTH = "767px";
const MAX_TABLET_SCREEN_WIDTH = "1024px"

const GetCredential = ({
  credentialType,
  className,
  children
}
) => {
  const credentialItems = useMemo(() => {
    const items = {};
    children.forEach((child) => {
      const { mdxType, ...props } = child?.props;
      items[mdxType] = props;
    });
    return items;
  }, [children]);

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
          {!window.adobeIMS?.isSignedInUser() ? <SignIn signIn={credentialItems?.SignInCredential} /> : <CreateCredential credentialItems={credentialItems} />}
        </div>
      </section>
    </>
  );
};

GetCredential.propTypes = {
  credentialType: PropTypes.string
};

export { GetCredential };

