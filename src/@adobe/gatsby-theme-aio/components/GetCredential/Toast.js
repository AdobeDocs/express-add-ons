import React from 'react';
import { css } from '@emotion/react';

const Toast = ({ setAlertShow, alertShow, message, error }) => {

  return (
    <>
      {alertShow &&
        <div
          css={css`
              
              visibility: visible ;
              background-color: ${error ? "rgb(211, 21, 16)" : '#007e50'};
              color: #fff; 
              text-align: center;
              border-radius: 2px;
              padding: 5px 20px;
              border-radius: 5px;
              position: fixed; 
              z-index: 1; 
              bottom: 25px;
              right: 37%;
              font-family: adobe-clean;
              display: inline-flex;
              line-hight: 12px;

              -webkit-animation:  fadein 0.5s, fadeout 0.5s 2.5s;
              animation: fadein 0.5s, fadeout 0.5s 2.5s;

              @-webkit-keyframes fadein {
                from {bottom: 0; opacity: 0;}
                to {bottom: 30px; opacity: 1;}
              }

          `}
        >
          <div css={css`display:flex;gap:15px;align-items:center;`}>
            <div css={css`display:flex;`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18" fill='#fff'>
                <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path class="fill" d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1Zm5.333,4.54L8.009,13.6705a.603.603,0,0,1-.4375.2305H7.535a.6.6,0,0,1-.4245-.1755L3.218,9.829a.6.6,0,0,1-.00147-.84853L3.218,8.979l.663-.6625A.6.6,0,0,1,4.72953,8.315L4.731,8.3165,7.4,10.991l5.257-6.7545a.6.6,0,0,1,.8419-.10586L13.5,4.1315l.7275.5685A.6.6,0,0,1,14.333,5.54Z" />
              </svg>
            </div>
            <div className="spectrum-Toast-body">
              <div className="spectrum-Toast-content" css={css`letter-spacing: 0.5px;font-weight: lighter;max-width: 400px; text-align: initial;min-width: fit-content;`}>{message}</div>
            </div>
            <div ><hr css={css`height:25px;`} /></div>
            <div css={css`display:flex;`}>
              <button
                css={css`
                  background-color:transparent;
                  padding: 0;
                  border: none;
                  cursor: pointer;
                `}
                onClick={() => setAlertShow(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18" fill='#fff'>
                  <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path d="M13.2425,3.343,9,7.586,4.7575,3.343a.5.5,0,0,0-.707,0L3.343,4.05a.5.5,0,0,0,0,.707L7.586,9,3.343,13.2425a.5.5,0,0,0,0,.707l.707.7075a.5.5,0,0,0,.707,0L9,10.414l4.2425,4.243a.5.5,0,0,0,.707,0l.7075-.707a.5.5,0,0,0,0-.707L10.414,9l4.243-4.2425a.5.5,0,0,0,0-.707L13.95,3.343a.5.5,0,0,0-.70711-.00039Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export { Toast };
